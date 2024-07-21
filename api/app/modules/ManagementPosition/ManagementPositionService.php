<?php

namespace App\Modules\ManagementPosition;

class ManagementPositionService
{
    protected $managementPositionRepository;

    public function __construct(ManagementPositionRepository $managementPositionRepository)
    {
        $this->managementPositionRepository = $managementPositionRepository;
    }

    public function getAllManagementPositions()
    {
        return $this->managementPositionRepository->getAllManagementPositions();
    }

    public function getManagementPositionById($id)
    {
        return $this->managementPositionRepository->getManagementPositionById($id);
    }

    public function createManagementPosition($data)
    {
        return $this->managementPositionRepository->createManagementPosition($data);
    }

    public function updateManagementPosition($id, $data)
    {
        // $data->
        return $this->managementPositionRepository->updateManagementPosition($id, $data);
    }

    public function deleteManagementPosition($id)
    {
        return $this->managementPositionRepository->deleteManagementPosition($id);
    }
}
