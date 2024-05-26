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
// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Load database configuration
$dbConfig = require __DIR__ . '/../configs/database.php';

// Load routes from the separate file
require __DIR__ . '/../routes/routes.php';


// Create Container
$container = new Container();
AppFactory::setContainer($container);

// Create App
$app = AppFactory::create();
$app->setBasePath('/api');

$app->addRoutingMiddleware();
// Set up Eloquent ORM
$capsule = new Capsule;
$capsule->addConnection($dbConfig);
$capsule->setAsGlobal();
$capsule->bootEloquent();
$secret = "abcd";



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
    
    $token = JWT::encode($payload, $secret , "HS256");
    $resp = array('token' => $token);
    $payload = json_encode($resp);
    $response->getBody()->write($payload);

    return $response
             ->withHeader('Content-Type', 'application/json')
             ->withStatus(401);
});

$app->get('/111', function (Request $request, Response $response, $args) {

    $reqData = new App\Models\TeacherDTO();
    $reqData->teacher_id = true;

    // Validate the DTO
    $validator = Validation::createValidator();
    $violations = $validator->validate($reqData);
    print_r($violations);
    if (count($violations) > 0) {
        $errors = [];
        foreach ($violations as $violation) {
            $errors[$violation->getPropertyPath()] = $violation->getMessage();
        }
        echo "asdff";
        print_r($errors);
    }

    $response->getBody()->write("Hello world!");
    return $response;
})->add(new AuthMiddleware($secret));

$app->add(CorsMiddleware::class);
$app->run();