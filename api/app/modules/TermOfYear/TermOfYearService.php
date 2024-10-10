<?php

namespace App\Modules\TermOfYear;

use Exception;
use App\Constant\ErrorMessage;

class TermOfYearService
{
    protected $degreeRepository;

    public function __construct(TermOfYearRepository $degreeRepository)
    {
        $this->degreeRepository = $degreeRepository;
    }

    public function getAllTermOfYears()
    {
        $fetchAll = $this->degreeRepository->getAllTermOfYears();
        if (!$fetchAll) {
            throw new Exception(ErrorMessage::TERM_OF_YEAR_NOT_FOUND, 404);
        }
        return $fetchAll;
    }

    public function getTermOfYearById($id)
    {
        $fetch = $this->degreeRepository->getTermOfYearById($id);
        if (!$fetch) {
            throw new Exception(ErrorMessage::TERM_OF_YEAR_NOT_FOUND, 404);
        }
        return $fetch;
    }

    public function createTermOfYear($data)
    {
        $created = $this->degreeRepository->createTermOfYear($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_TERM_OF_YEAR_ERROR, 400);
        }
        return ["message" => ErrorMessage::CREATE_TERM_OF_YEAR_SUCCESS];
    }

    public function updateTermOfYear($id, $data)
    {
        $updated = $this->degreeRepository->updateTermOfYear($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_TERM_OF_YEAR_ERROR, 400);
        }
        return ["message" => ErrorMessage::UPDATE_TERM_OF_YEAR_SUCCESS];
    }

    public function deleteTermOfYear($id)
    {
        $deleted = $this->degreeRepository->deleteTermOfYear($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_TERM_OF_YEAR_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_TERM_OF_YEAR_SUCCESS];
    }
}
