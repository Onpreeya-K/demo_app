<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    protected $table = 'user';
    protected $primaryKey = 'username';
    protected $fillable = ['username', 'password', 'role'];
    public $incrementing = false; // Assuming username is not auto-incrementing
    public $timestamps = false;
    protected $keyType = 'string';

    public function teacher() {
        return $this->belongsTo('Teacher', 'username', 'teacher_id');
    }

    public function setPasswordAttribute($password) {
        $this->attributes['password'] = password_hash($password, PASSWORD_BCRYPT);
    }
}
