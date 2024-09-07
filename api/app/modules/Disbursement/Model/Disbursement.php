<?php

namespace App\Modules\Disbursement\Model;

use App\Modules\ScheduleTeach\Model\ScheduleTeach;
use Illuminate\Database\Eloquent\Model;
use App\Modules\Teacher\Model\Teacher;
use App\Modules\TermOfYear\Model\TermOfYear;

class Disbursement extends Model {
    protected $table = 'disbursement'; // Table name
    protected $primaryKey = 'disbursement_id'; // Primary key column
    protected $fillable = ['teacher_id', 'term_of_year_id', 'sum_yes_unit', 'sum_no_unit', 'total', 'status', 'pdf_path', 'created_at']; // Fillable columns
    protected $hidden = ['updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    protected $keyType = 'int'; // If primary key is not an integer

    public function teacher() {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }
    public function termOfYear() {
        return $this->belongsTo(TermOfYear::class, 'term_of_year_id');
    }

    public function scheduleTeachs() {
        return $this->belongsToMany(ScheduleTeach::class, 'disbursementTeach', 'disbursement_id', 'schedule_teach_id')
                    ->using(DisbursementTeach::class)
                    ->withPivot('count_of_teach', 'unit', 'unit_yes', 'unit_no', 'rate_of_unit', 'total', 'note');
    }
}
