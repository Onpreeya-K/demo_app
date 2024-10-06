<?php

namespace App\Modules\Degree;

use Exception;
use App\Constant\ErrorMessage;

class DegreeService
{
    protected $degreeRepository;

    public function __construct(DegreeRepository $degreeRepository)
    {
        $this->degreeRepository = $degreeRepository;
    }

    public function getAllDegrees()
    {
        $fetchAll = $this->degreeRepository->getAllDegrees();
        if (!$fetchAll) {
            throw new Exception(ErrorMessage::DEGREE_NOT_FOUND, 404);
        }
        return $fetchAll;
    }

    public function getDegreeById($id)
    {
        $fetch = $this->degreeRepository->getDegreeById($id);
        if (!$fetch) {
            throw new Exception(ErrorMessage::DEGREE_NOT_FOUND, 404);
        }
        return $fetch;
    }

    public function createDegree($data)
    {
        $created = $this->degreeRepository->createDegree($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_DEGREE_ERROR, 400);
        }
        return ["message" => ErrorMessage::CREATE_DEGREE_SUCCESS];
    }

    public function updateDegree($id, $data)
    {
        $updated = $this->degreeRepository->updateDegree($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_DEGREE_ERROR, 400);
        }
        return ["message" => ErrorMessage::UPDATE_DEGREE_SUCCESS];
    }

    public function deleteDegree($id)
    {
        $deleted = $this->degreeRepository->deleteDegree($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_DEGREE_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_DEGREE_SUCCESS];
    }
}
