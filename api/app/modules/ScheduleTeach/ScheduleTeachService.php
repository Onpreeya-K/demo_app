<?php

namespace App\Modules\ScheduleTeach;

use App\Modules\Teacher\TeacherService;


class ScheduleTeachService
{
    protected $scheduleTeachRepository;
    protected $teacherService;

    public function __construct(ScheduleTeachRepository $scheduleTeachRepository, TeacherService $teacherService)
    {
        $this->scheduleTeachRepository = $scheduleTeachRepository;
        $this->teacherService = $teacherService;
    }

    public function getAllScheduleTeachs()
    {
        return $this->scheduleTeachRepository->getAllScheduleTeachs();
    }

    public function getScheduleTeachByTermIdAndTeacherID($termID, $teacherID)
    {
        $data = $this->scheduleTeachRepository->getScheduleTeachByTermIdAndTeacherID($termID, $teacherID);
        foreach ($data as $value) {
            $value->course_name = $value->subject->name;
            $value->course_unit = $value->subject->unit.' '.$value->subject->type;
        }

        data_forget($data, '*.subject');
        return $data;
    }

    public function getTeacherScheduleByTermOfYearId($termOfYearId){
        $scheduleTeach = $this->scheduleTeachRepository->getTeacherSchedule($termOfYearId)->toArray();
        $teacherList = $this->teacherService->getAllTeachers();
        $thecherID = array_column($scheduleTeach, "teacher_id");
        $result = [];

        foreach ($teacherList as $teacher) {
            $teacher['has_schedule'] = in_array($teacher['teacher_id'], $thecherID);
            array_push($result, $teacher);
        }
        return  $result;
    }

    public function createScheduleTeach($data)
    {
        $teacherID = $data['teacher_id'];
        $termID = $data['term_of_year_id'];
        $scheduleList = $data['data'];

        foreach ($scheduleList as $value) {
            $value['teacher_id'] = $teacherID;
            $value['subject_id'] = explode("-",$value['course_code'])[0];
            $value['term_of_year_id'] = $termID;

            $this->scheduleTeachRepository->createScheduleTeach($value);
        }

        return null;
        // $this->scheduleTeachRepository->createScheduleTeach($data);
    }

    public function updateScheduleTeach($id, $data)
    {
        // $data->
        return $this->scheduleTeachRepository->updateScheduleTeach($id, $data);
    }

    public function deleteScheduleTeach($id)
    {
        return $this->scheduleTeachRepository->deleteScheduleTeach($id);
    }
}
