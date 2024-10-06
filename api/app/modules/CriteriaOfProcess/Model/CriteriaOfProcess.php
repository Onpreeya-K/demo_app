<?php

namespace App\Modules\CriteriaOfProcess\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\ManagementPosition\Model\ManagementPosition;

class CriteriaOfProcess extends Model {
    protected $table = 'criteriaOfProcess';
    protected $primaryKey = 'criteria_of_process_id';
    protected $fillable = ['name', 'min_unit', 'max_unit'];
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true;

    public function managementPosition() {
        return $this->hasMany(ManagementPosition::class, 'criteria_of_process_id');
    }
}