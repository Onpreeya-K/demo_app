<?php

namespace App\Modules\Auth;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Constant\ErrorMessage;

class AuthController
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function signUp(Request $request, Response $response)
    {
        $data = $request->getParsedBody();
        $auth = $this->authService->signUp($data);
        $response->getBody()->write($auth);
        return $response
            ->withStatus(201);
    }

    public function login(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();

        try {
            $auth = $this->authService->login($data);
            $response->getBody()->write(json_encode($auth));
            return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
        } catch (\Exception $e) {
            if ($e->getCode() === 401) {
                $response->getBody()->write(json_encode(['message' => $e->getMessage()]));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
            }

            $response->getBody()->write(json_encode(['message' => ErrorMessage::SOMETHING_WENT_WRONG]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function logout(Request $request, Response $response, $args)
    {
        $data = $request->getParsedBody();
        $auth = $this->authService->logout($data);
        return $response->withHeader('Content-Type', 'application/json');
    }
}
