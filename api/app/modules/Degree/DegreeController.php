<?php

namespace App\Modules\Degree;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class DegreeController
{
    protected $degreeService;

    public function __construct(DegreeService $degreeService)
    {
        $this->degreeService = $degreeService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $degrees = $this->degreeService->getAllDegrees();
        $response->getBody()->write(json_encode($degrees));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        $degree = $this->degreeService->getDegreeById($args['id']);
        $response->getBody()->write(json_encode($degree));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $degree = $this->degreeService->createDegree($data);
        $response->getBody()->write(json_encode($degree));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $degree = $this->degreeService->updateDegree($args['id'], $data);
        $response->getBody()->write(json_encode($degree));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args)
    {
        $this->degreeService->deleteDegree($args['id']);
        return $response->withStatus(204);
    }
}
