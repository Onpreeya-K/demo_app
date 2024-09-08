<?php

namespace App\Modules\Teacher;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TeacherController
{
    protected $teacherService;

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

    public function fetchCriteriaOfProcessByTeacherID(Request $request, Response $response, $args)
    {
        $teacherId = $args['teacherId'];
        $teacher = $this->teacherService->getCriteriaOfProcessByTeacherId($teacherId);
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
        // $dataResq = arra
        $resp = $this->teacherService->deleteTeacher($args['id']);
        // if ($resp > 0) 
        $response->getBody()->write(json_encode(array("data" => $resp)));
        return $response->withHeader('Content-Type', 'application/json')
               ->withStatus(202);
    }
}
