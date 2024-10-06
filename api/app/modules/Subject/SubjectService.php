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
            throw new Exception(ErrorMessage::NO_SUBJECTS_FOUND, 404);
        }

        return $subjects;
    }

    public function getSubjectById($id)
    {
        $subject = $this->majorRepository->getSubjectById($id);

        if (!$subject) {
            throw new Exception(ErrorMessage::SUBJECT_NOT_FOUND, 404);
        }

        return $subject;
    }

    public function createSubject($data)
    {
        $created =  $this->majorRepository->createSubject($data);
        if (!$created) {
            throw new Exception(ErrorMessage::SUBJECT_CREATION_FAILED, 400);
        }

        return $created;

        
    }

    public function updateSubject($id, $data)
    {
        $updated = $this->majorRepository->updateSubject($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::SUBJECT_UPDATE_FAILED, 400);
        }

        return $updated;
    }

    public function deleteSubject($id)
    {
        $deleted = $this->majorRepository->deleteSubject($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::SUBJECT_DELETION_FAILED, 400);
        }
        return $deleted;
    }
}
