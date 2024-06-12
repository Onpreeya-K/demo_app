<?php

namespace App\Repositories;

use App\Models\Entities\Major;

class MajorRepository
{
    public function getAllMajors()
    {
        return Major::get();
    }

    public function getMajorById($id)
    {
        return Major::find($id);
    }

    public function createMajor($data)
    {
        
        return Major::create($data);
    }

    public function updateMajor($id, $data)
    {
        return Major::where('major_id', $id)->update($data);
    }

    public function deleteMajor($id)
    {
        return Major::where('major_id', $id)->delete();
    }
}
