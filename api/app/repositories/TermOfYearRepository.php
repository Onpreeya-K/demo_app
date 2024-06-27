<?php

namespace App\Repositories;

use App\Models\Entities\TermOfYear;

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
