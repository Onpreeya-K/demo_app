<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model {
    protected $table = 'subject'; // Table name
    protected $primaryKey = 'subject_id'; // Primary key column
    protected $fillable = ['subject_id', 'major_id', 'course_of_study_id', 'name', 'credit', 'type', 'status']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = false; // If primary key is not auto-incrementing
    protected $keyType = 'string'; // If primary key is not an integer

    public function courseOfStudy() {
        return $this->belongsTo(CourseOfStudy::class, 'course_of_study_id');
    }

    public function major() {
        return $this->belongsTo(Major::class, 'major_id');
    }
}
