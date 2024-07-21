<?php

namespace App\Modules\ManagementPosition;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ManagementPositionController {
    private $managementPositionService;

    public function __construct(ManagementPositionService $managementPositionService) {
        $this->managementPositionService = $managementPositionService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $managementPosition = $this->managementPositionService->createManagementPosition($data);
        $response->getBody()->write(json_encode($managementPosition));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $managementPosition = $this->managementPositionService->getAllManagementPositions();
        $response->getBody()->write(json_encode($managementPosition));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchManagementPositionByID(Request $request, Response $response, $args) {
        $managementPositionId = $args['id'];
        $managementPosition = $this->managementPositionService->getManagementPositionById($managementPositionId);
        $response->getBody()->write(json_encode($managementPosition));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $managementPositionId = $args['id'];
        $data = $request->getParsedBody();
        $managementPosition = $this->managementPositionService->updateManagementPosition($managementPositionId, $data);
        $response->getBody()->write(json_encode($managementPosition));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $managementPositionId = $args['id'];
        $this->managementPositionService->deleteManagementPosition($managementPositionId);
        return $response->withStatus(204);
    }
}
