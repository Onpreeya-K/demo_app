<?php

namespace App\Modules\Level;

class LevelService
{
    protected $degreeRepository;

    public function __construct(LevelRepository $degreeRepository)
    {
        $this->degreeRepository = $degreeRepository;
    }

    public function getAllLevels()
    {
        return $this->degreeRepository->getAllLevels();
    }

    public function getLevelById($id)
    {
        return $this->degreeRepository->getLevelById($id);
    }

    public function createLevel($data)
    {
        return $this->degreeRepository->createLevel($data);
    }

    public function updateLevel($id, $data)
    {
        return $this->degreeRepository->updateLevel($id, $data);
    }

    public function deleteLevel($id)
    {
        return $this->degreeRepository->deleteLevel($id);
    }
}
