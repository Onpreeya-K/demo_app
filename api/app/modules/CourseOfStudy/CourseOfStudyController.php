<?php

namespace App\Modules\CourseOfStudy;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;

class CourseOfStudyController
{
    private $courseOfStudyService;

    public function __construct(CourseOfStudyService $courseOfStudyService)
    {
        $this->courseOfStudyService = $courseOfStudyService;
    }

    public function create(Request $request, Response $response)
    {
        try {
            $data = $request->getParsedBody();
            $courseOfStudy = $this->courseOfStudyService->createCourseOfStudy($data);
            return HelperResponse::json($response, $courseOfStudy, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $courseOfStudy = $this->courseOfStudyService->getAllCourseOfStudys();
            return HelperResponse::json($response, $courseOfStudy);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchCourseOfStudyByID(Request $request, Response $response, $args)
    {
        try {
            $courseOfStudyId = $args['id'];
            $courseOfStudy = $this->courseOfStudyService->getCourseOfStudyById($courseOfStudyId);
            return HelperResponse::json($response, $courseOfStudy);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args)
    {
        try {
            $courseOfStudyId = $args['id'];
            $data = $request->getParsedBody();
            $courseOfStudy = $this->courseOfStudyService->updateCourseOfStudy($courseOfStudyId, $data);
            return HelperResponse::json($response, $courseOfStudy, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args)
    {
        try {
            $courseOfStudyId = $args['id'];
            $data = $this->courseOfStudyService->deleteCourseOfStudy($courseOfStudyId);
            return HelperResponse::json($response,$data,  201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
