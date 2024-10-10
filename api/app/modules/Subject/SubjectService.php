<?php

namespace App\Modules\Subject;

use Exception;
use App\Constant\ErrorMessage;

class SubjectService
{
    protected $majorRepository;

    public function __construct(SubjectRepository $majorRepository)
    {
        $this->majorRepository = $majorRepository;
    }

    public function getAllSubjects()
    {
        $subjects =  $this->majorRepository->getAllSubjects();

        if ($subjects->isEmpty()) {
            throw new Exception(ErrorMessage::SUBJECTS_NOT_FOUND, 404);
        }

        return $subjects;
    }

    public function getSubjectById($id)
    {
        $subject = $this->majorRepository->getSubjectById($id);

        if (!$subject) {
            throw new Exception(ErrorMessage::SUBJECTS_NOT_FOUND, 404);
        }

        return $subject;
    }

    public function createSubject($data)
    {
        $created =  $this->majorRepository->createSubject($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_SUBJECTS_ERROR, 400);
        }

        return ["message" => ErrorMessage::CREATE_SUBJECTS_SUCCESS];
    }

    public function updateSubject($id, $data)
    {
        $updated = $this->majorRepository->updateSubject($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_SUBJECTS_ERROR, 400);
        }

        return ["message" => ErrorMessage::UPDATE_SUBJECTS_SUCCESS];
    }

    public function deleteSubject($id)
    {
        $deleted = $this->majorRepository->deleteSubject($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_SUBJECTS_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_SUBJECTS_SUCCESS];
    }
}
