<?php

namespace App\Modules\Subject;
use App\Modules\Subject\Model\Subject;

class SubjectRepository
{
    public function getAllSubjects()
    {
        return Subject::with(['courseOfStudy'])
                        ->get();
    }

    public function getSubjectById($id)
    {
        return Subject::with(['courseOfStudy'])
                        ->find($id);
    }
    public function getSubjectIsInternal($id)
    {
        return Subject::with(['courseOfStudy'])
                ->whereNotNull('course_of_study_id')
                ->find($id);
    }

    public function createSubject($data)
    {
        return Subject::create($data);
    }

    public function updateSubject($id, $data)
    {
        return Subject::where('subject_id', $id)->update($data);
    }

    public function deleteSubject($id)
    {
        return Subject::where('subject_id', $id)->delete();
    }
}
