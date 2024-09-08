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

    public function getCriteriaOfProcessByTeacherID($teacherId)
    {
        $data = $this->teacherRepository->findCriteriaOfProcessByTeacherID($teacherId);
        $newData = $data->toArray()[0];

        $criteria_of_process = $newData['management_position']['criteria_of_process'];
        unset($newData['management_position']['criteria_of_process']);

        $newData['criteria_of_process'] = $criteria_of_process;

        return  $newData;
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
