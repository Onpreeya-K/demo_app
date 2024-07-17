<?php

namespace App\Modules\TermOfYear;

class TermOfYearService
{
    protected $degreeRepository;

    public function __construct(TermOfYearRepository $degreeRepository)
    {
        $this->degreeRepository = $degreeRepository;
    }

    public function getAllTermOfYears()
    {
        return $this->degreeRepository->getAllTermOfYears();
    }

    public function getTermOfYearById($id)
    {
        return $this->degreeRepository->getTermOfYearById($id);
    }

    public function createTermOfYear($data)
    {
        return $this->degreeRepository->createTermOfYear($data);
    }

    public function updateTermOfYear($id, $data)
    {
        return $this->degreeRepository->updateTermOfYear($id, $data);
    }

    public function deleteTermOfYear($id)
    {
        return $this->degreeRepository->deleteTermOfYear($id);
    }
}
