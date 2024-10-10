<?php

namespace App\Modules\Level;

use Exception;
use App\Constant\ErrorMessage;
class LevelService
{
    protected $degreeRepository;

    public function __construct(LevelRepository $degreeRepository)
    {
        $this->degreeRepository = $degreeRepository;
    }

    public function getAllLevels()
    {
        $fetchAll = $this->degreeRepository->getAllLevels();
        if (!$fetchAll) {
            throw new Exception(ErrorMessage::LEVEL_NOT_FOUND, 404);
        }
        return $fetchAll;
    }

    public function getLevelById($id)
    {
        $fetch = $this->degreeRepository->getLevelById($id);
        if (!$fetch) {
            throw new Exception(ErrorMessage::LEVEL_NOT_FOUND,404);
        }
        return $fetch;
    }

    public function createLevel($data)
    {
        $created = $this->degreeRepository->createLevel($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_LEVEL_ERROR, 400);
        }
        return ["message" => ErrorMessage::CREATE_LEVEL_SUCCESS];
    }

    public function updateLevel($id, $data)
    {
        $updated = $this->degreeRepository->updateLevel($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_LEVEL_ERROR, 400);
        }
        return ["message" => ErrorMessage::UPDATE_LEVEL_SUCCESS];
    }

    public function deleteLevel($id)
    {
        $deleted = $this->degreeRepository->deleteLevel($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_LEVEL_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_LEVEL_SUCCESS];
    }
}
