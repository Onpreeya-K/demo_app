<?php

namespace App\Modules\Subject;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class SubjectController {
    private $subjectService;

    public function __construct(SubjectService $subjectService) {
        $this->subjectService = $subjectService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $subject = $this->subjectService->createSubject($data);
        $response->getBody()->write(json_encode($subject));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $subject = $this->subjectService->getAllSubjects();
        $response->getBody()->write(json_encode($subject));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchSubjectByID(Request $request, Response $response, $args) {
        $subjectId = $args['id'];
        $subject = $this->subjectService->getSubjectById($subjectId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $subjectId = $args['id'];
        $data = $request->getParsedBody();
        $subject = $this->subjectService->updateSubject($subjectId, $data);
        $response->getBody()->write(json_encode($subject));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $subjectId = $args['id'];
        $this->subjectService->deleteSubject($subjectId);
        return $response->withStatus(204);
    }
}
