<?php

namespace App\Modules\Level;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;
class LevelController
{
    protected $levelService;

    public function __construct(LevelService $levelService)
    {
        $this->levelService = $levelService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $levels = $this->levelService->getAllLevels();
            return HelperResponse::json($response, $levels);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        try {
            $level = $this->levelService->getLevelById($args['id']);
            return HelperResponse::json($response, $level);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function create(Request $request, Response $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $level = $this->levelService->createLevel($data);
            return HelperResponse::json($response, $level,201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $level = $this->levelService->updateLevel($args['id'], $data);
            return HelperResponse::json($response, $level,201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args)
    {
        try {
            $data = $this->levelService->deleteLevel($args['id']);
            return HelperResponse::json($response, $data, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
