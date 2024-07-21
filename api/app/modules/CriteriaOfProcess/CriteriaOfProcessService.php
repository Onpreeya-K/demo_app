<?php

namespace App\Modules\CriteriaOfProcess;

class CriteriaOfProcessService
{
    protected $criteriaOfProcessRepository;

    public function __construct(CriteriaOfProcessRepository $criteriaOfProcessRepository)
    {
        $this->criteriaOfProcessRepository = $criteriaOfProcessRepository;
    }

    public function getAllCriteriaOfProcesss()
    {
        return $this->criteriaOfProcessRepository->getAllCriteriaOfProcesss();
    }

    public function getCriteriaOfProcessById($id)
    {
        return $this->criteriaOfProcessRepository->getCriteriaOfProcessById($id);
    }

    public function createCriteriaOfProcess($data)
    {
        return $this->criteriaOfProcessRepository->createCriteriaOfProcess($data);
    }

    public function updateCriteriaOfProcess($id, $data)
    {
        // $data->
        return $this->criteriaOfProcessRepository->updateCriteriaOfProcess($id, $data);
    }

    public function deleteCriteriaOfProcess($id)
    {
        return $this->criteriaOfProcessRepository->deleteCriteriaOfProcess($id);
    }
}
