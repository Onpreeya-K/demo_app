<?php

namespace App\Services;

use App\Repositories\ScheduleTeachRepository;
use App\Services\TeacherService;

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

    public function getScheduleTeachById($id)
    {
        return $this->scheduleTeachRepository->getScheduleTeachById($id);
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
        return $this->scheduleTeachRepository->createScheduleTeach($data);
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
