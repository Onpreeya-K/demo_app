<?php

namespace App\Modules\CriteriaOfTeach;

use Exception;
use App\Constant\ErrorMessage;

class CriteriaOfTeachService
{
    protected $criteriaOfTeachRepository;

    public function __construct(CriteriaOfTeachRepository $criteriaOfTeachRepository)
    {
        $this->criteriaOfTeachRepository = $criteriaOfTeachRepository;
    }

    public function createCriteriaOfTeach($data)
    {
        $created =  $this->criteriaOfTeachRepository->createCriteriaOfTeach($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_CRITERIA_OF_TEACH_ERROR, 500);
        }
        return ["message" => ErrorMessage::CREATE_CRITERIA_OF_TEACH_SUCCESS];
    }

    public function getAllCriteriaOfTeachs()
    {
        $fetchAll = $this->criteriaOfTeachRepository->getAllCriteriaOfTeachs();
        if (!$fetchAll) {
            throw new Exception(ErrorMessage::CRITERIA_OF_TEACH_NOT_FOUND, 404);
        }
        return $fetchAll;
    }

    public function getCriteriaOfTeachById($id)
    {
        $fetch = $this->criteriaOfTeachRepository->getCriteriaOfTeachById($id);
        if (!$fetch) {
            throw new Exception(ErrorMessage::CRITERIA_OF_TEACH_NOT_FOUND, 404);
        }
        return $fetch;
    }

    public function getCriteriaOfTeachByLevelId()
    {
        $levelData = ["bachelor" => [1,2], "master" => [5,8], "doctor" => [6,9], "master_inter" => [51,81], "doctor_inter" => [61,91]];
        $result = [];
        foreach ($levelData as $key => $value) {
            $result[$key] = $this->criteriaOfTeachRepository->getAllCriteriaOfTeachsByLevelId($value);
            if (!$result[$key]) {
                throw new Exception(ErrorMessage::CRITERIA_OF_TEACH_NOT_FOUND, 404);
            }
        }
        return $result;
    }

    public function updateCriteriaOfTeach($id, $data)
    {
        $updated = $this->criteriaOfTeachRepository->updateCriteriaOfTeach($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_CRITERIA_OF_TEACH_ERROR, 500);
        }
        return ["message" => ErrorMessage::UPDATE_CRITERIA_OF_TEACH_SUCCESS];
    }

    public function deleteCriteriaOfTeach($id)
    {
        $deleted =  $this->criteriaOfTeachRepository->deleteCriteriaOfTeach($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_CRITERIA_OF_TEACH_ERROR, 500);
        }
        return ["message" => ErrorMessage::DELETE_CRITERIA_OF_TEACH_SUCCESS];
    }
}
