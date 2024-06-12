<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class CourseOfStudy extends Model {
    protected $table = 'courseOfStudy'; // Table name
    protected $primaryKey = 'course_of_study_id'; // Primary key column
    protected $fillable = ['degree_id', 'name']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    protected $keyType = 'int'; // If primary key is not an integer

    public function degree() {
        return $this->belongsTo(Degree::class, 'degree_id');
    }

    public function subject() {
        return $this->hasMany(Subject::class, 'course_of_study_id');
    }
}
