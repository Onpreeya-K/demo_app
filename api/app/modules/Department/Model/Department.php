<?php

namespace App\Modules\Department\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\CourseOfStudy\Model\CourseOfStudy;

class Department extends Model {
    protected $table = 'department'; // Table name
    protected $primaryKey = 'department_id'; // Primary key column
    protected $fillable = ['name']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    protected $keyType = 'int'; // If primary key is not an integer

    public function courseOfStudy() {
        return $this->hasMany(CourseOfStudy::class, 'department_id'); 
    }
}
