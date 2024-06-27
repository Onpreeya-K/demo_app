<?php

namespace App\Services;

use App\Repositories\SubjectRepository;

class SubjectService
{
    protected $majorRepository;

    public function __construct(SubjectRepository $majorRepository)
    {
        $this->majorRepository = $majorRepository;
    }

    public function getAllSubjects()
    {
        return $this->majorRepository->getAllSubjects();
    }

    public function getSubjectById($id)
    {
        return $this->majorRepository->getSubjectById($id);
    }

    public function createSubject($data)
    {
        return $this->majorRepository->createSubject($data);
    }

    public function updateSubject($id, $data)
    {
        // $data->
        return $this->majorRepository->updateSubject($id, $data);
    }

    public function deleteSubject($id)
    {
        return $this->majorRepository->deleteSubject($id);
    }
}
