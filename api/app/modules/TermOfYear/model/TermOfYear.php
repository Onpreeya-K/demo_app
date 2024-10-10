<?php

namespace App\Modules\TermOfYear\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\Disbursement\Model\Disbursement;
use App\Modules\ScheduleTeach\Model\ScheduleTeach;

class TermOfYear extends Model {
    protected $table = 'termOfYear';
    protected $primaryKey = 'term_of_year_id';
    protected $fillable = ['term']; 
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true;
    protected $keyType = 'int';

    public function disbursement() {
        return $this->hasMany(Disbursement::class, 'term_of_year_id');
    }

    public function scheduleTeach() {
        return $this->hasMany(ScheduleTeach::class, 'term_of_year_id');
    }
}
