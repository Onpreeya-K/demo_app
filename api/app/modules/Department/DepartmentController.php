<?php

namespace App\Modules\Department;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;

class DepartmentController
{
    protected $departmentService;

    public function __construct(DepartmentService $departmentService)
    {
        $this->departmentService = $departmentService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $departments = $this->departmentService->getAllDepartments();
            return HelperResponse::json($response, $departments,201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        try {
            $department = $this->departmentService->getDepartmentById($args['id']);
            return HelperResponse::json($response, $department);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function create(Request $request, Response $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $department = $this->departmentService->createDepartment($data);
            return HelperResponse::json($response, $department);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $department = $this->departmentService->updateDepartment($args['id'], $data);
            return HelperResponse::json($response, $department,201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args)
    {
        try {
            $data = $this->departmentService->deleteDepartment($args['id']);
            return HelperResponse::json($response, $data, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
