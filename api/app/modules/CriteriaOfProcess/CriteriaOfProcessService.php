<?php

namespace App\Modules\CriteriaOfProcess;

class CriteriaOfProcessService
{
    protected $criteriaOfTeachRepository;

    public function __construct(CriteriaOfProcessRepository $criteriaOfTeachRepository)
    {
        $this->criteriaOfTeachRepository = $criteriaOfTeachRepository;
    }

    public function getAllCriteriaOfProcesss()
    {
        return $this->criteriaOfTeachRepository->getAllCriteriaOfProcesss();
    }

    public function getCriteriaOfProcessById($id)
    {
        return $this->criteriaOfTeachRepository->getCriteriaOfProcessById($id);
    }

    public function getCriteriaOfProcessByLevelId()
    {
        $levelData = array("bachelor" => [1,2] , "master" => array(5,8), "doctor" => array(6,9), "master_inter" => array(51,81), "doctor_inter" => array(61,91));
        $result = array();
        foreach ($levelData as $key => $value) {
            $result[$key] = $this->criteriaOfTeachRepository->getAllCriteriaOfProcesssByLevelId($value);
        }
        return $result;
    }

    public function createCriteriaOfProcess($data)
    {
        return $this->criteriaOfTeachRepository->createCriteriaOfProcess($data);
    }

    public function updateCriteriaOfProcess($id, $data)
    {
        // $data->
        return $this->criteriaOfTeachRepository->updateCriteriaOfProcess($id, $data);
    }

    public function deleteCriteriaOfProcess($id)
    {
        return $this->criteriaOfTeachRepository->deleteCriteriaOfProcess($id);
    }
}
