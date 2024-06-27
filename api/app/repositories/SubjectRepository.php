<?php

namespace App\Repositories;

use App\Models\Entities\Subject;

class SubjectRepository
{
    public function getAllSubjects()
    {
        return Subject::get();
    }

    public function getSubjectById($id)
    {
        return Subject::find($id);
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
