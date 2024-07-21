<?php

namespace App\Modules\Teacher;

use App\Modules\Teacher\Model\Teacher;

class TeacherRepository
{
    public function getAllTeachers()
    {
        return Teacher::with('managementPosition')->where('is_active', 1)->get();
    }

    public function getTeacherById($id)
    {
        return Teacher::find($id);
    }

    public function createTeacher($data)
    {
        
        return Teacher::create($data);
    }

    public function updateTeacher($id, $data)
    {
        return Teacher::where('teacher_id', $id)->update($data);
    }

    public function deleteTeacher($id)
    {
        return Teacher::where('teacher_id', $id)->update(array('is_active'=> 0));
    }
}
