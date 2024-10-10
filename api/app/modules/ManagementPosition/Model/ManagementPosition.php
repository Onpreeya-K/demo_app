<?php

namespace App\Modules\ManagementPosition\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\CriteriaOfProcess\Model\CriteriaOfProcess;
use App\Modules\Teacher\Model\Teacher;

class ManagementPosition extends Model {
    protected $table = 'managementPosition';
    protected $primaryKey = 'm_id';
    protected $fillable = ['criteria_of_process_id', 'name'];
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true;


    public function criteriaOfProcess() {
        return $this->belongsTo(CriteriaOfProcess::class, 'criteria_of_process_id');
    }

    public function teacher() {
        return $this->hasMany(Teacher::class, 'm_id');
    }
}
  