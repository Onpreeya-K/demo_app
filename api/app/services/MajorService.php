<?php

namespace App\Services;

use App\Repositories\MajorRepository;

class MajorService
{
    protected $majorRepository;

    public function __construct(MajorRepository $majorRepository)
    {
        $this->majorRepository = $majorRepository;
    }

    public function getAllMajors()
    {
        return $this->majorRepository->getAllMajors();
    }

    public function getMajorById($id)
    {
        return $this->majorRepository->getMajorById($id);
    }

    public function createMajor($data)
    {
        return $this->majorRepository->createMajor($data);
    }

    public function updateMajor($id, $data)
    {
        // $data->
        return $this->majorRepository->updateMajor($id, $data);
    }

    public function deleteMajor($id)
    {
        return $this->majorRepository->deleteMajor($id);
    }
}
