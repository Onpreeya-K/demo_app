<?php

namespace App\Modules\ManagementPosition\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\CriteriaOfProcess\Model\CriteriaOfProcess;
use App\Modules\Teacher\Model\Teacher;

class ManagementPosition extends Model {
    protected $table = 'managementPosition'; // Table name
    protected $primaryKey = 'm_id'; // Primary key column
    protected $fillable = ['criteria_of_process_id', 'name']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    // protected $keyType = 'string'; // If primary key is not an integer

    public function criteriaOfProcess() {
        return $this->belongsTo(CriteriaOfProcess::class, 'criteria_of_process_id');
    }

    public function teacher() {
        return $this->hasMany(Teacher::class, 'm_id');
    }
}
  