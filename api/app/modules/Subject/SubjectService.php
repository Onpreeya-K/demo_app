<?php

namespace App\Modules\Subject;

use Exception;
use App\Constant\ErrorMessage;

class SubjectService
{
    protected $subjectRepository;

    public function __construct(SubjectRepository $majorRepository)
    {
        $this->subjectRepository = $majorRepository;
    }

    public function getAllSubjects()
    {
        $subjects =  $this->subjectRepository->getAllSubjects();

        if ($subjects->isEmpty()) {
            throw new Exception(ErrorMessage::SUBJECTS_NOT_FOUND, 404);
        }

        return $subjects;
    }

    public function getSubjectById($id)
    {
        $subject = $this->subjectRepository->getSubjectById($id);

        if (!$subject) {
            throw new Exception(ErrorMessage::SUBJECTS_NOT_FOUND, 404);
        }

        return $subject;
    }
    public function getSubjectIsExist($id)
    {
        $subject = $this->subjectRepository->getSubjectById($id);

        if (!$subject) {
            return null;
        }

        return $subject;
    }

    public function createSubject($data)
    {
        $subject = $this->subjectRepository->getSubjectById($data['subject_id']);
        if ($subject) {
                throw new Exception(ErrorMessage::SUBJECTS_EXIST, 400);
        }
        
        $created =  $this->subjectRepository->createSubject($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_SUBJECTS_ERROR, 400);
        }

        return ["message" => ErrorMessage::CREATE_SUBJECTS_SUCCESS];
    }

    public function updateSubject($id, $data)
    {
        $updated = $this->subjectRepository->updateSubject($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_SUBJECTS_ERROR, 400);
        }

        return ["message" => ErrorMessage::UPDATE_SUBJECTS_SUCCESS];
    }

    public function deleteSubject($id)
    {
        $deleted = $this->subjectRepository->deleteSubject($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_SUBJECTS_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_SUBJECTS_SUCCESS];
    }
}
