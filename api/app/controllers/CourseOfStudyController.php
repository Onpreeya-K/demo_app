<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\CourseOfStudyService;

class CourseOfStudyController {
    private $courseOfStudyService;

    public function __construct(CourseOfStudyService $courseOfStudyService) {
        $this->courseOfStudyService = $courseOfStudyService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $courseOfStudy = $this->courseOfStudyService->createCourseOfStudy($data);
        $response->getBody()->write(json_encode($courseOfStudy));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $courseOfStudy = $this->courseOfStudyService->getAllCourseOfStudys();
        $response->getBody()->write(json_encode($courseOfStudy));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchCourseOfStudyByID(Request $request, Response $response, $args) {
        $courseOfStudyId = $args['id'];
        $courseOfStudy = $this->courseOfStudyService->getCourseOfStudyById($courseOfStudyId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $courseOfStudyId = $args['id'];
        $data = $request->getParsedBody();
        $courseOfStudy = $this->courseOfStudyService->updateCourseOfStudy($courseOfStudyId, $data);
        $response->getBody()->write(json_encode($courseOfStudy));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $courseOfStudyId = $args['id'];
        $this->courseOfStudyService->deleteCourseOfStudy($courseOfStudyId);
        return $response->withStatus(204);
    }
}
