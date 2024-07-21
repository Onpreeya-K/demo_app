<?php

namespace App\Modules\AcademicPosition;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AcademicPositionController {
    private $academicPositionService;

    public function __construct(AcademicPositionService $academicPositionService) {
        $this->academicPositionService = $academicPositionService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $academicPosition = $this->academicPositionService->createAcademicPosition($data);
        $response->getBody()->write(json_encode($academicPosition));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $academicPosition = $this->academicPositionService->getAllAcademicPositions();
        $response->getBody()->write(json_encode($academicPosition));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchByID(Request $request, Response $response, $args) {
        $academicPositionId = $args['id'];
        $academicPosition = $this->academicPositionService->getAcademicPositionById($academicPositionId);
        $response->getBody()->write(json_encode($academicPosition));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $academicPositionId = $args['id'];
        $data = $request->getParsedBody();
        $academicPosition = $this->academicPositionService->updateAcademicPosition($academicPositionId, $data);
        $response->getBody()->write(json_encode($academicPosition));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $academicPositionId = $args['id'];
        $this->academicPositionService->deleteAcademicPosition($academicPositionId);
        return $response->withStatus(204);
    }
}
