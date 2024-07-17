<?php

namespace App\Modules\Degree;

use App\Modules\Degree\Model\Degree;

class DegreeRepository
{
    public function getAllDegrees()
    {
        return Degree::get();
    }

    public function getDegreeById($id)
    {
        return Degree::find($id);
    }

    public function createDegree($data)
    {
        
        return Degree::create($data);
    }

    public function updateDegree($id, $data)
    {
        return Degree::where('degree_id', $id)->update($data);
    }

    public function deleteDegree($id)
    {
        return Degree::where('degree_id', $id)->delete();
    }
}
