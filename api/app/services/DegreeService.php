<?php

namespace App\Services;

use App\Repositories\DegreeRepository;

class DegreeService
{
    protected $degreeRepository;

    public function __construct(DegreeRepository $degreeRepository)
    {
        $this->degreeRepository = $degreeRepository;
    }

    public function getAllDegrees()
    {
        return $this->degreeRepository->getAllDegrees();
    }

    public function getDegreeById($id)
    {
        return $this->degreeRepository->getDegreeById($id);
    }

    public function createDegree($data)
    {
        return $this->degreeRepository->createDegree($data);
    }

    public function updateDegree($id, $data)
    {
        return $this->degreeRepository->updateDegree($id, $data);
    }

    public function deleteDegree($id)
    {
        return $this->degreeRepository->deleteDegree($id);
    }
}
