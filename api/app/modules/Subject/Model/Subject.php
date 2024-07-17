<?php

namespace App\Modules\Subject\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\CourseOfStudy\Model\CourseOfStudy;
use App\Modules\ScheduleTeach\Model\ScheduleTeach;

class Subject extends Model {
    protected $table = 'subject'; // Table name
    protected $primaryKey = 'subject_id'; // Primary key column
    protected $fillable = ['subject_id', 'course_of_study_id', 'name', 'unit', 'type']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at', 'status'];
    public $timestamps = true;
    public $incrementing = false; // If primary key is not auto-incrementing
    protected $keyType = 'string'; // If primary key is not an integer

    public function courseOfStudy() {
        return $this->belongsTo(CourseOfStudy::class, 'course_of_study_id');
    }

    public function scheduleTeach() {
        return $this->hasMany(ScheduleTeach::class, 'subject_id');
    }
}
