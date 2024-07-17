<?php

namespace App\Modules\CriteriaOfTeach;

use App\Modules\CriteriaOfTeach\Model\CriteriaOfTeach;

class CriteriaOfTeachRepository
{
    public function getAllCriteriaOfTeachs()
    {
        return CriteriaOfTeach::get();
    }
    public function getAllCriteriaOfTeachsByLevelId($level_id)
    {
        return CriteriaOfTeach::with(['courseOfStudy', 'level'])->whereIn('level_id', $level_id)->get();
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
        return CriteriaOfTeach::where('criteria_of_teach_id', $id)->update($data);
    }

    public function deleteCriteriaOfTeach($id)
    {
        return CriteriaOfTeach::where('criteria_of_teach_id', $id)->delete();
    }
}
