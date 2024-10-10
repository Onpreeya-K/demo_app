<?php

namespace App\Modules\TermOfYear;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;

class TermOfYearController
{
    protected $termOfYearService;

    public function __construct(TermOfYearService $termOfYearService)
    {
        $this->termOfYearService = $termOfYearService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $termOfYears = $this->termOfYearService->getAllTermOfYears();
            return HelperResponse::json($response, $termOfYears);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        try {
            $termOfYear = $this->termOfYearService->getTermOfYearById($args['id']);
            return HelperResponse::json($response, $termOfYear);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function create(Request $request, Response $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $termOfYear = $this->termOfYearService->createTermOfYear($data);
            return HelperResponse::json($response, $termOfYear, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $termOfYear = $this->termOfYearService->updateTermOfYear($args['id'], $data);
            return HelperResponse::json($response, $termOfYear,201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args)
    {
        try {
            $data = $this->termOfYearService->deleteTermOfYear($args['id']);
            return HelperResponse::json($response, $data, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
