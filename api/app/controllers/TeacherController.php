<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\TeacherService;

class TeacherController
{
    protected $teacherService;
    private $container;

    public function __construct(TeacherService $teacherService)
    {
        $this->teacherService = $teacherService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $teachers = $this->teacherService->getAllTeachers();
        $response->getBody()->write(json_encode($teachers));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        $teacher = $this->teacherService->getTeacherById($args['id']);
        $response->getBody()->write(json_encode($teacher));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $teacher = $this->teacherService->createTeacher($data);
        $response->getBody()->write(json_encode($teacher));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $teacher = $this->teacherService->updateTeacher($args['id'], $data);
        $response->getBody()->write(json_encode($teacher));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args)
    {
        $this->teacherService->deleteTeacher($args['id']);
        return $response->withStatus(204);
    }
}