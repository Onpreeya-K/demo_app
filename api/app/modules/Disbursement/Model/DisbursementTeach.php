<?php

namespace App\Modules\Disbursement\Model;

use App\Modules\ScheduleTeach\Model\ScheduleTeach;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class DisbursementTeach extends Pivot {
    protected $table = 'disbursementTeach';
    protected $fillable = ['disbursement_id', 'schedule_teach_id', 'count_of_teach', 'unit', 'unit_yes', 'unit_no', 'rate_of_unit', 'total', 'note']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];

}
