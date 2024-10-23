<?php

namespace App\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Server\MiddlewareInterface;

class CorsMiddleware implements MiddlewareInterface
{
    protected $hostUrl;
    public function __construct(string $hostUrl)
    {
        $this->hostUrl = $hostUrl;
    }
    public function process(Request $request, RequestHandler $handler): Response
    {
        
         if ($request->getMethod() === 'OPTIONS') {
            $response = (new \Slim\Psr7\Response());
            return $this->withCorsHeaders($response, $this->hostUrl);
        }

        $response = $handler->handle($request);
        return $this->withCorsHeaders($response, $this->hostUrl);
    }
    private function withCorsHeaders(Response $response, string $origin): Response
    {
        return $response
            ->withHeader('Access-Control-Allow-Origin', $origin)
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, TransactionDateTime')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Max-Age', '86400')
            ->withHeader('Content-Type', 'application/json');
    }
}
