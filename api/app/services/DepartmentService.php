<?php

namespace App\Services;

use App\Repositories\DepartmentRepository;

class DepartmentService
{
    protected $departmentRepository;

    public function __construct(DepartmentRepository $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
    }

    public function getAllDepartments()
    {
        return $this->departmentRepository->getAllDepartments();
    }

    public function getDepartmentById($id)
    {
        return $this->departmentRepository->getDepartmentById($id);
    }

    public function createDepartment($data)
    {
        return $this->departmentRepository->createDepartment($data);
    }

    public function updateDepartment($id, $data)
    {
        return $this->departmentRepository->updateDepartment($id, $data);
    }

    public function deleteDepartment($id)
    {
        return $this->departmentRepository->deleteDepartment($id);
    }
}
