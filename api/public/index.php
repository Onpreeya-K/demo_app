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


use App\Middleware\CorsMiddleware;
use App\Middleware\ResponseMiddleware;
use App\Middleware\LoggerMiddleware;

use App\Utils\PDFGen;
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
$app->setBasePath('/teaching/api/v1');

$app->addRoutingMiddleware();

// Add BodyParsingMiddleware
$app->addBodyParsingMiddleware();

// Set up Eloquent ORM
$capsule = new Capsule;
$capsule->addConnection($dbConfig);
$capsule->setAsGlobal();
$capsule->bootEloquent();
$secret = $_ENV['SECRET_KEY'];
$hostUrl = $_ENV['HOST_URL'];

$app->add(ResponseMiddleware::class);
$app->add( new CorsMiddleware($hostUrl));
$app->add(LoggerMiddleware::class,); 

// Load routes file
require __DIR__ . '/../routes/routes.php';

$app->run();