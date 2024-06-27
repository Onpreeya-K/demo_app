<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\LevelService;

class LevelController
{
    protected $levelService;

    public function __construct(LevelService $levelService)
    {
        $this->levelService = $levelService;
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $levels = $this->levelService->getAllLevels();
        $response->getBody()->write(json_encode($levels));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        $level = $this->levelService->getLevelById($args['id']);
        $response->getBody()->write(json_encode($level));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $level = $this->levelService->createLevel($data);
        $response->getBody()->write(json_encode($level));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $level = $this->levelService->updateLevel($args['id'], $data);
        $response->getBody()->write(json_encode($level));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args)
    {
        $this->levelService->deleteLevel($args['id']);
        return $response->withStatus(204);
    }
}
