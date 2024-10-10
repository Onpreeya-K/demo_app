<?php

namespace App\Modules\Teacher;

use App\Modules\User\UserService;
use Exception;
use App\Constant\ErrorMessage;

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
        $fetchedAll = $this->teacherRepository->getAllTeachers();
        if (!$fetchedAll) {
            throw new Exception(ErrorMessage::TEACHER_NOT_FOUND, 404);
        }
        return $fetchedAll;
    }

    public function getAllTeachersWithoutAdmin()
    {
        $admin = $this->userService->getUsersRole();
        $adminList = [];
        foreach ($admin as $value) {
            array_push($adminList, $value->username);
        }
        $fetchedAll = $this->teacherRepository->getAllTeachersWithOutAdmin($adminList);
        if (!$fetchedAll) {
            throw new Exception(ErrorMessage::TEACHER_NOT_FOUND, 404);
        }
        return $fetchedAll;
    }

    public function getTeacherById($id)
    {
        $fetch = $this->teacherRepository->getTeacherById($id);
        if (!$fetch) {
            throw new Exception(ErrorMessage::TEACHER_NOT_FOUND, 404);
        }
        return $fetch;
    }

    public function getCriteriaOfProcessByTeacherID($teacherId)
    {
        $data = $this->teacherRepository->findCriteriaOfProcessByTeacherID($teacherId);
        if (!$data) {
            throw new Exception(ErrorMessage::TEACHER_NOT_FOUND, 404);
        }
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
                "username" => $data["teacher_id"],
                "password" => $data["teacher_id"],
                "role" => "user"
            ];
            $insertUser = $this->userService->createUser($user);
            if (!$insertUser) {
                throw new Exception(ErrorMessage::CREATE_USER_ERROR, 400);
            }
            return ["message" => ErrorMessage::CREATE_TEACHER_SUCCESS];
        }
        else {
            throw new Exception(ErrorMessage::CREATE_TEACHER_ERROR, 400);
        }
    }

    public function updateTeacher($id, $data)
    {
        $updated = $this->teacherRepository->updateTeacher($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_TEACHER_ERROR, 400);
        }
        return ["message" => ErrorMessage::UPDATE_TEACHER_SUCCESS];
    }

    public function deleteTeacher($id)
    {
        $deleted = $this->teacherRepository->deleteTeacher($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_TEACHER_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_TEACHER_SUCCESS];
    }
}
