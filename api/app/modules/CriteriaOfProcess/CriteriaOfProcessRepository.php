<?php

namespace App\Modules\CriteriaOfProcess;

use App\Modules\CriteriaOfProcess\Model\CriteriaOfProcess;

class CriteriaOfProcessRepository
{
    public function getAllCriteriaOfProcesss()
    {
        return CriteriaOfProcess::get();
    }

    public function getCriteriaOfProcessById($id)
    {
        return CriteriaOfProcess::find($id);
    }

    public function createCriteriaOfProcess($data)
    {
        
        return CriteriaOfProcess::create($data);
    }

    public function updateCriteriaOfProcess($id, $data)
    {
        return CriteriaOfProcess::where('criteria_of_process_id', $id)->update($data);
    }

    public function deleteCriteriaOfProcess($id)
    {
        return CriteriaOfProcess::where('criteria_of_process_id', $id)->delete();
    }
}
