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
        return Disbursement::where('disbursement_id', $id)->get();
    }
    
    public function getDisbursementByTermID($termOfYearId){
        return Disbursement::where('term_of_year_id', $termOfYearId)->get();
    }

    public function getDisbursementByTeacherID($teacherId){
        return Disbursement::where('teacher_id', $teacherId)->get();
    }

    public function createDisbursement($data)
    {
        
        return Disbursement::create($data);
    }

    public function updateDisbursement($id, $data)
    {
        return Disbursement::where('disbursement_id', $id)->update($data);
    }

    public function deleteDisbursement($id)
    {
        return Disbursement::where('disbursement_id', $id)->delete();
    }

}
