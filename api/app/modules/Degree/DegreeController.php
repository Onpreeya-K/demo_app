<?php

namespace App\Modules\Degree;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;
class DegreeController
{
    protected $degreeService;

    public function __construct(DegreeService $degreeService)
    {
        $this->degreeService = $degreeService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $degrees = $this->degreeService->getAllDegrees();
            return HelperResponse::json($response, $degrees);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        try {
            $degree = $this->degreeService->getDegreeById($args['id']);
            return HelperResponse::json($response, $degree);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function create(Request $request, Response $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $degree = $this->degreeService->createDegree($data);
            return HelperResponse::json($response, $degree, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $degree = $this->degreeService->updateDegree($args['id'], $data);
            return HelperResponse::json($response, $degree, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args)
    {
        try {
            $data = $this->degreeService->deleteDegree($args['id']);
            return HelperResponse::json($response, $data, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
