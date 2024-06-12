<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class Major extends Model {
    protected $table = 'major'; // Table name
    protected $primaryKey = 'major_id'; // Primary key column
    protected $fillable = ['department_id', 'name']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    protected $keyType = 'int'; // If primary key is not an integer

    public function department() {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function subject() {
        return $this->hasMany(Subject::class, 'major_id');
    }
    
}
