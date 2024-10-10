<?php

namespace App\Modules\Level\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\CriteriaOfTeach\Model\CriteriaOfTeach;
use App\Modules\ScheduleTeach\Model\ScheduleTeach;

class Level extends Model {
    protected $table = 'level';
    protected $primaryKey = 'level_id';
    protected $fillable = ['level_id', 'name'];
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = false;
    protected $keyType = 'int';

    public function criteriaOfTeach() {
        return $this->hasMany(CriteriaOfTeach::class, 'level_id'); 
    }

    public function scheduleTeach() {
        return $this->hasMany(ScheduleTeach::class, 'level_id'); 
    }
}
