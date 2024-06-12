<?php

namespace App\Services;

use App\Repositories\CourseOfStudyRepository;

class CourseOfStudyService
{
    protected $courseOfStudyRepository;

    public function __construct(CourseOfStudyRepository $courseOfStudyRepository)
    {
        $this->courseOfStudyRepository = $courseOfStudyRepository;
    }

    public function getAllCourseOfStudys()
    {
        return $this->courseOfStudyRepository->getAllCourseOfStudys();
    }

    public function getCourseOfStudyById($id)
    {
        return $this->courseOfStudyRepository->getCourseOfStudyById($id);
    }

    public function createCourseOfStudy($data)
    {
        return $this->courseOfStudyRepository->createCourseOfStudy($data);
    }

    public function updateCourseOfStudy($id, $data)
    {
        // $data->
        return $this->courseOfStudyRepository->updateCourseOfStudy($id, $data);
    }

    public function deleteCourseOfStudy($id)
    {
        return $this->courseOfStudyRepository->deleteCourseOfStudy($id);
    }
}
