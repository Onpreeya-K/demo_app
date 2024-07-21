<?php

namespace App\Modules\AcademicPosition;

class AcademicPositionService
{
    protected $academicPositionRepository;

    public function __construct(AcademicPositionRepository $academicPositionRepository)
    {
        $this->academicPositionRepository = $academicPositionRepository;
    }

    public function getAllAcademicPositions()
    {
        return $this->academicPositionRepository->getAllAcademicPositions();
    }

    public function getAcademicPositionById($id)
    {
        return $this->academicPositionRepository->getAcademicPositionById($id);
    }

    public function createAcademicPosition($data)
    {
        return $this->academicPositionRepository->createAcademicPosition($data);
    }

    public function updateAcademicPosition($id, $data)
    {
        // $data->
        return $this->academicPositionRepository->updateAcademicPosition($id, $data);
    }

    public function deleteAcademicPosition($id)
    {
        return $this->academicPositionRepository->deleteAcademicPosition($id);
    }
}
