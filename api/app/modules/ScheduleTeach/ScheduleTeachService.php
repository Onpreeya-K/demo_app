<?php

namespace App\Modules\ScheduleTeach;

use App\Modules\Subject\SubjectService;
use App\Modules\Teacher\TeacherService;

use function DI\get;

class ScheduleTeachService
{
    protected $scheduleTeachRepository;
    protected $teacherService;
    protected $subjectService;


    public function __construct(ScheduleTeachRepository $scheduleTeachRepository, TeacherService $teacherService, SubjectService $subjectService)
    {
        $this->scheduleTeachRepository = $scheduleTeachRepository;
        $this->teacherService = $teacherService;
        $this->subjectService = $subjectService;
    }

    public function getAllScheduleTeachs()
    {
        return $this->scheduleTeachRepository->getAllScheduleTeachs();
    }

    public function getScheduleTeachByTermIdAndTeacherID($termID, $teacherID)
    {
        $data = $this->scheduleTeachRepository->getScheduleTeachByTermIdAndTeacherID($termID, $teacherID);
        $newData = [];
        foreach ($data->toArray() as $value) {
            if ($value['subject'] && $value['subject']['course_of_study']) {
                $level_id = $value['level_id'];

                $criteria_of_teach = $value['subject']['course_of_study']['criteria_of_teach'];



                $filtered_criteria_of_teach = array_filter($criteria_of_teach, function ($item) use ($level_id) {
                    return $item['level_id'] == $level_id;
                });

                $value['criteria_of_teach'] = $filtered_criteria_of_teach[0];

                unset($value['subject']['course_of_study']['criteria_of_teach']);

                $course_of_study = $value['subject']['course_of_study'];
                $value['course_of_study'] = $course_of_study;
                unset($value['subject']['course_of_study']);

                $newData[] = $value;
            }
            else {
                $newData[] = $value;
            }
            
        }

        return $newData;
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
            $checkSubject = $this->subjectService->getSubjectById($value['course_code']);//
            if($checkSubject == null){
                $spiltUnit = explode(" ", $value['course_unit']);
                $subject = array(
                    'subject_id' => $value['course_code'],
                    'name' => $value['course_name'],
                    'unit' => $spiltUnit[0],
                    'type' => $spiltUnit[1],
                    'is_internal' => 0
                );
                $this->subjectService->createSubject($subject);
            }
            $value['teacher_id'] = $teacherID;
            $value['subject_id'] = $value['course_code'];
            $value['term_of_year_id'] = $termID;

            $this->scheduleTeachRepository->createScheduleTeach($value);
        }

        return null;
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
