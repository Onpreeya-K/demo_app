<?php

namespace App\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Server\MiddlewareInterface;

class ResponseMiddleware implements MiddlewareInterface
{

    public function process(Request $request, RequestHandler $handler): Response
    {
        
        $response = $handler->handle($request);

        $statusCode = $response->getStatusCode();

        $messageResponse = "";
        if ($statusCode >= 200 && $statusCode < 300) {
            $messageResponse = "Success";
        } else if ($statusCode == 400 ) {
            $messageResponse = "Bad Request";
        } else if ($statusCode == 401 ) {
            $messageResponse = "Unauthorized";
        } else if ($statusCode == 404 ) {
            $messageResponse = "Not Found";
        } else if ($statusCode >= 500) {
            $messageResponse = "Internal Server Error";
        }

        
        $body = $response->getBody();
        $body->rewind();
        $data = $body->getContents();

       
        $formattedData = json_encode(['message' => $messageResponse, 'payload' => json_decode($data)]);
        $response = $response->withHeader('Content-Type', 'application/json');

        $body = $response->getBody();
        $body->rewind();
        $body->write($formattedData);

        return $response;
    }
}
