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
                $this->logError(
                    $response,
                    $request
                );
            }

            return $response;
            

    }

    protected function logRequest(Request $request)
    {
        $headers = $request->getHeaders();
        if (isset($headers['Authorization'])) {
            $headers['Authorization'] = ['*** HIDDEN ***'];
        }

        $body = json_decode((string)$request->getBody(), true);
        if (is_array($body)) {
            $body = $this->maskSensitiveData($body);
        }

        $this->logger->info('Request', [
            'method' => $request->getMethod(),
            'uri' => (string)$request->getUri(),
            'headers' => $headers,
            'body' => $body ? $body : null,
        ]);

    }

    protected function logResponse(Response $response)
    {
        $body = $response->getBody();
        $body->rewind();
        $data = $body->getContents();

        $payload = json_decode($data, true);
        if (is_array($payload)) {
            $payload = $this->maskSensitiveData($payload);
        }

        $this->logger->info('Response', [
            'status' => $response->getStatusCode(),
            'headers' => $response->getHeaders(),
            'body' => $payload ? $payload : null,
        ]);
    }

    protected function logError(Response $response, Request $request)
    {
        $body = $response->getBody();
        $body->rewind();
        $data = $body->getContents();

        $payload = json_decode($data, true);
        $payloadMessage = $payload['payload']['message'] ?? null;

        $this->logger->error('Error', [
            'method' => $request->getMethod(),
            'path' => (string)$request->getUri()->getPath(),
            'code' => $response->getStatusCode(),
            'message' => $payloadMessage,
        ]);
    }

    protected function maskSensitiveData(array $data): array
{
    $sensitiveKeys = ['password', 'token'];

    foreach ($data as $key => &$value) {
        if (in_array(strtolower($key), $sensitiveKeys)) {
            $value = '*** MASKED ***';
        } elseif (is_array($value)) {
            $value = $this->maskSensitiveData($value);
        }
    }
    return $data;
}
}


