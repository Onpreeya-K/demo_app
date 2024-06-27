<?php

namespace App\Repositories;

use App\Models\Entities\ScheduleTeach;

class ScheduleTeachRepository
{
    public function getAllScheduleTeachs()
    {
        return ScheduleTeach::get();
    }

    public function getScheduleTeachById($id)
    {
        return ScheduleTeach::find($id);
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
}
