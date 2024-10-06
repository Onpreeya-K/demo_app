<?php

namespace App\Modules\CourseOfStudy;

use Exception;
use App\Constant\ErrorMessage;

class CourseOfStudyService
{
    protected $courseOfStudyRepository;

    public function __construct(CourseOfStudyRepository $courseOfStudyRepository)
    {
        $this->courseOfStudyRepository = $courseOfStudyRepository;
    }

    public function createCourseOfStudy($data)
    {
        $created = $this->courseOfStudyRepository->createCourseOfStudy($data);
        if (!$created) {
            throw new Exception(ErrorMessage::CREATE_COURSE_OF_STUDY_ERROR, 500);
        }
        return ["message" => ErrorMessage::CREATE_COURSE_OF_STUDY_SUCCESS];
    }

    public function getAllCourseOfStudys()
    {
        $fetched =  $this->courseOfStudyRepository->getAllCourseOfStudys();
        if (!$fetched) {
            throw new Exception(ErrorMessage::COURSE_OF_STUDY_NOT_FOUND, 404);
        }
        return $fetched;
    }

    public function getCourseOfStudyById($id)
    {
        $fetched =  $this->courseOfStudyRepository->getCourseOfStudyById($id);
        if (!$fetched) {
            throw new Exception(ErrorMessage::COURSE_OF_STUDY_NOT_FOUND, 404);
        }
        return $fetched;
    }

    

    public function updateCourseOfStudy($id, $data)
    {
        $updated = $this->courseOfStudyRepository->updateCourseOfStudy($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::UPDATE_COURSE_OF_STUDY_ERROR, 500);
        }
        return ["message" => ErrorMessage::UPDATE_COURSE_OF_STUDY_SUCCESS];
    }

    public function deleteCourseOfStudy($id)
    {
        $deleted = $this->courseOfStudyRepository->deleteCourseOfStudy($id);
        if (!$deleted) {
            throw new Exception(ErrorMessage::DELETE_COURSE_OF_STUDY_ERROR, 500);
        }
        return ["message" => ErrorMessage::DELETE_COURSE_OF_STUDY_SUCCESS];
    }
}
