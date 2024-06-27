<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\CriteriaOfTeachService;

class CriteriaOfTeachController {
    private $criteriaOfTeachService;

    public function __construct(CriteriaOfTeachService $criteriaOfTeachService) {
        $this->criteriaOfTeachService = $criteriaOfTeachService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $criteriaOfTeach = $this->criteriaOfTeachService->createCriteriaOfTeach($data);
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $criteriaOfTeach = $this->criteriaOfTeachService->getAllCriteriaOfTeachs();
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchCriteriaOfTeachByID(Request $request, Response $response, $args) {
        $criteriaOfTeachId = $args['id'];
        $criteriaOfTeach = $this->criteriaOfTeachService->getCriteriaOfTeachById($criteriaOfTeachId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $criteriaOfTeachId = $args['id'];
        $data = $request->getParsedBody();
        $criteriaOfTeach = $this->criteriaOfTeachService->updateCriteriaOfTeach($criteriaOfTeachId, $data);
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $criteriaOfTeachId = $args['id'];
        $this->criteriaOfTeachService->deleteCriteriaOfTeach($criteriaOfTeachId);
        return $response->withStatus(204);
    }
}
