<?php

namespace App\Modules\CriteriaOfProcess;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CriteriaOfProcessController {
    private $criteriaOfTeachService;

    public function __construct(CriteriaOfProcessService $criteriaOfTeachService) {
        $this->criteriaOfTeachService = $criteriaOfTeachService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $criteriaOfTeach = $this->criteriaOfTeachService->createCriteriaOfProcess($data);
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $criteriaOfTeach = $this->criteriaOfTeachService->getAllCriteriaOfProcesss();
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchByLevelId(Request $request, Response $response, $args)
    {
        $criteriaOfTeach = $this->criteriaOfTeachService->getCriteriaOfProcessByLevelId();
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchCriteriaOfProcessByID(Request $request, Response $response, $args) {
        $criteriaOfTeachId = $args['id'];
        $criteriaOfTeach = $this->criteriaOfTeachService->getCriteriaOfProcessById($criteriaOfTeachId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $criteriaOfTeachId = $args['id'];
        $data = $request->getParsedBody();
        $criteriaOfTeach = $this->criteriaOfTeachService->updateCriteriaOfProcess($criteriaOfTeachId, $data);
        $response->getBody()->write(json_encode($criteriaOfTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $criteriaOfTeachId = $args['id'];
        $this->criteriaOfTeachService->deleteCriteriaOfProcess($criteriaOfTeachId);
        return $response->withStatus(204);
    }
}
