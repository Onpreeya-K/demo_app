<?php

namespace App\Modules\Department;

use Exception;
use App\Constant\ErrorMessage;

class DepartmentService
{
    protected $departmentRepository;

    public function __construct(DepartmentRepository $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
    }

    public function getAllDepartments()
    {
        $fetchAll = $this->departmentRepository->getAllDepartments();
        if (!$fetchAll) {
            throw new Exception(ErrorMessage::DEPARTMENT_NOT_FOUND, 404);
        }
        return $fetchAll;
    }

    public function getDepartmentById($id)
    {
        $fetch = $this->departmentRepository->getDepartmentById($id);
        if (!$fetch) {
            throw new Exception(ErrorMessage::DEPARTMENT_NOT_FOUND, 404);
        }
        
        return $fetch; 
    }

    public function createDepartment($data)
    {
        $created = $this->departmentRepository->createDepartment($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_DEPARTMENT_ERROR, 400);
        }

        return ["message" => ErrorMessage::CREATE_DEPARTMENT_SUCCESS];
    }

    public function updateDepartment($id, $data)
    {
        $updated = $this->departmentRepository->updateDepartment($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_DEPARTMENT_ERROR, 400);
        }
        return ["message" => ErrorMessage::UPDATE_DEPARTMENT_SUCCESS];
    }

    public function deleteDepartment($id)
    {
        $deleted = $this->departmentRepository->deleteDepartment($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_DEPARTMENT_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_DEPARTMENT_SUCCESS];
    }
}
