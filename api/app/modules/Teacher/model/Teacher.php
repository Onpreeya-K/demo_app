<?php

namespace App\Modules\Teacher\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\User\Model\User;
use App\Modules\ManagementPosition\Model\ManagementPosition;
use App\Modules\AcademicPosition\Model\AcademicPosition;

class Teacher extends Model {
    protected $table = 'teacher'; // Table name
    protected $primaryKey = 'teacher_id'; // Primary key column
    protected $fillable = ['teacher_id', 'a_id', 'm_id', 'prefix', 'fullname', 'is_active']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at', 'is_active', 'm_id', 'a_id'];
    public $timestamps = true;
    public $incrementing = false; // If primary key is not auto-incrementing
    protected $keyType = 'string'; // If primary key is not an integerq                             

    public function user() {
        return $this->hasOne(User::class, 'username', 'teacher_id');
    }

    public function managementPosition() {
        return $this->belongsTo(ManagementPosition::class, 'm_id');
    }

    public function academicPosition() {
        return $this->belongsTo(AcademicPosition::class, 'a_id');
    }
}
