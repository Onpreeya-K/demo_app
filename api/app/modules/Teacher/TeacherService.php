<?php

namespace App\Modules\Teacher;

class TeacherService
{
    protected $teacherRepository;

    public function __construct(TeacherRepository $teacherRepository)
    {
        $this->teacherRepository = $teacherRepository;
    }

    public function getAllTeachers()
    {
        return $this->teacherRepository->getAllTeachers();
    }

    public function getTeacherById($id)
    {
        return $this->teacherRepository->getTeacherById($id);
    }

    public function createTeacher($data)
    {   $data["is_active"] = 1;
        return $this->teacherRepository->createTeacher($data);
    }

    public function updateTeacher($id, $data)
    {
        return $this->teacherRepository->updateTeacher($id, $data);
    }

    public function deleteTeacher($id)
    {
        return $this->teacherRepository->deleteTeacher($id);
    }
}
