<?php

namespace App\Modules\AcademicPosition\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\Teacher\Model\Teacher;

class AcademicPosition extends Model {
    protected $table = 'academicPosition';
    protected $primaryKey = 'a_id';
    protected $fillable = ['name'];
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true;


    public function teacher() {
        return $this->hasMany(Teacher::class, 'a_id');
    }
}
  