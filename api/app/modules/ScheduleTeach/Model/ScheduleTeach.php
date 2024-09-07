<?php

namespace App\Modules\ScheduleTeach\Model;

use App\Modules\Disbursement\Model\Disbursement;
use App\Modules\Disbursement\Model\DisbursementTeach;
use Illuminate\Database\Eloquent\Model;
use App\Modules\Level\Model\Level;
use App\Modules\Teacher\Model\Teacher;
use App\Modules\Subject\Model\Subject;
use App\Modules\TermOfYear\Model\TermOfYear;

class ScheduleTeach extends Model {
    protected $table = 'scheduleTeach'; // Table name
    protected $primaryKey = 'schedule_teach_id'; // Primary key column
    protected $fillable = ['teacher_id', 'subject_id', 'level_id', 'term_of_year_id', 'section', 'course_code', 'teach_date', 'total_seat', 'enroll_seat', 'major_name']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    protected $keyType = 'int'; // If primary key is not an integer

    public function teacher() {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    public function subject() {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function level() {
        return $this->belongsTo(Level::class, 'level_id');
    }

    public function termOfYear() {
        return $this->belongsTo(TermOfYear::class, 'term_of_year_id');
    }

    public function disbursements() {
        return $this->belongsToMany(Disbursement::class, 'disbursementTeach', 'schedule_teach_id', 'disbursement_id')
                    ->using(DisbursementTeach::class)
                    ->withPivot('count_of_teach', 'unit', 'unit_yes', 'unit_no', 'rate_of_unit', 'total', 'note');
    }
}
