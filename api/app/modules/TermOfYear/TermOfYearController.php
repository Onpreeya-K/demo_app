<?php

namespace App\Modules\TermOfYear;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TermOfYearController
{
    protected $termOfYearService;

    public function __construct(TermOfYearService $termOfYearService)
    {
        $this->termOfYearService = $termOfYearService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $termOfYears = $this->termOfYearService->getAllTermOfYears();
        $response->getBody()->write(json_encode($termOfYears));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        $termOfYear = $this->termOfYearService->getTermOfYearById($args['id']);
        $response->getBody()->write(json_encode($termOfYear));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $termOfYear = $this->termOfYearService->createTermOfYear($data);
        $response->getBody()->write(json_encode($termOfYear));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $termOfYear = $this->termOfYearService->updateTermOfYear($args['id'], $data);
        $response->getBody()->write(json_encode($termOfYear));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args)
    {
        $this->termOfYearService->deleteTermOfYear($args['id']);
        return $response->withStatus(204);
    }
}
