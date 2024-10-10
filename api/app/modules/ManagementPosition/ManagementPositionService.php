<?php

namespace App\Modules\ManagementPosition;

use Exception;
use App\Constant\ErrorMessage;
class ManagementPositionService
{
    protected $managementPositionRepository;

    public function __construct(ManagementPositionRepository $managementPositionRepository)
    {
        $this->managementPositionRepository = $managementPositionRepository;
    }

    public function getAllManagementPositions()
    {
        $fetchAll = $this->managementPositionRepository->getAllManagementPositions();
        if (!$fetchAll) {
            throw new Exception(ErrorMessage::MANAGEMENT_POSITION_NOT_FOUND, 404);
        }
        return $fetchAll;
    }

    public function getManagementPositionById($id)
    {
        $fetch = $this->managementPositionRepository->getManagementPositionById($id);
        if (!$fetch) {
            throw new Exception(ErrorMessage::MANAGEMENT_POSITION_NOT_FOUND, 404);
        }
        return $fetch;
    }

    public function createManagementPosition($data)
    {
        $created = $this->managementPositionRepository->createManagementPosition($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_MANAGEMENT_POSITION_ERROR, 400);
        }
        return ["message" => ErrorMessage::CREATE_MANAGEMENT_POSITION_SUCCESS];
    }

    public function updateManagementPosition($id, $data)
    {
        $updated = $this->managementPositionRepository->updateManagementPosition($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_MANAGEMENT_POSITION_ERROR, 400);
        }
        return ["message" => ErrorMessage::UPDATE_MANAGEMENT_POSITION_SUCCESS];
    }

    public function deleteManagementPosition($id)
    {
        $deleted = $this->managementPositionRepository->deleteManagementPosition($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_MANAGEMENT_POSITION_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_MANAGEMENT_POSITION_SUCCESS];
    }
}
