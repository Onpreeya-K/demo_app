<?php

namespace App\Modules\Disbursement;

use Illuminate\Database\Capsule\Manager as DB;

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

    public function createDisbursementWithTech($data)
    {
        return DB::transaction(function () use ($data) {

            $disbursementData = [
                'teacher_id' => $data['teacher_id'],
                'term_of_year_id' => $data['term_of_year_id'],
                'sum_yes_unit' => $data['sum_yes_unit'],
                'sum_no_unit' => $data['sum_no_unit'],
                'total' => $data['total'],
                'status' => $data['status'],
                'pdf_path' => $data['pdf_path'] //gen on backend
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

    public function updateDisbursement($id, $data)
    {
        // $data->
        return $this->disbursementRepository->updateDisbursement($id, $data);
    }

    public function deleteDisbursement($id)
    {
        return $this->disbursementRepository->deleteDisbursement($id);
    }
}
