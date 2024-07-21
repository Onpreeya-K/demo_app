<?php

namespace App\Modules\Teacher\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\User\Model\User;
use App\Modules\ManagementPosition\Model\ManagementPosition;

class Teacher extends Model {
    protected $table = 'teacher'; // Table name
    protected $primaryKey = 'teacher_id'; // Primary key column
    protected $fillable = ['teacher_id', 'm_id', 'prefix', 'fullname', 'position', 'is_active']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at', 'is_active'];
    public $timestamps = true;
    public $incrementing = false; // If primary key is not auto-incrementing
    protected $keyType = 'string'; // If primary key is not an integerq                             

    public function user() {
        return $this->hasOne(User::class, 'username', 'teacher_id');
    }

    public function managementPosition() {
        return $this->belongsTo(ManagementPosition::class, 'm_id');
    }
}
