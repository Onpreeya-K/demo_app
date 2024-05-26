<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model {
    protected $table = 'teacher'; // Table name
    protected $primaryKey = 'teacher_id'; // Primary key column
    protected $fillable = ['prefix', 'fullname', 'position', 'sub_positon', 'is_active']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = false; // If primary key is not auto-incrementing
    protected $keyType = 'string'; // If primary key is not an integer
}
