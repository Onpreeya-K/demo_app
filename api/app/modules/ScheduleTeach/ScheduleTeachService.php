<?php

namespace App\Modules\ScheduleTeach;

use App\Modules\Subject\SubjectService;
use App\Modules\Teacher\TeacherService;

use App\Constant\ErrorMessage;
use App\Modules\Level\LevelService;
use Exception;
use Illuminate\Database\Capsule\Manager as DB;

class ScheduleTeachService
{
    protected $scheduleTeachRepository;
    protected $teacherService;
    protected $subjectService;
    protected $levelService;


    public function __construct(ScheduleTeachRepository $scheduleTeachRepository, TeacherService $teacherService, SubjectService $subjectService, LevelService $levelService)
    {
        $this->scheduleTeachRepository = $scheduleTeachRepository;
        $this->teacherService = $teacherService;
        $this->subjectService = $subjectService;
        $this->levelService = $levelService;
    }

    public function createScheduleTeach($data)
    {
        try {
            $teacherID = $data['teacher_id'];
            $termID = $data['term_of_year_id'];
            $scheduleList = $data['data'];

            DB::transaction(function () use ($scheduleList, $teacherID, $termID) {
                foreach ($scheduleList as $value) {
                    $errMessage = $this->validateScheduleTeachData($value);
                    if ($errMessage != "") {
                        throw new Exception($errMessage, 400);
                    }
                    $checkLevelId = $this->levelService->getLevelById($value['level_id']);

                    $checkSubject = $this->subjectService->getSubjectIsExist($value['course_code']);
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
            $mes = $e->getMessage();
            if ($mes == ErrorMessage::LEVEL_NOT_FOUND) {
                $mes = ErrorMessage::LEVEL_INVALID;
            }
            throw new Exception($mes, 400);
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

    public function deleteByTermIdAndTeacherId($termID, $teacherID)
    {
        $countScheduleTeachId = $this->scheduleTeachRepository->scheduleTeachIdByTermAndTeacherIdExistInDisbursementTeach($termID, $teacherID);
        if ($countScheduleTeachId > 0){
            throw new Exception(ErrorMessage::DELETE_SCHEDULE_TEACH_FAILED_EXIST, 400);
        }
        
        $delete = $this->scheduleTeachRepository->deleteByTermIdAndTeacherId($termID, $teacherID);
        if (!$delete) {
            throw new Exception(ErrorMessage::DELETE_SCHEDULE_TEACH_FAILED, 400);
        }
        return ["message" => ErrorMessage::DELETE_SCHEDULE_TEACH_SUCCESS];
    }

    private function validateScheduleTeachData($value){ 
        if($value['level_id'] == '' || !is_numeric($value['level_id'])){
            return ErrorMessage::LEVEL_INVALID;
        }
        if($value['course_code'] == '' || $value['course_name'] == ''){
            return ErrorMessage::SUBJECTS_INVALID;
        }
        if($value['section'] == '' || !is_numeric($value['section'])){
            return ErrorMessage::SECTION_INVALID;
        }
        if($value['course_unit'] == ''){
            return ErrorMessage::COURSE_UNIT_NOT_FOUND;
        }
        if($value['total_seat'] == '' || !is_numeric($value['total_seat'])){
            return ErrorMessage::TOTAL_SEAT_INVALID;
        }
        if($value['enroll_seat'] == '' || !is_numeric($value['enroll_seat'])){
            return ErrorMessage::ENROLL_SEAT_INVALID;
        }

        return "";

    }
}
