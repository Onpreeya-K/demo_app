<?php

namespace App\Modules\CriteriaOfTeach;

class CriteriaOfTeachService
{
    protected $criteriaOfTeachRepository;

    public function __construct(CriteriaOfTeachRepository $criteriaOfTeachRepository)
    {
        $this->criteriaOfTeachRepository = $criteriaOfTeachRepository;
    }

    public function getAllCriteriaOfTeachs()
    {
        return $this->criteriaOfTeachRepository->getAllCriteriaOfTeachs();
    }

    public function getCriteriaOfTeachById($id)
    {
        return $this->criteriaOfTeachRepository->getCriteriaOfTeachById($id);
    }

    public function getCriteriaOfTeachByLevelId()
    {
        $levelData = array("bachelor" => array(1,2) , "master" => array(5,8), "doctor" => array(6,9), "master_inter" => array(51,81), "doctor_inter" => array(61,91));
        $result = array();
        foreach ($levelData as $key => $value) {
            $result[$key] = $this->criteriaOfTeachRepository->getAllCriteriaOfTeachsByLevelId($value);
        }
        return $result;
    }

    public function createCriteriaOfTeach($data)
    {
        return $this->criteriaOfTeachRepository->createCriteriaOfTeach($data);
    }

    public function updateCriteriaOfTeach($id, $data)
    {
        // $data->
        return $this->criteriaOfTeachRepository->updateCriteriaOfTeach($id, $data);
    }

    public function deleteCriteriaOfTeach($id)
    {
        return $this->criteriaOfTeachRepository->deleteCriteriaOfTeach($id);
    }
}
