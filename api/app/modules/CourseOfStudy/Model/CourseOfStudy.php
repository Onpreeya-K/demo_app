<?php

namespace App\Modules\CourseOfStudy\Model;

use App\Modules\CriteriaOfTeach\Model\CriteriaOfTeach;
use Illuminate\Database\Eloquent\Model;
use App\Modules\Degree\Model\Degree;
use App\Modules\Department\Model\Department;
use App\Modules\Subject\Model\Subject;


class CourseOfStudy extends Model {
    protected $table = 'courseOfStudy';
    protected $primaryKey = 'course_of_study_id';
    protected $fillable = ['degree_id', 'department_id', 'name'];
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true;
    protected $keyType = 'int';

    public function degree() {
        return $this->belongsTo(Degree::class, 'degree_id');
    }

    public function department() {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function subject() {
        return $this->hasMany(Subject::class, 'course_of_study_id');
    }

    public function criteriaOfTeach() {
        return $this->hasMany(CriteriaOfTeach::class, 'course_of_study_id');
    }
}
