<?php

namespace App\Modules\AcademicPosition;

use App\Modules\AcademicPosition\Model\AcademicPosition;

class AcademicPositionRepository
{
    public function getAllAcademicPositions()
    {
        return AcademicPosition::get();
    }

    public function getAcademicPositionById($id)
    {
        return AcademicPosition::find($id);
    }

    public function createAcademicPosition($data)
    {
        
        return AcademicPosition::create($data);
    }

    public function updateAcademicPosition($id, $data)
    {
        return AcademicPosition::where('criteria_of_teach_id', $id)->update($data);
    }

    public function deleteAcademicPosition($id)
    {
        return AcademicPosition::where('criteria_of_teach_id', $id)->delete();
    }
}
