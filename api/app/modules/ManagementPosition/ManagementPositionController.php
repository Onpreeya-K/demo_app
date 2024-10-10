<?php

namespace App\Modules\ManagementPosition;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;

class ManagementPositionController {
    private $managementPositionService;

    public function __construct(ManagementPositionService $managementPositionService) {
        $this->managementPositionService = $managementPositionService;
    }

    public function create(Request $request, Response $response) {
        try {
            $data = $request->getParsedBody();
            $managementPosition = $this->managementPositionService->createManagementPosition($data);
            return HelperResponse::json($response, $managementPosition,201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetch(Request $request, Response $response, $args) {
        try {
            $managementPosition = $this->managementPositionService->getAllManagementPositions();
            return HelperResponse::json($response, $managementPosition);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchManagementPositionByID(Request $request, Response $response, $args) {
        try {
            $managementPositionId = $args['id'];
            $managementPosition = $this->managementPositionService->getManagementPositionById($managementPositionId);
            return HelperResponse::json($response, $managementPosition);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args) {
        try {
            $managementPositionId = $args['id'];
            $data = $request->getParsedBody();
            $managementPosition = $this->managementPositionService->updateManagementPosition($managementPositionId, $data);
            return HelperResponse::json($response, $managementPosition,201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args) {
        try {
            $managementPositionId = $args['id'];
            $data = $this->managementPositionService->deleteManagementPosition($managementPositionId);
            return HelperResponse::json($response, $data, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
