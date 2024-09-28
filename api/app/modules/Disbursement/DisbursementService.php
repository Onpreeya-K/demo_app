<?php

namespace App\Modules\Disbursement;

use Illuminate\Database\Capsule\Manager as DB;
use Exception;
use App\Utils\PDFGen;

class DisbursementService
{
    protected $disbursementRepository;


    public function __construct(DisbursementRepository $disbursementRepository)
    {
        $this->disbursementRepository = $disbursementRepository;
    }

    public function getAllDisbursements()
    {
        return $this->disbursementRepository->getAllDisbursements();
    }

    public function getDisbursementsById($Id){
        return $this->disbursementRepository->getDisbursementByID($Id);
    }

    public function getDisbursementsByTermOfYearId($termOfYearId){
        return $this->disbursementRepository->getDisbursementByTermID($termOfYearId);
    }

    public function getDisbursementsByTeacherId($teacherId){
        return $this->disbursementRepository->getDisbursementByTeacherID($teacherId);
    }

    public function getDisbursementsByTeacherIdAndTermOfYearId($teacherId, $termOfYearId){

        $dataDisbursement = $this->disbursementRepository->getDisbursementByTeacherIDAndTermID($teacherId, $termOfYearId);
        if (!$dataDisbursement) {
            return null;
        }

        $listDisbursementTeach = $this->disbursementRepository->getListDisbursementTeachByDisbursementID($dataDisbursement->disbursement_id);
        $dataDisbursement['data'] = $listDisbursementTeach;


        return $dataDisbursement;
    }

    public function createDisbursementWithTech($data)
    {
        $pdfPath = 'disbursement_'. $data['term_of_year_id']. '_' . $data['teacher_id']. '_' . time() . '.pdf';

        $spdf = new PDFGen(pathFile: $pdfPath);
        $spdf->createPDF();
        
        return DB::transaction(function () use ($data, $pdfPath) {

            $disbursementData = [
                'teacher_id' => $data['teacher_id'],
                'term_of_year_id' => $data['term_of_year_id'],
                'sum_yes_unit' => $data['sum_yes_unit'],
                'sum_no_unit' => $data['sum_no_unit'],
                'total' => $data['total'],
                'status' => $data['status'],
                'pdf_path' => $pdfPath
            ];

            $disbursement = $this->disbursementRepository->createDisbursement($disbursementData);

            foreach ($data['data'] as $subject) {
                $disbursement->scheduleTeachs()->attach($subject['schedule_teach_id'], [
                    'count_of_teach' => $subject['count_of_teach'],
                    'unit' => $subject['unit'],
                    'unit_yes' => $subject['unit_yes'],
                    'unit_no' => $subject['unit_no'],
                    'rate_of_unit' => $subject['rate_of_unit'],
                    'total' => $subject['total'],
                    'note' => $subject['note']
                ]);
            }

            return $disbursement;
        });
    }

    public function getListTeacherStatusByTermID($termOfYearId) {
        return $this->disbursementRepository->getListTeacherStatusByTermID($termOfYearId);

    }

    public function updateDisbursement($id, $data)
    {

        return DB::transaction(function () use ($id, $data) {

            $disbursementData = [
                'sum_yes_unit' => $data['sum_yes_unit'],
                'sum_no_unit' => $data['sum_no_unit'],
                'total' => $data['total'],
                'status' => $data['status'],
            ];

            $disbursement = $this->disbursementRepository->updateDisbursement($id,$disbursementData);

            if (!$disbursement) {
                throw new Exception('disbursement not found.');
            }

            // Sync the products with the pivot table
            $pivotData = [];
            foreach ($data['data'] as $subject) {
                $pivotData[$subject['schedule_teach_id']] = [
                    'count_of_teach' => $subject['count_of_teach'],
                    'unit' => $subject['unit'],
                    'unit_yes' => $subject['unit_yes'],
                    'unit_no' => $subject['unit_no'],
                    'rate_of_unit' => $subject['rate_of_unit'],
                    'total' => $subject['total'],
                    'note' => $subject['note']
                ];
            }

            $disbursement->scheduleTeachs()->sync($pivotData);

            return $disbursement;
        });
    }

    public function updateAcceptDisbursement($id, $data)
    {
        $status = [
            'status' => $data['status']
        ];

        $resp = $this->disbursementRepository->updateDisbursement($id, $status);
        if (!$resp) {
            throw new Exception('disbursement not found.');
        }

        $disbursement = $this->disbursementRepository->getDisbursementByID($id);

        $listDisbursement = $this->getDisbursementsByTeacherIdAndTermOfYearId($disbursement->teacher_id, $disbursement->term_of_year_id);

        $dataFinish = $this->preprocessPdfData($listDisbursement);
        //update pdf Data
        $spdf = new PDFGen(pathFile: $disbursement->pdf_path, data: $dataFinish);
        $spdf->updatePDF();

        return $resp;
    }

    public function updateRejectDisbursement($id, $data)
    {
        $status = [
            'status' => $data['status']
        ];
        $resp = $this->disbursementRepository->updateDisbursement($id, $status);
        if (!$resp) {
            throw new Exception('disbursement not found.');
        }
        return $resp;
    }

    public function generatePdf($data){
        $pdfPath = $data["pdf_path"];
        $fullPath = __DIR__. '/../../../storage/pdfs/' . $pdfPath;

        if (file_exists($fullPath)) {
            $pdf_content = file_get_contents($fullPath);
            $base64_pdf = base64_encode($pdf_content);
            return ["base64" => $base64_pdf];
        } else {
            throw new Exception(File_Not_Found, 404);
        }

    }

    public function deleteDisbursement($id)
    {
        return $this->disbursementRepository->deleteDisbursement($id);
    }

    private function preprocessPdfData($disbursement)
    {
        $teacher_name = $disbursement->teacher->prefix . $disbursement->teacher->fullname;

        $disbursementData = [
            'teacher_name' => $teacher_name,
            'term_of_year' => $disbursement->termOfYear->term,
            'academic_position' => $disbursement->teacher->academicPosition->name,
            'management_position' => $disbursement->teacher->managementPosition->name,
            'sum_yes_unit' => $disbursement->sum_yes_unit,
            'sum_no_unit' => $disbursement->sum_no_unit,
            'total' => $disbursement->total,
            'data' => $disbursement->data,
        ];

        return $disbursementData;
    }
}
