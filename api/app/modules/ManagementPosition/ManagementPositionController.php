<?php

namespace App\Modules\ManagementPosition;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ManagementPositionController {
    private $criteriaOfTeachService;

    public function __construct(ManagementPositionService $criteriaOfTeachService) {
        $this->criteriaOfTeachService = $criteriaOfTeachService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $criteriaOfTeach = $this->criteriaOfTeachService->createManagementPosition($data);
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $criteriaOfTeach = $this->criteriaOfTeachService->getAllManagementPositions();
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchByLevelId(Request $request, Response $response, $args)
    {
        $criteriaOfTeach = $this->criteriaOfTeachService->getManagementPositionByLevelId();
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchManagementPositionByID(Request $request, Response $response, $args) {
        $criteriaOfTeachId = $args['id'];
        $criteriaOfTeach = $this->criteriaOfTeachService->getManagementPositionById($criteriaOfTeachId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $criteriaOfTeachId = $args['id'];
        $data = $request->getParsedBody();
        $criteriaOfTeach = $this->criteriaOfTeachService->updateManagementPosition($criteriaOfTeachId, $data);
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $criteriaOfTeachId = $args['id'];
        $this->criteriaOfTeachService->deleteManagementPosition($criteriaOfTeachId);
        return $response->withStatus(204);
    }
}
