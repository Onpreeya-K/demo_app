<?php

namespace App\Modules\AcademicPosition;


use Exception;
use App\Constant\ErrorMessage;
class AcademicPositionService
{
    protected $academicPositionRepository;

    public function __construct(AcademicPositionRepository $academicPositionRepository)
    {
        $this->academicPositionRepository = $academicPositionRepository;
    }

    public function createAcademicPosition($data)
    {
        $position = $this->academicPositionRepository->createAcademicPosition($data);
        if (!$position) {
            throw new Exception(ErrorMessage::CREATE_ACADEMIC_ERROR, 400);
        }
        return ["message" => ErrorMessage::CREATE_ACADEMIC_SUCCESS];
    }

    public function getAllAcademicPositions()
    {
        $positions = $this->academicPositionRepository->getAllAcademicPositions();
        if (!$positions) {
            throw new Exception(ErrorMessage::ACADEMIC_NOT_FOUND, 404);
        }
        return $positions;
    }

    public function getAcademicPositionById($id)
    {
        $position = $this->academicPositionRepository->getAcademicPositionById($id);
        if (!$position) {
            throw new Exception(ErrorMessage::ACADEMIC_NOT_FOUND, 404);
        }
        return $position;
    }

   

    public function updateAcademicPosition($id, $data)
    {
        $updated = $this->academicPositionRepository->updateAcademicPosition($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_ACADEMIC_ERROR, 400);
        }
        return ["message" => ErrorMessage::UPDATE_ACADEMIC_SUCCESS];
    }

    public function deleteAcademicPosition($id)
    {
        $deleted = $this->academicPositionRepository->deleteAcademicPosition($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_ACADEMIC_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_ACADEMIC_SUCESS];
    }
}
