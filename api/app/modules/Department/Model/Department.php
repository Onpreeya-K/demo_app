<?php

namespace App\Modules\Department\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\CourseOfStudy\Model\CourseOfStudy;

class Department extends Model {
    protected $table = 'department';
    protected $primaryKey = 'department_id';
    protected $fillable = ['name'];
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true;
    protected $keyType = 'int';

    public function courseOfStudy() {
        return $this->hasMany(CourseOfStudy::class, 'department_id'); 
    }
}
