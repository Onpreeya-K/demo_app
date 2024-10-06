<?php

namespace App\Modules\ScheduleTeach;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;
class ScheduleTeachController {
    private $scheduleTeachService;

    public function __construct(ScheduleTeachService $scheduleTeachService) {
        $this->scheduleTeachService = $scheduleTeachService;
    }

    public function create(Request $request, Response $response) {
        try {
            $data = $request->getParsedBody();
            $scheduleTeach = $this->scheduleTeachService->createScheduleTeach($data);
            return HelperResponse::json($response, $scheduleTeach, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $scheduleTeach = $this->scheduleTeachService->getAllScheduleTeachs();
            return HelperResponse::json($response, $scheduleTeach);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchScheduleTeachByTermIdAndTeacherID(Request $request, Response $response, $args) {
        try {
            $termID = $args['termId'];
            $teacherID = $args['teacherID'];
            $scheduleTeach = $this->scheduleTeachService->getScheduleTeachByTermIdAndTeacherID($termID, $teacherID);
            return HelperResponse::json($response, $scheduleTeach);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchListTeacherBytermOfID(Request $request, Response $response, $args) {
        try {
            $termOfYearId = $args['id'];
            $scheduleTeach = $this->scheduleTeachService->getTeacherScheduleByTermOfYearId($termOfYearId);
            return HelperResponse::json($response, $scheduleTeach);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args) {
        try {
            $scheduleTeachId = $args['id'];
            $data = $request->getParsedBody();
            $scheduleTeach = $this->scheduleTeachService->updateScheduleTeach($scheduleTeachId, $data);
            return HelperResponse::json($response, $scheduleTeach, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args) {
        try {
            $scheduleTeachId = $args['id'];
            $data = $this->scheduleTeachService->deleteScheduleTeach($scheduleTeachId);
            return HelperResponse::json($response, $data, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
