<?php

namespace App\Modules\Department;

use App\Modules\Department\Model\Department;

class DepartmentRepository
{
    public function getAllDepartments()
    {
        return Department::get();
    }

    public function getDepartmentById($id)
    {
        return Department::find($id);
    }

    public function createDepartment($data)
    {
        
        return Department::create($data);
    }

    public function updateDepartment($id, $data)
    {
        return Department::where('department_id', $id)->update($data);
    }

    public function deleteDepartment($id)
    {
        return Department::where('department_id', $id)->delete();
    }
}
