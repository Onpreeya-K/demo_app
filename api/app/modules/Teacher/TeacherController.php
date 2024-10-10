<?php

namespace App\Modules\Teacher;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;
class TeacherController
{
    protected $teacherService;

    public function __construct(TeacherService $teacherService)
    {
        $this->teacherService = $teacherService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $teachers = $this->teacherService->getAllTeachers();
            return HelperResponse::json($response, $teachers);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        try {
            $teacher = $this->teacherService->getTeacherById($args['id']);
            return HelperResponse::json($response, $teacher);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchCriteriaOfProcessByTeacherID(Request $request, Response $response, $args)
    {
        try {
            $teacherId = $args['teacherId'];
            $teacher = $this->teacherService->getCriteriaOfProcessByTeacherId($teacherId);
            return HelperResponse::json($response, $teacher);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function create(Request $request, Response $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $teacher = $this->teacherService->createTeacher($data);
            return HelperResponse::json($response, $teacher, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args)
    {
        try {
            $teacherId = $args['id'];
            $data = $request->getParsedBody();
            $teacher = $this->teacherService->updateTeacher($teacherId, $data);
            return HelperResponse::json($response, $teacher, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args)
    {
        try {
            $resp = $this->teacherService->deleteTeacher($args['id']);
            return HelperResponse::json($response, $resp, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
