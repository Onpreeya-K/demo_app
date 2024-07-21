<?php

namespace App\Modules\AcademicPosition\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\Teacher\Model\Teacher;

class AcademicPosition extends Model {
    protected $table = 'academicPosition'; // Table name
    protected $primaryKey = 'a_id'; // Primary key column
    protected $fillable = ['name']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    // protected $keyType = 'string'; // If primary key is not an integer


    public function teacher() {
        return $this->hasMany(Teacher::class, 'a_id');
    }
}
  