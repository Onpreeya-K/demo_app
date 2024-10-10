<?php

namespace App\Modules\Disbursement;

use Illuminate\Database\Capsule\Manager as DB;
use Exception;
use App\Utils\PDFGen;

use App\Constant\ErrorMessage;

class DisbursementService
{
    protected $disbursementRepository;


    public function __construct(DisbursementRepository $disbursementRepository)
    {
        $this->disbursementRepository = $disbursementRepository;
    }

    public function getAllDisbursements()
    {
        $disb =  $this->disbursementRepository->getAllDisbursements();
        if (!$disb) {
            throw new Exception(ErrorMessage::DISBURSEMENT_NOT_FOUND, 404);
        }
        return $disb;
    }

    public function getDisbursementsById($Id)
    {
        $disb = $this->disbursementRepository->getDisbursementByID($Id);
        if (!$disb) {
            throw new Exception(ErrorMessage::DISBURSEMENT_NOT_FOUND, 404);
        }
        return $disb;
    }

    public function getDisbursementsByTermOfYearId($termOfYearId)
    {
        $disb =  $this->disbursementRepository->getDisbursementByTermID($termOfYearId);
        if (!$disb) {
            throw new Exception(ErrorMessage::DISBURSEMENT_NOT_FOUND, 404);
        }
        return $disb;
    }

    public function getDisbursementsByTeacherId($teacherId)
    {
        $disb =  $this->disbursementRepository->getDisbursementByTeacherID($teacherId);
        if (!$disb) {
            throw new Exception(ErrorMessage::DISBURSEMENT_NOT_FOUND, 404);
        }
        return $disb;
    }

    public function getDisbursementsByTeacherIdAndTermOfYearId($teacherId, $termOfYearId)
    {

        $dataDisbursement = $this->disbursementRepository->getDisbursementByTeacherIDAndTermID($teacherId, $termOfYearId);
        if (!$dataDisbursement) {
            throw new Exception(ErrorMessage::DISBURSEMENT_NOT_FOUND, 404);
        }

        $listDisbursementTeach = $this->disbursementRepository->getListDisbursementTeachByDisbursementID($dataDisbursement->disbursement_id);
        if (!$listDisbursementTeach) {
            throw new Exception(ErrorMessage::DISBURSEMENT_TEACH_NOT_FOUND, 404);
        }

        $dataDisbursement['data'] = $listDisbursementTeach;

        return $dataDisbursement;
    }

    public function createDisbursementWithTech($data)
    {
        $pdfPath = 'disbursement_' . $data['term_of_year_id'] . '_' . $data['teacher_id'] . '_' . time() . '.pdf';

        try {
            $spdf = new PDFGen(pathFile: $pdfPath);
            $spdf->createPDF();

            DB::transaction(function () use ($data, $pdfPath) {

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
            });

            return ["message" => ErrorMessage::CREATE_DISBURSEMENT_SUCCESS]; 

        } catch (Exception $e) {
            throw new Exception(ErrorMessage::CREATE_DISBURSEMENT_ERROR, 400);
        }
    }

    public function getListTeacherStatusByTermID($termOfYearId)
    {
        return $this->disbursementRepository->getListTeacherStatusByTermID($termOfYearId);
    }

    public function updateDisbursement($id, $data)
    {

        try {
            return DB::transaction(function () use ($id, $data) {

            $disbursementData = [
                'sum_yes_unit' => $data['sum_yes_unit'],
                'sum_no_unit' => $data['sum_no_unit'],
                'total' => $data['total'],
                'status' => $data['status'],
            ];

            $disbursement = $this->disbursementRepository->updateDisbursement($id, $disbursementData);

            if (!$disbursement) {
                throw new Exception('disbursement not found.');
            }

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

            return ["message" => ErrorMessage::UPDATE_DISBURSEMENT_SUCCESS];
            });
        } catch (Exception $e) {
            throw new Exception(ErrorMessage::UPDATE_DISBURSEMENT_ERROR, 400);
        }
    }

    public function updateAcceptDisbursement($id, $data)
    {
        try {
            $status = [
            'status' => $data['status']
            ];

            $resp = $this->disbursementRepository->updateDisbursement($id, $status);
            if (!$resp) {
            throw new Exception(ErrorMessage::UPDATE_DISBURSEMENT_STATUS_ERROR, 400);
            }

            $disbursement = $this->disbursementRepository->getDisbursementByID($id);

            $listDisbursement = $this->getDisbursementsByTeacherIdAndTermOfYearId($disbursement->teacher_id, $disbursement->term_of_year_id);

            $dataFinish = $this->preprocessPdfData($listDisbursement);
            //update pdf Data
            
            $spdf = new PDFGen(pathFile: $disbursement->pdf_path, data: $dataFinish);
            $spdf->updatePDF();

            return ["message" => ErrorMessage::UPDATE_DISBURSEMENT_STATUS_SUCCESS];
        } catch (Exception $e) {
            throw new Exception(ErrorMessage::UPDATE_DISBURSEMENT_STATUS_ERROR, 400);
        }
    }

    public function updateRejectDisbursement($id, $data)
    {
        $status = [
            'status' => $data['status']
        ];
        $resp = $this->disbursementRepository->updateDisbursement($id, $status);
        if (!$resp) {
            throw new Exception(ErrorMessage::UPDATE_DISBURSEMENT_STATUS_ERROR, 400);
        }
        return ["message" => ErrorMessage::UPDATE_DISBURSEMENT_STATUS_SUCCESS];
    }

    public function generatePdf($data)
    {
        $pdfPath = $data["pdf_path"];
        $fullPath = __DIR__ . '/../../../storage/pdfs/' . $pdfPath;

        if (file_exists($fullPath)) {
            $pdf_content = file_get_contents($fullPath);
            $base64_pdf = base64_encode($pdf_content);
            return ["base64" => $base64_pdf];
        } else {
            throw new Exception(ErrorMessage::PDF_FILE_NOT_FOUND, 404);
        }
    }

    public function deleteDisbursement($id)
    {
        $deleted = $this->disbursementRepository->deleteDisbursement($id);
        if(!$deleted){
            throw new Exception(ErrorMessage::DELETE_DISBURSEMENT_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_DISBURSEMENT_SUCCESS];
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
