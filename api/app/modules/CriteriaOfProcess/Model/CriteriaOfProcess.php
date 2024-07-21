<?php

namespace App\Modules\CriteriaOfProcess\Model;

use Illuminate\Database\Eloquent\Model;
use App\Modules\ManagementPosition\Model\ManagementPosition;

class CriteriaOfProcess extends Model {
    protected $table = 'criteriaOfProcess'; // Table name
    protected $primaryKey = 'criteria_of_process_id'; // Primary key column
    protected $fillable = ['name', 'min_unit', 'max_unit']; // Fillable columns
    protected $hidden = ['created_at', 'updated_at'];
    public $timestamps = true;
    public $incrementing = true; // If primary key is not auto-incrementing
    // protected $keyType = 'string'; // If primary key is not an integer

    public function managementPosition() {
        return $this->hasMany(ManagementPosition::class, 'criteria_of_process_id');
    }
}