<?php

namespace App\Modules\ManagementPosition;

class ManagementPositionService
{
    protected $criteriaOfTeachRepository;

    public function __construct(ManagementPositionRepository $criteriaOfTeachRepository)
    {
        $this->criteriaOfTeachRepository = $criteriaOfTeachRepository;
    }

    public function getAllManagementPositions()
    {
        return $this->criteriaOfTeachRepository->getAllManagementPositions();
    }

    public function getManagementPositionById($id)
    {
        return $this->criteriaOfTeachRepository->getManagementPositionById($id);
    }

    public function getManagementPositionByLevelId()
    {
        $levelData = array("bachelor" => array(1,2) , "master" => array(5,8), "doctor" => array(6,9), "master_inter" => array(51,81), "doctor_inter" => array(61,91));
        $result = array();
        foreach ($levelData as $key => $value) {
            $result[$key] = $this->criteriaOfTeachRepository->getAllManagementPositionsByLevelId($value);
        }
        return $result;
    }

    public function createManagementPosition($data)
    {
        return $this->criteriaOfTeachRepository->createManagementPosition($data);
    }

    public function updateManagementPosition($id, $data)
    {
        // $data->
        return $this->criteriaOfTeachRepository->updateManagementPosition($id, $data);
    }

    public function deleteManagementPosition($id)
    {
        return $this->criteriaOfTeachRepository->deleteManagementPosition($id);
    }
}
