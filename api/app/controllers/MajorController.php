<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\MajorService;

class MajorController {
    private $majorService;

    public function __construct(MajorService $majorService) {
        $this->majorService = $majorService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $major = $this->majorService->createMajor($data);
        $response->getBody()->write(json_encode($major));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $major = $this->majorService->getAllMajors();
        $response->getBody()->write(json_encode($major));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchMajorByID(Request $request, Response $response, $args) {
        $majorId = $args['id'];
        $major = $this->majorService->getMajorById($majorId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $majorId = $args['id'];
        $data = $request->getParsedBody();
        $major = $this->majorService->updateMajor($majorId, $data);
        $response->getBody()->write(json_encode($major));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $majorId = $args['id'];
        $this->majorService->deleteMajor($majorId);
        return $response->withStatus(204);
    }
}
