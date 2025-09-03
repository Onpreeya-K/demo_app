<?php

namespace App\Modules\ScheduleTeach;

use App\Modules\ScheduleTeach\Model\ScheduleTeach;
use App\Modules\Disbursement\Model\DisbursementTeach;

class ScheduleTeachRepository
{
    public function getAllScheduleTeachs()
    {
        return ScheduleTeach::get();
    }

    public function getScheduleTeachByTermIdAndTeacherID($termID, $teacherID)
    {
        return ScheduleTeach::with(['teacher', 'subject.courseOfStudy.criteriaOfTeach', 'level', 'termOfYear'])
                            ->where('teacher_id', $teacherID)
                            ->where('term_of_year_id', $termID)
                            ->get();
    }
    
    public function getTeacherSchedule($termOfYearId){
        return ScheduleTeach::where('term_of_year_id', $termOfYearId)->get();
    }


    public function createScheduleTeach($data)
    {
        return ScheduleTeach::create($data);
    }

    public function updateScheduleTeach($id, $data)
    {
        return ScheduleTeach::where('schedule_teach_id', $id)->update($data);
    }

    public function deleteScheduleTeach($id)
    {
        return ScheduleTeach::where('schedule_teach_id', $id)->delete();
    }

    public function scheduleTeachIdByTermAndTeacherIdExistInDisbursementTeach($termID, $teacherID){
        $scheduleTeachId = ScheduleTeach::where('teacher_id', $teacherID)
                            ->where('term_of_year_id', $termID)
                            ->pluck('schedule_teach_id');
        
        
        $count = DisbursementTeach::whereIn('schedule_teach_id', $scheduleTeachId)->count();
        return $count;
    }

    public function deleteByTermIdAndTeacherId($termID, $teacherID)
    {
        return ScheduleTeach::where('teacher_id', $teacherID)
                            ->where('term_of_year_id', $termID)
                            ->delete();
    }
}
