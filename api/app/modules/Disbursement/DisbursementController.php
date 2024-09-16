<?php

namespace App\Modules\Disbursement;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class DisbursementController {
    private $disbursementService;

    public function __construct(DisbursementService $disbursementService) {
        $this->disbursementService = $disbursementService;
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        $disbursement = $this->disbursementService->createDisbursementWithTech($data);
        $response->getBody()->write(json_encode($disbursement));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetch(Request $request, Response $response, $args)
    {
        $disbursement = $this->disbursementService->getAllDisbursements();
        $response->getBody()->write(json_encode($disbursement));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchDisbursementsByID(Request $request, Response $response, $args) {
        $id = $args['id'];
        $disbursement = $this->disbursementService->getDisbursementsById($id);
        $response->getBody()->write(json_encode($disbursement));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchDisbursementsByTermID(Request $request, Response $response, $args) {
        $termOfYearId = $args['termId'];
        $disbursement = $this->disbursementService->getDisbursementsByTermOfYearId($termOfYearId);
        $response->getBody()->write(json_encode($disbursement));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchDisbursementsByTeacherIDAndTermID(Request $request, Response $response, $args) {
        $teacherId = $args['teacherId'];
        $termOfYearId = $args['termId'];
        $disbursement = $this->disbursementService->getDisbursementsByTeacherIdAndTermOfYearId($teacherId, $termOfYearId);
        $response->getBody()->write(json_encode($disbursement));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchListTeacherStatusByTermID(Request $request, Response $response, $args) {
        $termOfYearId = $args['termId'];
        $disbursement = $this->disbursementService->getListTeacherStatusByTermID($termOfYearId);
        $response->getBody()->write(json_encode($disbursement));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function fetchDisbursementsByTeacherID(Request $request, Response $response, $args) {
        $teacherId = $args['teacherId'];
        $disbursement = $this->disbursementService->getDisbursementsByTeacherId($teacherId);
        $response->getBody()->write(json_encode($disbursement));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function update(Request $request, Response $response, $args) {
        $disbursementId = $args['id'];
        $data = $request->getParsedBody();
        $disbursement = $this->disbursementService->updateDisbursement($disbursementId, $data);
        $response->getBody()->write(json_encode($disbursement));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function delete(Request $request, Response $response, $args) {
        $disbursementId = $args['id'];
        $this->disbursementService->deleteDisbursement($disbursementId);
        return $response->withStatus(204);
    }
}
