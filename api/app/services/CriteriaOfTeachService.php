<?php

namespace App\Services;

use App\Repositories\CriteriaOfTeachRepository;

class CriteriaOfTeachService
{
    protected $majorRepository;

    public function __construct(CriteriaOfTeachRepository $majorRepository)
    {
        $this->majorRepository = $majorRepository;
    }

    public function getAllCriteriaOfTeachs()
    {
        return $this->majorRepository->getAllCriteriaOfTeachs();
    }

    public function getCriteriaOfTeachById($id)
    {
        return $this->majorRepository->getCriteriaOfTeachById($id);
    }

    public function createCriteriaOfTeach($data)
    {
        return $this->majorRepository->createCriteriaOfTeach($data);
    }

    public function updateCriteriaOfTeach($id, $data)
    {
        // $data->
        return $this->majorRepository->updateCriteriaOfTeach($id, $data);
    }

    public function deleteCriteriaOfTeach($id)
    {
        return $this->majorRepository->deleteCriteriaOfTeach($id);
    }
}
