<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\UserService;

class UserController {
    private $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $user = $this->userService->createUser($data);
        $response->getBody()->write(json_encode($user));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $user = $this->userService->getAllUsers();
        $response->getBody()->write(json_encode($user));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchUserByID(Request $request, Response $response, $args) {
        $userId = $args['id'];
        $user = $this->userService->getUserById($userId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $userId = $args['id'];
        $data = $request->getParsedBody();
        $user = $this->userService->updateUser($userId, $data);
        $response->getBody()->write(json_encode($user));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $userId = $args['id'];
        $this->userService->deleteUser($userId);
        return $response->withStatus(204);
    }
}
