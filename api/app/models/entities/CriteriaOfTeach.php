<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class CriteriaOfTeach extends Model {
    protected $table = 'criteriaOfTeach'; // Table name
    protected $primaryKey = 'criteria_of_teach_id'; // Primary key column
    protected $fillable = ['course_of_study_id', 'level_id', 'teaching_rates', 'rate_unit']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    // protected $keyType = 'string'; // If primary key is not an integer

    public function courseOfStudy() {
        return $this->belongsTo(CourseOfStudy::class, 'course_of_study_id');
    }

    public function level() {
        return $this->belongsTo(Level::class, 'level_id');
    }
}
