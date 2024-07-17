<?php

namespace App\Modules\CourseOfStudy;

use App\Modules\CourseOfStudy\Model\CourseOfStudy;

class CourseOfStudyRepository
{
    public function getAllCourseOfStudys()
    {
        return CourseOfStudy::get();
    }

    public function getCourseOfStudyById($id)
    {
        return CourseOfStudy::find($id);
    }

    public function createCourseOfStudy($data)
    {
        return CourseOfStudy::create($data);
    }

    public function updateCourseOfStudy($id, $data)
    {
        return CourseOfStudy::where('course_of_study_id', $id)->update($data);
    }

    public function deleteCourseOfStudy($id)
    {
        return CourseOfStudy::where('course_of_study_id', $id)->delete();
    }
}
