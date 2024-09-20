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
        // Process the request and get the response
        $response = $handler->handle($request);

        // Get the response status code
        $statusCode = $response->getStatusCode();

        $messageResponse = "";
        if ($statusCode >= 200 && $statusCode < 300) {
            $messageResponse = "success";
        } else if ($statusCode >= 400 && $statusCode < 500) {
            $messageResponse = "not found";
        } else if ($statusCode >= 500) {
            $messageResponse = "server error";
        }
        
            // Get the response body
            $body = $response->getBody();
            $body->rewind();
            $data = $body->getContents();

            // Convert the response data to JSON format
            $formattedData = json_encode(['message' => $messageResponse, 'payload' => json_decode($data)]);
            // Create a new response with the formatted data
            $response = $response->withHeader('Content-Type', 'application/json');
            
            // Replace the body of the response with the new formatted data
            $body = $response->getBody();
            $body->rewind();
            $body->write($formattedData);

        return $response;
    }
}
