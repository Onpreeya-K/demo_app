<?php

namespace App\Modules\Degree\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\CourseOfStudy\Model\CourseOfStudy;

class Degree extends Model {
    protected $table = 'degree';
    protected $primaryKey = 'degree_id';
    protected $fillable = ['name'];
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true;
    protected $keyType = 'int';

    public function courseOfStudy() {
        return $this->hasMany(CourseOfStudy::class, 'course_of_study_id'); 
    }
}
