<?php

use App\Middleware\AuthMiddleware;
use Slim\Routing\RouteCollectorProxy as Group;

$secret = "abcd";
// Define routes for teacher
$app->group('/teachers', function (Group $group) {
    $group->get('', 'App\Controllers\TeacherController:fetch');
    $group->get('/{id}', 'App\Controllers\TeacherController:fetchByID');
    $group->post('', 'App\Controllers\TeacherController:create');
    $group->put('/{id}', 'App\Controllers\TeacherController:update');
    $group->delete('/{id}', 'App\Controllers\TeacherController:delete');
})->add(new AuthMiddleware($secret));
