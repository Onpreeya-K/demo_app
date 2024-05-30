<?php

use App\Middleware\AuthMiddleware;
use Slim\Routing\RouteCollectorProxy as Group;

$secret = "abcd";

// Handle preflight requests
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// Define routes for auth
$app->group('/auth', function (Group $group) use ($secret){
    $group->post('/signup', 'App\Controllers\AuthController:signUp');
    $group->post('/login', 'App\Controllers\AuthController:login');
    $group->get('/logout', 'App\Controllers\AuthController:logout')->add(new AuthMiddleware($secret));
});

// Define routes for teacher
$app->group('/teacher', function (Group $group) {
    $group->get('', 'App\Controllers\TeacherController:fetch');
    $group->get('/{id}', 'App\Controllers\TeacherController:fetchByID');
    $group->post('', 'App\Controllers\TeacherController:create');
    $group->put('/{id}', 'App\Controllers\TeacherController:update');
    $group->delete('/{id}', 'App\Controllers\TeacherController:delete');
})->add(new AuthMiddleware($secret));

// Define routes for user
$app->group('/user', function (Group $group) {
    $group->get('', 'App\Controllers\UserController:fetch');
    $group->get('/{id}', 'App\Controllers\UserController:fetchByID');
    $group->post('', 'App\Controllers\UserController:create');
    $group->put('/{id}', 'App\Controllers\UserController:update');
    $group->delete('/{id}', 'App\Controllers\UserController:delete');
})->add(new AuthMiddleware($secret));