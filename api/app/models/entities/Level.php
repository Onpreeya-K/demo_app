<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class Level extends Model {
    protected $table = 'level'; // Table name
    protected $primaryKey = 'level_id'; // Primary key column
    protected $fillable = ['level_id', 'name']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = false; // If primary key is not auto-incrementing
    protected $keyType = 'int'; // If primary key is not an integer

    public function criteriaOfTeach() {
        return $this->hasMany(CriteriaOfTeach::class, 'level_id'); 
    }

    // public function scheduleTeach() {
    //     return $this->hasMany(CourseOfStudy::class, 'course_of_study_id'); 
    // }
}
