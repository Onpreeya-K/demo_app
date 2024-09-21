<?php

namespace App\Modules\Disbursement;

use App\Modules\Disbursement\Model\Disbursement;

use Illuminate\Database\Capsule\Manager as DB;

class DisbursementRepository
{
    public function getAllDisbursements()
    {
        return Disbursement::get();
    }

    public function getDisbursementByID($id){
        return Disbursement::find($id);
    }
    
    public function getDisbursementByTermID($termOfYearId){
        return Disbursement::where('term_of_year_id', $termOfYearId)->get();
    }

    public function getDisbursementByTeacherID($teacherId){
        return Disbursement::where('teacher_id', $teacherId)->get();
    }

    public function getDisbursementByTeacherIDAndTermID($teacherId, $termOfYearId){
        $data = Disbursement::where('teacher_id', $teacherId)
                              ->where('term_of_year_id', $termOfYearId)
                              ->get();
        if (count($data) == 0) {
            return null;
        }
        return $data[0];
    }

    public function getListDisbursementTeachByDisbursementID($disbursementId){

        $disbursmentData = Disbursement::find($disbursementId);
        if (!$disbursmentData) {
            return null;
        }
        $listDisburseteach = $disbursmentData->scheduleTeachs()->withPivot('count_of_teach', 'unit', 'unit_yes', 'unit_no', 'rate_of_unit', 'total', 'note')->with(['subject'])->get();

        return $listDisburseteach;
    }

    public function getListTeacherStatusByTermID($termOfYearId){
        return Disbursement::with(['teacher' => function($query) {
            $query->select('teacher_id', 'prefix', 'fullname',); // Customize columns from the 'product' table
        }])
        ->where('term_of_year_id', $termOfYearId)
        ->get();
    }

    public function createDisbursement($data)
    {
        
        return Disbursement::create($data);
    }

    public function updateDisbursement($id, $data){
    $disbursement = $this->getDisbursementByID($id);
        if (!$disbursement) {
            return null;
        }

        $disbursement->update($data);
        return $disbursement;
    }

    public function deleteDisbursement($id)
    {
        return Disbursement::where('disbursement_id', $id)->delete();
    }

}
