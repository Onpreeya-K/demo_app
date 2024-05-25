<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table = 'teacher'; // Table name
    protected $primaryKey = 'teacher_id'; // Primary key column
    // protected $fillable = ['name', 'email', 'password']; // Fillable columns
    public $incrementing = false; // If primary key is not auto-incrementing
    protected $keyType = 'string'; // If primary key is not an integer
}
