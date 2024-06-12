<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\CourseOfStudyService;

class CourseOfStudyController {
    private $majorService;

    public function __construct(CourseOfStudyService $majorService) {
        $this->majorService = $majorService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $major = $this->majorService->createCourseOfStudy($data);
        $response->getBody()->write(json_encode($major));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $major = $this->majorService->getAllCourseOfStudys();
        $response->getBody()->write(json_encode($major));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchCourseOfStudyByID(Request $request, Response $response, $args) {
        $majorId = $args['id'];
        $major = $this->majorService->getCourseOfStudyById($majorId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $majorId = $args['id'];
        $data = $request->getParsedBody();
        $major = $this->majorService->updateCourseOfStudy($majorId, $data);
        $response->getBody()->write(json_encode($major));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $majorId = $args['id'];
        $this->majorService->deleteCourseOfStudy($majorId);
        return $response->withStatus(204);
    }
}
