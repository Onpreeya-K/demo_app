<?php

namespace App\Modules\CriteriaOfProcess;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;

class CriteriaOfProcessController {
    private $criteriaOfProcessService;

    public function __construct(CriteriaOfProcessService $criteriaOfProcessService) {
        $this->criteriaOfProcessService = $criteriaOfProcessService;
    }

    public function create(Request $request, Response $response) {
        try {
            $data = $request->getParsedBody();
            $criteriaOfProcess = $this->criteriaOfProcessService->createCriteriaOfProcess($data);
            return HelperResponse::json($response, $criteriaOfProcess, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $criteriaOfProcess = $this->criteriaOfProcessService->getAllCriteriaOfProcesss();
            return HelperResponse::json($response, $criteriaOfProcess);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchCriteriaOfProcessByID(Request $request, Response $response, $args) {
        try {
            $criteriaOfProcessId = $args['id'];
            $criteriaOfProcess = $this->criteriaOfProcessService->getCriteriaOfProcessById($criteriaOfProcessId);
            return HelperResponse::json($response, $criteriaOfProcess);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args) {
        try {
            $criteriaOfProcessId = $args['id'];
            $data = $request->getParsedBody();
            $criteriaOfProcess = $this->criteriaOfProcessService->updateCriteriaOfProcess($criteriaOfProcessId, $data);
            return HelperResponse::json($response, $criteriaOfProcess, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args) {
        try {
            $criteriaOfProcessId = $args['id'];
            $data = $this->criteriaOfProcessService->deleteCriteriaOfProcess($criteriaOfProcessId);
            return HelperResponse::json($response, $data, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
