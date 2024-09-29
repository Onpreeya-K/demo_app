<?php

namespace App\Utils;

use Psr\Http\Message\ResponseInterface;
use Exception;
use App\Constant\ErrorMessage;

class HelperResponse
{
    public static function json(ResponseInterface $response,  $data, int $statusCode = 200): ResponseInterface
    {
        $response->getBody()->write(json_encode($data));
        return $response->withStatus($statusCode);
    }
    public static function jsonWithException(ResponseInterface $response, Exception $exception, int $statusCode = 200): ResponseInterface
    {

        $mes = $exception->getMessage();
        $statusCode = $exception->getCode();
        if($exception->getCode() === 500){
            $mes = ErrorMessage::SOMETHING_WENT_WRONG;
        }
            
        $response->getBody()->write(json_encode(['message' => $mes]));
        return $response->withStatus($statusCode);
    }
}