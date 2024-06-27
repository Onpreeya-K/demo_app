<?php

namespace App\Services;

use App\Repositories\ScheduleTeachRepository;

class ScheduleTeachService
{
    protected $majorRepository;

    public function __construct(ScheduleTeachRepository $majorRepository)
    {
        $this->majorRepository = $majorRepository;
    }

    public function getAllScheduleTeachs()
    {
        return $this->majorRepository->getAllScheduleTeachs();
    }

    public function getScheduleTeachById($id)
    {
        return $this->majorRepository->getScheduleTeachById($id);
    }

    public function createScheduleTeach($data)
    {
        return $this->majorRepository->createScheduleTeach($data);
    }

    public function updateScheduleTeach($id, $data)
    {
        // $data->
        return $this->majorRepository->updateScheduleTeach($id, $data);
    }

    public function deleteScheduleTeach($id)
    {
        return $this->majorRepository->deleteScheduleTeach($id);
    }
}
