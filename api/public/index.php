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

use App\Middleware\AuthMiddleware;

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
    $response->getBody()->write("Hello world!");
    return $response;
})->add(new AuthMiddleware($secret));

// $app->get('/teachers', 'App\Controllers\TeacherController:fetch')->add(new AuthMiddleware($secret));
// $app->get('/teachers/{id}', 'App\Controllers\TeacherController:fetchByID')->add(new AuthMiddleware($secret));
// $app->post('/teachers', 'App\Controllers\TeacherController:create')->add(new AuthMiddleware($secret));
// $app->put('/teachers/{id}', 'App\Controllers\TeacherController:update')->add(new AuthMiddleware($secret));
// $app->delete('/teachers/{id}', 'App\Controllers\TeacherController:delete')->add(new AuthMiddleware($secret));

// $app->group('/teachers', function (\Slim\Routing\RouteCollectorProxy $group) {
//     $group->get('', 'App\Controllers\TeacherController:fetch');
//     $group->get('/{id}', 'App\Controllers\TeacherController:fetchByID');
//     $group->post('', 'App\Controllers\TeacherController:create');
//     $group->put('/{id}', 'App\Controllers\TeacherController:update');
//     $group->delete('/{id}', 'App\Controllers\TeacherController:delete');
// })->add(new AuthMiddleware($secret));

// Load routes from the separate file
require __DIR__ . '/../routes/routes.php';
// $routes($app);

$app->run();