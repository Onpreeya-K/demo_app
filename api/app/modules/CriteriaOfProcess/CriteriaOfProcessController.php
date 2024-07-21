<?php

namespace App\Modules\CriteriaOfProcess;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CriteriaOfProcessController {
    private $criteriaOfProcessService;

    public function __construct(CriteriaOfProcessService $criteriaOfProcessService) {
        $this->criteriaOfProcessService = $criteriaOfProcessService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $criteriaOfProcess = $this->criteriaOfProcessService->createCriteriaOfProcess($data);
        $response->getBody()->write(json_encode($criteriaOfProcess));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $criteriaOfProcess = $this->criteriaOfProcessService->getAllCriteriaOfProcesss();
        $response->getBody()->write(json_encode($criteriaOfProcess));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchCriteriaOfProcessByID(Request $request, Response $response, $args) {
        $criteriaOfProcessId = $args['id'];
        $criteriaOfProcess = $this->criteriaOfProcessService->getCriteriaOfProcessById($criteriaOfProcessId);
        $response->getBody()->write(json_encode($criteriaOfProcess));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $criteriaOfProcessId = $args['id'];
        $data = $request->getParsedBody();
        $criteriaOfProcess = $this->criteriaOfProcessService->updateCriteriaOfProcess($criteriaOfProcessId, $data);
        $response->getBody()->write(json_encode($criteriaOfProcess));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $criteriaOfProcessId = $args['id'];
        $this->criteriaOfProcessService->deleteCriteriaOfProcess($criteriaOfProcessId);
        return $response->withStatus(204);
    }
}
