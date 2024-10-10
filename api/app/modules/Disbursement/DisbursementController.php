<?php

namespace App\Modules\Disbursement;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Utils\HelperResponse;

class DisbursementController
{
    private $disbursementService;

    public function __construct(DisbursementService $disbursementService)
    {
        $this->disbursementService = $disbursementService;
    }

    public function create(Request $request, Response $response)
    {
        try {
            $data = $request->getParsedBody();
            $disbursement = $this->disbursementService->createDisbursementWithTech($data);
            return HelperResponse::json($response, $disbursement, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetch(Request $request, Response $response, $args)
    {
        try {
            $disbursement = $this->disbursementService->getAllDisbursements();
            return HelperResponse::json($response, $disbursement);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchDisbursementsByID(Request $request, Response $response, $args)
    {
        try {
            $id = $args['id'];
            $disbursement = $this->disbursementService->getDisbursementsById($id);
            return HelperResponse::json($response, $disbursement);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchDisbursementsByTermID(Request $request, Response $response, $args)
    {
        try {
            $termOfYearId = $args['termId'];
            $disbursement = $this->disbursementService->getDisbursementsByTermOfYearId($termOfYearId);
            return HelperResponse::json($response, $disbursement);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchDisbursementsByTeacherIDAndTermID(Request $request, Response $response, $args)
    {
        try {
            $teacherId = $args['teacherId'];
            $termOfYearId = $args['termId'];
            $disbursement = $this->disbursementService->getDisbursementsByTeacherIdAndTermOfYearId($teacherId, $termOfYearId);

            return HelperResponse::json($response, $disbursement);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchListTeacherStatusByTermID(Request $request, Response $response, $args)
    {
        try {
            $termOfYearId = $args['termId'];
            $disbursement = $this->disbursementService->getListTeacherStatusByTermID($termOfYearId);
            return HelperResponse::json($response, $disbursement);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function fetchDisbursementsByTeacherID(Request $request, Response $response, $args)
    {
        try {
            $teacherId = $args['teacherId'];
            $disbursement = $this->disbursementService->getDisbursementsByTeacherId($teacherId);
            return HelperResponse::json($response, $disbursement);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function update(Request $request, Response $response, $args)
    {
        try {
            $disbursementId = $args['id'];
            $data = $request->getParsedBody();
            $disbursement = $this->disbursementService->updateDisbursement($disbursementId, $data);

            return HelperResponse::json($response, $disbursement, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function updateStatus(Request $request, Response $response, $args)
    {
        try {
            $disbursementId = $args['disbursementId'];
            $data = $request->getParsedBody();
            if ($data['status'] == "reject") {
                $resp = $this->disbursementService->updateRejectDisbursement($disbursementId, $data);
            } else {
                $resp = $this->disbursementService->updateAcceptDisbursement($disbursementId, $data);
            }
            return HelperResponse::json($response, $resp, 201);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function getPdfFile(Request $request, Response $response, $args)
    {
        try {

            $data = $request->getParsedBody();
            $resp = $this->disbursementService->generatePdf($data);
            return HelperResponse::json($response, $resp);
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }

    public function delete(Request $request, Response $response, $args)
    {
        try {
            $disbursementId = $args['id'];
            $data = $this->disbursementService->deleteDisbursement($disbursementId);
            return HelperResponse::json($response, $data, 201);
            
        } catch (\Exception $e) {
            return HelperResponse::jsonWithException($response, $e);
        }
    }
}
