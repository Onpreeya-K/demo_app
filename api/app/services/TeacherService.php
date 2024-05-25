<?php

namespace App\Services;

use App\Repositories\TeacherRepository;

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
    {
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
