<?php

namespace App\Modules\CriteriaOfTeach\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\CourseOfStudy\Model\CourseOfStudy;
use App\Modules\Level\Model\Level;

class CriteriaOfTeach extends Model {
    protected $table = 'criteriaOfTeach';
    protected $primaryKey = 'criteria_of_teach_id';
    protected $fillable = ['course_of_study_id', 'level_id', 'teaching_rates', 'rate_unit'];
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true;

    public function courseOfStudy() {
        return $this->belongsTo(CourseOfStudy::class, 'course_of_study_id');
    }

    public function level() {
        return $this->belongsTo(Level::class, 'level_id');
    }
}
