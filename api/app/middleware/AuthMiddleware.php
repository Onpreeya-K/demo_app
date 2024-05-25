<?php

namespace App\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Server\MiddlewareInterface;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware implements MiddlewareInterface
{
    private $secret;

    public function __construct($secret)
    {
        $this->secret = $secret;
    }
    public function process(Request $request, RequestHandler $handler): Response
    {
        // Check for the presence of an Authorization header
        $token = $request->getHeaderLine('Authorization');
        $response = new \Slim\Psr7\Response();
        if (!empty($token)) {
            $token = str_replace('Bearer ', '', $token);
            try {
                $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
                $request = $request->withAttribute('jwt', $decoded);
                // If decoding successful, you can proceed with the request
                return $handler->handle($request);
            } catch (\Exception $e) {
                // echo 'Other error: ', $e->getMessage();
                // If decoding fails, return unauthorized response
                $message = array('message' => $e->getMessage());
                $payload = json_encode($message);
                $response->getBody()->write($payload);
                return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(401);
            }
        }else{
            $message = array('message' => 'Unauthorized');
                $payload = json_encode($message);
                $response->getBody()->write($payload);

                return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(401);
        }

        // If the token is valid, proceed to the next middleware/route handler
        // return $handler->handle($request);
    }
}
