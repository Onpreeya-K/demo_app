<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class TermOfYear extends Model {
    protected $table = 'termOfYear'; // Table name
    protected $primaryKey = 'term_of_year_id'; // Primary key column
    protected $fillable = ['term']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    protected $keyType = 'int'; // If primary key is not an integer

    // public function courseOfStudy() {
    //     return $this->hasMany(CourseOfStudy::class, 'course_of_study_id'); 
    // }
}
