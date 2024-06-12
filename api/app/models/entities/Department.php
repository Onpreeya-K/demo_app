<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class Department extends Model {
    protected $table = 'department'; // Table name
    protected $primaryKey = 'department_id'; // Primary key column
    protected $fillable = ['name']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    protected $keyType = 'int'; // If primary key is not an integer

    public function major() {
        return $this->hasMany(Major::class, 'department_id'); 
    }
}
