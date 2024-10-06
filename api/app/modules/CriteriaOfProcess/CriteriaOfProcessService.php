<?php

namespace App\Modules\CriteriaOfProcess;

use Exception;
use App\Constant\ErrorMessage;
class CriteriaOfProcessService
{
    protected $criteriaOfProcessRepository;

    public function __construct(CriteriaOfProcessRepository $criteriaOfProcessRepository)
    {
        $this->criteriaOfProcessRepository = $criteriaOfProcessRepository;
    }

    public function createCriteriaOfProcess($data)
    {
        $created =  $this->criteriaOfProcessRepository->createCriteriaOfProcess($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_CRITERIA_OF_PROCESS_ERROR, 500);
        }
        return ["message" => ErrorMessage::CREATE_CRITERIA_OF_PROCESS_SUCCESS];
    }

    public function getAllCriteriaOfProcesss()
    {
        $fetchAll = $this->criteriaOfProcessRepository->getAllCriteriaOfProcesss();
        if (!$fetchAll) {
            throw new Exception(ErrorMessage::CRITERIA_OF_PROCESS_NOT_FOUND, 404);
        }
        return $fetchAll;
    }

    public function getCriteriaOfProcessById($id)
    {
        $criteriaOfProcess = $this->criteriaOfProcessRepository->getCriteriaOfProcessById($id);
        if (!$criteriaOfProcess) {
            throw new Exception(ErrorMessage::CRITERIA_OF_PROCESS_NOT_FOUND, 404);
        }
        return $criteriaOfProcess;
    }

    public function updateCriteriaOfProcess($id, $data)
    {
        $updated =  $this->criteriaOfProcessRepository->updateCriteriaOfProcess($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_CRITERIA_OF_PROCESS_ERROR, 500);
        }
        return ["message" => ErrorMessage::UPDATE_CRITERIA_OF_PROCESS_SUCCESS];
    }

    public function deleteCriteriaOfProcess($id)
    {
        $deleted = $this->criteriaOfProcessRepository->deleteCriteriaOfProcess($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_CRITERIA_OF_PROCESS_ERROR, 500);
        }
        return ["message" => ErrorMessage::DELETE_CRITERIA_OF_PROCESS_SUCCESS];
    }
}
