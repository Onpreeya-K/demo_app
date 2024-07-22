<?php

namespace App\Modules\Department;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class DepartmentController
{
    protected $departmentService;

    public function __construct(DepartmentService $departmentService)
    {
        $this->departmentService = $departmentService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $departments = $this->departmentService->getAllDepartments();
        $response->getBody()->write(json_encode($departments));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        $department = $this->departmentService->getDepartmentById($args['id']);
        $response->getBody()->write(json_encode($department));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $department = $this->departmentService->createDepartment($data);
        $response->getBody()->write(json_encode($department));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $department = $this->departmentService->updateDepartment($args['id'], $data);
        $response->getBody()->write(json_encode($department));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args)
    {
        $this->departmentService->deleteDepartment($args['id']);
        return $response->withStatus(204);
    }
}