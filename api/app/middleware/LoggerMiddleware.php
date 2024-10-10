<?php
namespace App\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Monolog\Logger;
use Monolog\Level; 
use Monolog\Handler\StreamHandler;

class LoggerMiddleware implements MiddlewareInterface
{
    protected $logger;

    public function __construct()
    {
        $this->logger = new Logger('activity_logger');
        $this->logger->pushHandler(new StreamHandler(__DIR__ . '/../../logs/activity.log', Level::Info));
        $this->logger->pushHandler(new StreamHandler(__DIR__ . '/../../logs/error.log', Level::Error));
    }

    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
            $this->logRequest($request);

            $response = $handler->handle($request);

            $this->logResponse($response);

            if($response->getStatusCode() >= 400) {
                $this->logError(new \Exception(
                    $response->getReasonPhrase(), 
                    $response->getStatusCode()));
            }

            return $response;
            

    }

    protected function logRequest(Request $request)
    {
        $this->logger->info('Request', [
            'method' => $request->getMethod(),
            'uri' => (string)$request->getUri(),
            'headers' => $request->getHeaders(),
            'body' => (string)$request->getBody(),
        ]);
    }

    protected function logResponse(Response $response)
    {
        $this->logger->info('Response', [
            'status' => $response->getStatusCode(),
            'headers' => $response->getHeaders(),
            'body' => (string)$response->getBody(),
        ]);
    }

    protected function logError(\Exception $exception)
    {
        $this->logger->error('Error', [
            'message' => $exception->getMessage(),
            'code' => $exception->getCode(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString(),
        ]);
    }
}


