<?php

namespace App\Repositories;

use App\Models\Entities\CriteriaOfTeach;

class CriteriaOfTeachRepository
{
    public function getAllCriteriaOfTeachs()
    {
        return CriteriaOfTeach::get();
    }

    public function getCriteriaOfTeachById($id)
    {
        return CriteriaOfTeach::find($id);
    }

    public function createCriteriaOfTeach($data)
    {
        
        return CriteriaOfTeach::create($data);
    }

    public function updateCriteriaOfTeach($id, $data)
    {
        return CriteriaOfTeach::where('subject_id', $id)->update($data);
    }

    public function deleteCriteriaOfTeach($id)
    {
        return CriteriaOfTeach::where('subject_id', $id)->delete();
    }
}
