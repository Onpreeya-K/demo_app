<?php

// namespace App\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtMiddleware {
    protected $secretKey;

    public function __construct($secretKey) {
        $this->secretKey = $secretKey;
    }
    public function __invoke(Request $request, Response $response, $next) {
        $token = $request->getHeaderLine('Authorization');
        if ($token) {
            try {
                $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
                // If decoding successful, you can proceed with the request
                $response = $next($request, $response);
            } catch (\Exception $e) {
                // If decoding fails, return unauthorized response
                return $response->withStatus(401)->withJson(array('message' => 'Unauthorized'));
            }
        } else {
            // If no token provided, return unauthorized response
            $errorMessage = array('message' => 'Unauthorized');
            $newRes = $response->getBody()->write(json_encode($errorMessage));
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(401);
        }
        return $response;
    }
    public function generateToken($payload) {
        return JWT::encode($payload, $this->secretKey, 'HS256');
    }
}
