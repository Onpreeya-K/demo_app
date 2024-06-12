<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require  '../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use DI\Container;
use Illuminate\Database\Capsule\Manager as Capsule;

use Firebase\JWT\JWT;
use Slim\Factory\AppFactory;

use Symfony\Component\Validator\Validation;

use App\Middleware\AuthMiddleware;
use App\Middleware\CorsMiddleware;
use App\Middleware\ResponseMiddleware;
use Slim\Middleware\BodyParsingMiddleware;
// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Load database configuration
$dbConfig = require __DIR__ . '/../configs/database.php';


// Create Container
$container = new Container();
AppFactory::setContainer($container);

// Create App
$app = AppFactory::create();
$app->setBasePath('/api/v1');

$app->addRoutingMiddleware();

// Add BodyParsingMiddleware
$app->addBodyParsingMiddleware();

// Set up Eloquent ORM
$capsule = new Capsule;
$capsule->addConnection($dbConfig);
$capsule->setAsGlobal();
$capsule->bootEloquent();
$secret = $_ENV['SECRET_KEY'];

// Load routes file
require __DIR__ . '/../routes/routes.php';



$app->get('/key', function (Request $request, Response $response, $args) use ($secret)  {
    $now = new DateTime();
    $future = new DateTime("now +5 hours");
    $jti = base64_encode(random_bytes(16));

    $payload = [
        "iat" => $now->getTimeStamp(),
        "exp" => $future->getTimeStamp(),
        "jti" => $jti,
        "sub" => "abc",
    ];
    
    $token = JWT::encode($payload, $secret , $_ENV["ALGRO"]);
    $resp = array('token' => $token);
    $payload = json_encode($resp);
    $response->getBody()->write($payload);

    return $response
             ->withHeader('Content-Type', 'application/json')
             ->withStatus(200);
});

$app->get('/111', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    // If the body is JSON, it will be an associative array
    if (is_array($data)) {
        $response->getBody()->write(json_encode($data));
    } else {
        $response->getBody()->write('Invalid JSON');
    }

    return $response->withHeader('Content-Type', 'application/json');
})->add(new AuthMiddleware($secret));

$app->add(ResponseMiddleware::class);
$app->add(CorsMiddleware::class);

$app->run();