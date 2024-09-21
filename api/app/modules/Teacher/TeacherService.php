<?php

namespace App\Modules\Teacher;

use App\Modules\User\UserService;

class TeacherService
{
    protected $teacherRepository;
    protected $userService;

    public function __construct(TeacherRepository $teacherRepository, UserService $userService)
    {
        $this->teacherRepository = $teacherRepository;
        $this->userService = $userService;
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
    {   
        $data["is_active"] = 1;
        $insertTeacher = $this->teacherRepository->createTeacher($data);

        if ($insertTeacher) {
            $user = [
                "username" => $data["username"],
                "password" => $data["username"],
                "role" => "user"
            ];
            $insertUser = $this->userService->createUser($user);
            if (!$insertUser) {
                throw new \Exception("Failed to create user");
            }
            return $insertTeacher;
        }
        else {
            throw new \Exception("Failed to create teacher");
        }
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
