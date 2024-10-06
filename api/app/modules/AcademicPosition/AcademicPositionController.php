<?php

namespace App\Modules\AcademicPosition;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


use App\Utils\HelperResponse;
class AcademicPositionController {
    private $academicPositionService;

    public function __construct(AcademicPositionService $academicPositionService) {
        $this->academicPositionService = $academicPositionService;
    }

    public function create(Request $request, Response $response) {
        try {
            $data = $request->getParsedBody();
            $academicPosition = $this->academicPositionService->createAcademicPosition($data);

            return HelperResponse::json( $response,  $academicPosition, 201);

        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetch(Request $request, Response $response, $args) {
        try {
            $academicPosition = $this->academicPositionService->getAllAcademicPositions();
            return HelperResponse::json($response, $academicPosition);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException( $response, $e);
        }
    }

    public function fetchByID(Request $request, Response $response, $args) {
        try {
            $academicPositionId = $args['id'];
            $academicPosition = $this->academicPositionService->getAcademicPositionById($academicPositionId);
            return HelperResponse::json($response, $academicPosition);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args) {
        try {
            $academicPositionId = $args['id'];
            $data = $request->getParsedBody();
            $academicPosition = $this->academicPositionService->updateAcademicPosition($academicPositionId, $data);
            return HelperResponse::json($response,  $academicPosition, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args) {
        try {
            $academicPositionId = $args['id'];
            $data = $this->academicPositionService->deleteAcademicPosition($academicPositionId);
            return HelperResponse::json($response, $data, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
