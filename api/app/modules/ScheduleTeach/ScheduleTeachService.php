<?php

namespace App\Modules\ScheduleTeach;

use App\Modules\Subject\SubjectService;
use App\Modules\Teacher\TeacherService;

use App\Constant\ErrorMessage;
use Exception;
use Illuminate\Database\Capsule\Manager as DB;

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

    public function createScheduleTeach($data)
    {
        try {
            $teacherID = $data['teacher_id'];
            $termID = $data['term_of_year_id'];
            $scheduleList = $data['data'];

            DB::transaction(function () use ($scheduleList, $teacherID, $termID) {
                foreach ($scheduleList as $value) {
                    $checkSubject = $this->subjectService->getSubjectById($value['course_code']);
                    if ($checkSubject == null) {
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
            });

            return ["message" => ErrorMessage::CREATE_SCHEDULE_TEACH_SUCCESS];
        } catch (Exception $e) {
            throw new Exception(ErrorMessage::CREATE_SCHEDULE_TEACH_ERROR, 400);
        }
    }

    public function getAllScheduleTeachs()
    {
        $scheduleTeachs = $this->scheduleTeachRepository->getAllScheduleTeachs();
        if (!$scheduleTeachs) {
            throw new Exception(ErrorMessage::SCHEDULE_TEACH_NOT_FOUND, 404);
        }
        return $scheduleTeachs;
    }

    public function getScheduleTeachByTermIdAndTeacherID($termID, $teacherID)
    {
        try {
            $data = $this->scheduleTeachRepository->getScheduleTeachByTermIdAndTeacherID($termID, $teacherID);

            $newData = [];

            foreach ($data->toArray() as $value) {
                if ($value['subject'] && $value['subject']['course_of_study']) {
                    $level_id = $value['level_id'];

                    $criteria_of_teach = $value['subject']['course_of_study']['criteria_of_teach'];

                    $filtered_criteria_of_teach = array_values(array_filter($criteria_of_teach, function ($item) use ($level_id) {
                        return $item['level_id'] == $level_id;
                    }));

                    if (!empty($filtered_criteria_of_teach)) {
                        $value['criteria_of_teach'] = $filtered_criteria_of_teach[0];
                    } else {
                        $value['criteria_of_teach'] = null;
                    }
                    unset($value['subject']['course_of_study']['criteria_of_teach']);

                    $course_of_study = $value['subject']['course_of_study'];
                    $value['course_of_study'] = $course_of_study;
                    unset($value['subject']['course_of_study']);

                    $newData[] = $value;
                } else {
                    $newData[] = $value;
                }
            }
            return $newData;
        } catch (Exception $e) {
            throw new Exception(ErrorMessage::SCHEDULE_TEACH_NOT_FOUND, 404);
        }
    }

    public function getTeacherScheduleByTermOfYearId($termOfYearId)
    {
        try {
            $scheduleTeach = $this->scheduleTeachRepository->getTeacherSchedule($termOfYearId)->toArray();
            $teacherList = $this->teacherService->getAllTeachersWithoutAdmin();
            $thecherID = array_column($scheduleTeach, "teacher_id");
            $result = [];

            foreach ($teacherList as $teacher) {
                $teacher['has_schedule'] = in_array($teacher['teacher_id'], $thecherID);
                array_push($result, $teacher);
            }
            return $result;
        } catch (Exception $e) {
            throw new Exception(ErrorMessage::SCHEDULE_TEACH_NOT_FOUND, 404);
        }
    }

    

    public function updateScheduleTeach($id, $data)
    {
        $updated = $this->scheduleTeachRepository->updateScheduleTeach($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::SCHEDULE_TEACH_UPDATE_FAILED, 400);
        }
        return ["message" => ErrorMessage::UPDATE_SCHEDULE_TEACH_SUCCESS];
    }

    public function deleteScheduleTeach($id)
    {
        $delete = $this->scheduleTeachRepository->deleteScheduleTeach($id);
        if (!$delete) {
            throw new Exception(ErrorMessage::DELETE_SCHEDULE_TEACH_FAILED, 400);
        }
        return ["message" => ErrorMessage::DELETE_SCHEDULE_TEACH_SUCCESS];
    }
}
