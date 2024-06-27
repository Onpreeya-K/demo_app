<?php

use App\Middleware\AuthMiddleware;
use Slim\Routing\RouteCollectorProxy as Group;
use App\Controllers\AuthController;
use App\Controllers\TeacherController;
use App\Controllers\UserController;
use App\Controllers\DepartmentController;
use App\Controllers\MajorController;
use App\Controllers\DegreeController;
use App\Controllers\CourseOfStudyController;
use App\Controllers\CriteriaOfTeachController;
use App\Controllers\LevelController;
use App\Controllers\ScheduleTeachController;
use App\Controllers\SubjectController;
use App\Controllers\TermOfYearController;

// // Handle preflight requests
// $app->options('/{routes:.+}', function ($request, $response, $args) {
//     return $response;
// });

// Handle OPTIONS requests
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});


// Define routes for auth
$app->group('/auth', function (Group $group) {
    $group->post('/signup', AuthController::class . ':signUp');
    $group->post('/login', AuthController::class .  ':login');
    $group->get('/logout', AuthController::class . ':logout')->add(new AuthMiddleware($_ENV['SECRET_KEY']));
});

// Define routes for teacher
$app->group('/teacher', function (Group $group) {
    $group->get('', TeacherController::class . ':fetch');
    $group->get('/{id}', TeacherController::class . ':fetchByID');
    $group->post('', TeacherController::class . ':create');
    $group->put('/{id}', TeacherController::class . ':update');
    $group->delete('/{id}', TeacherController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for user
$app->group('/user', function (Group $group) {
    $group->get('', UserController::class . ':fetch');
    $group->get('/{id}', UserController::class . ':fetchByID');
    $group->post('', UserController::class . ':create');
    $group->put('/{id}', UserController::class . ':update');
    $group->delete('/{id}', UserController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for department
$app->group('/department', function (Group $group) {
    $group->get('', DepartmentController::class . ':fetch');
    $group->get('/{id}', DepartmentController::class . ':fetchByID');
    $group->post('', DepartmentController::class . ':create');
    $group->put('/{id}', DepartmentController::class . ':update');
    $group->delete('/{id}', DepartmentController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for major
$app->group('/major', function (Group $group) {
    $group->get('', MajorController::class . ':fetch');
    $group->get('/{id}', MajorController::class . ':fetchByID');
    $group->post('', MajorController::class . ':create');
    $group->put('/{id}', MajorController::class . ':update');
    $group->delete('/{id}', MajorController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for degree
$app->group('/degree', function (Group $group) {
    $group->get('', DegreeController::class . ':fetch');
    $group->get('/{id}', DegreeController::class . ':fetchByID');
    $group->post('', DegreeController::class . ':create');
    $group->put('/{id}', DegreeController::class . ':update');
    $group->delete('/{id}', DegreeController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for courseOfStudy
$app->group('/courseOfStudy', function (Group $group) {
    $group->get('', CourseOfStudyController::class . ':fetch');
    $group->get('/{id}', CourseOfStudyController::class . ':fetchByID');
    $group->post('', CourseOfStudyController::class . ':create');
    $group->put('/{id}', CourseOfStudyController::class . ':update');
    $group->delete('/{id}', CourseOfStudyController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for criteriaOfTeach
$app->group('/criteriaOfTeach', function (Group $group) {
    $group->get('', CriteriaOfTeachController::class . ':fetch');
    $group->get('/{id}', CriteriaOfTeachController::class . ':fetchByID');
    $group->post('', CriteriaOfTeachController::class . ':create');
    $group->put('/{id}', CriteriaOfTeachController::class . ':update');
    $group->delete('/{id}', CriteriaOfTeachController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for level
$app->group('/level', function (Group $group) {
    $group->get('', LevelController::class . ':fetch');
    $group->get('/{id}', LevelController::class . ':fetchByID');
    $group->post('', LevelController::class . ':create');
    $group->put('/{id}', LevelController::class . ':update');
    $group->delete('/{id}', LevelController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for scheduleTeach
$app->group('/scheduleTeach', function (Group $group) {
    $group->get('', ScheduleTeachController::class . ':fetch');
    $group->get('/{id}', ScheduleTeachController::class . ':fetchByID');
    $group->post('', ScheduleTeachController::class . ':create');
    $group->put('/{id}', ScheduleTeachController::class . ':update');
    $group->delete('/{id}', ScheduleTeachController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for subject
$app->group('/subject', function (Group $group) {
    $group->get('', SubjectController::class . ':fetch');
    $group->get('/{id}', SubjectController::class . ':fetchByID');
    $group->post('', SubjectController::class . ':create');
    $group->put('/{id}', SubjectController::class . ':update');
    $group->delete('/{id}', SubjectController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));

// Define routes for termOfYear
$app->group('/termOfYear', function (Group $group) {
    $group->get('', TermOfYearController::class . ':fetch');
    $group->get('/{id}', TermOfYearController::class . ':fetchByID');
    $group->post('', TermOfYearController::class . ':create');
    $group->put('/{id}', TermOfYearController::class . ':update');
    $group->delete('/{id}', TermOfYearController::class . ':delete');
})->add(new AuthMiddleware($_ENV['SECRET_KEY']));