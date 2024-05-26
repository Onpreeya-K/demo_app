<?php

namespace App\Repositories;

use App\Models\Entities\Teacher;

class TeacherRepository
{
    public function getAllTeachers()
    {
        return Teacher::get();
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
        return Teacher::where('teacher_id', $id)->delete();
    }
}
