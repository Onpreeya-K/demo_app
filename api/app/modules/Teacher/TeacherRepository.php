<?php

namespace App\Modules\Teacher;

use App\Modules\Teacher\Model\Teacher;

class TeacherRepository
{
    public function getAllTeachers()
    {
        return Teacher::with(['managementPosition', 'academicPosition'])->where('is_active', 1)->get();
    }

    public function getAllTeachersWithOutAdmin($listId)
    {
        return Teacher::with(['managementPosition', 'academicPosition'])
                        ->where('is_active', 1)
                        ->whereNotIn('teacher_id', $listId)
                        ->get();
    }

    public function getTeacherById($id)
    {
        return Teacher::with(['managementPosition', 'academicPosition'])->find($id);
    }

    public function createTeacher($data)
    {
        
        return Teacher::create($data);
    }

    public function findCriteriaOfProcessByTeacherID($teacherId)
    {
        return Teacher::with('managementPosition.criteriaOfProcess')->where('teacher_id', $teacherId)->get();
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
