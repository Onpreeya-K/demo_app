<?php

namespace App\Modules\User;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


use App\Utils\HelperResponse;

class UserController {
    private $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function create(Request $request, Response $response) {
        try {
            $data = $request->getParsedBody();
            $user = $this->userService->createUser($data);
            return HelperResponse::json($response, $user, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetch(Request $request, Response $response, $args) {
        try {
            $user = $this->userService->getAllUsers();
            return HelperResponse::json($response, $user);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchUserByID(Request $request, Response $response, $args) {
        try {
            $userId = $args['id'];
            $user = $this->userService->getUserById($userId);
            return HelperResponse::json($response, $user);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function updatePassword(Request $request, Response $response, $args) {
        try {
            $userId = $args['id'];
            $data = $request->getParsedBody();
            $user = $this->userService->updateUser($userId, $data);
            return HelperResponse::json($response, $user, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function resetPassword(Request $request, Response $response, $args) {
        try {
            $userId = $args['id'];
            $user = $this->userService->resetUserPassword($userId);
            return HelperResponse::json($response, $user, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args) {
        try {
            $userId = $args['id'];
            $data = $this->userService->deleteUser($userId);
            return HelperResponse::json($response, $data, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
