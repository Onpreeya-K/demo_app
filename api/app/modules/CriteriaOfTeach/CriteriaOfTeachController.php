<?php

namespace App\Modules\CriteriaOfTeach;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;

class CriteriaOfTeachController {
    private $criteriaOfTeachService;

    public function __construct(CriteriaOfTeachService $criteriaOfTeachService) {
        $this->criteriaOfTeachService = $criteriaOfTeachService;
    }

    public function create(Request $request, Response $response) {
        try {
            $data = $request->getParsedBody();
            $criteriaOfTeach = $this->criteriaOfTeachService->createCriteriaOfTeach($data);
            return HelperResponse::json($response, $criteriaOfTeach, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetch(Request $request, Response $response, $args) {
        try {
            $criteriaOfTeach = $this->criteriaOfTeachService->getAllCriteriaOfTeachs();
            return HelperResponse::json($response, $criteriaOfTeach);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchByLevelId(Request $request, Response $response, $args) {
        try {
            $criteriaOfTeach = $this->criteriaOfTeachService->getCriteriaOfTeachByLevelId();
            return HelperResponse::json($response, $criteriaOfTeach);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchCriteriaOfTeachByID(Request $request, Response $response, $args) {
        try {
            $criteriaOfTeachId = $args['id'];
            $criteriaOfTeach = $this->criteriaOfTeachService->getCriteriaOfTeachById($criteriaOfTeachId);
            return HelperResponse::json($response, $criteriaOfTeach);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args) {
        try {
            $criteriaOfTeachId = $args['id'];
            $data = $request->getParsedBody();
            $criteriaOfTeach = $this->criteriaOfTeachService->updateCriteriaOfTeach($criteriaOfTeachId, $data);
            return HelperResponse::json($response, $criteriaOfTeach, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args) {
        try {
            $criteriaOfTeachId = $args['id'];
            $criteriaOfTeach = $this->criteriaOfTeachService->deleteCriteriaOfTeach($criteriaOfTeachId);
            return HelperResponse::json($response, $criteriaOfTeach, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
