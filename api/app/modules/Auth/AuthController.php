<?php

namespace App\Modules\Auth;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AuthController {
    private $authService;

    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function signUp(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $auth = $this->authService->signUp($data);
        $response->getBody()->write($auth);
        return $response
            ->withStatus(201);
    }

    public function login(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $auth = $this->authService->login($data);
        $response->getBody()->write($auth);
        return $response
            ->withStatus(200);
    }

    public function logout(Request $request, Response $response, $args) {
        $data = $request->getParsedBody();
        $auth = $this->authService->logout($data);
        return $response->withHeader('Content-Type', 'application/json');
    }

    // public function forgetPassword(Request $request, Response $response, $args) {
    //     $authId = $args['id'];
    //     $data = $request->getParsedBody();
    //     $auth = $this->authService->updateAuth($authId, $data);
    //     $response->getBody()->write(json_encode($auth));
    //     return $response->withHeader('Content-Type', 'application/json');
    // }

}
