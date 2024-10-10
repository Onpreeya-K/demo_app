<?php

namespace App\Modules\Subject;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;

class SubjectController
{
    private $subjectService;

    public function __construct(SubjectService $subjectService)
    {
        $this->subjectService = $subjectService;
    }

    public function create(Request $request, Response $response)
    {
        try {
            $data = $request->getParsedBody();
            $subject = $this->subjectService->createSubject($data);

            return HelperResponse::json($response, $subject, statusCode: 201);
        } catch (\Exception $e) {

            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $subject = $this->subjectService->getAllSubjects();

            return HelperResponse::json($response,  $subject);
        } catch (\Exception $e) {

            return HelperResponse::jsonWithException($response,  $e);
        }
    }

    public function fetchByID(Request $request, Response $response, $args)
    {
        try {
            $subjectId = $args['id'];
            $subject = $this->subjectService->getSubjectById($subjectId);

            return HelperResponse::json($response,  $subject);
        } catch (\Exception $e) {

            return HelperResponse::jsonWithException($response,  $e);
        }
    }

    public function update(Request $request, Response $response, $args)
    {
        try {

            $subjectId = $args['id'];
            $data = $request->getParsedBody();
            $subject = $this->subjectService->updateSubject($subjectId, $data);

            return HelperResponse::json($response,  $subject,  201);
        } catch (\Exception $e) {

            return HelperResponse::jsonWithException($response,  $e);
        }
    }

    public function delete(Request $request, Response $response, $args)
    {
        try {
            $subjectId = $args['id'];

            $subject = $this->subjectService->deleteSubject($subjectId);
            return HelperResponse::json($response,  $subject);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response,  $e);
        }
    }
}
