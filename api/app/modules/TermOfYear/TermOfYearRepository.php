<?php

namespace App\Modules\TermOfYear;

use App\Modules\TermOfYear\Model\TermOfYear;

class TermOfYearRepository
{
    public function getAllTermOfYears()
    {
        return TermOfYear::get();
    }

    public function getTermOfYearById($id)
    {
        return TermOfYear::find($id);
    }

    public function createTermOfYear($data)
    {
        
        return TermOfYear::create($data);
    }

    public function updateTermOfYear($id, $data)
    {
        return TermOfYear::where('term_of_year_id', $id)->update($data);
    }

    public function deleteTermOfYear($id)
    {
        return TermOfYear::where('term_of_year_id', $id)->delete();
    }
}
