<?php

namespace App\Modules\ScheduleTeach;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ScheduleTeachController {
    private $scheduleTeachService;

    public function __construct(ScheduleTeachService $scheduleTeachService) {
        $this->scheduleTeachService = $scheduleTeachService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $scheduleTeach = $this->scheduleTeachService->createScheduleTeach($data);
        $response->getBody()->write(json_encode($scheduleTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $scheduleTeach = $this->scheduleTeachService->getAllScheduleTeachs();
        $response->getBody()->write(json_encode($scheduleTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchScheduleTeachByTermIdAndTeacherID(Request $request, Response $response, $args) {
        $termID = $args['termId'];
        $teacherID = $args['teacherID'];
        $scheduleTeach = $this->scheduleTeachService->getScheduleTeachByTermIdAndTeacherID($termID, $teacherID);
        $response->getBody()->write(json_encode($scheduleTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // /scheduleTeach/teacherSchedule/{id}
    public function fetchListTeacherBytermOfID(Request $request, Response $response, $args) {
        $termOfYearId = $args['id'];
        $scheduleTeach = $this->scheduleTeachService->getTeacherScheduleByTermOfYearId($termOfYearId);
        $response->getBody()->write(json_encode($scheduleTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $scheduleTeachId = $args['id'];
        $data = $request->getParsedBody();
        $scheduleTeach = $this->scheduleTeachService->updateScheduleTeach($scheduleTeachId, $data);
        $response->getBody()->write(json_encode($scheduleTeach));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $scheduleTeachId = $args['id'];
        $this->scheduleTeachService->deleteScheduleTeach($scheduleTeachId);
        return $response->withStatus(204);
    }
}
