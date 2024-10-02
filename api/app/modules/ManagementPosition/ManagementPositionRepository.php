<?php

namespace App\Modules\ManagementPosition;

use App\Modules\ManagementPosition\Model\ManagementPosition;

class ManagementPositionRepository
{
    public function getAllManagementPositions()
    {
        return ManagementPosition::get();
    }

    public function getManagementPositionById($id)
    {
        return ManagementPosition::find($id);
    }

    public function createManagementPosition($data)
    {
        
        return ManagementPosition::create($data);
    }

    public function updateManagementPosition($id, $data)
    {
        return ManagementPosition::where('m_id', $id)->update($data);
    }

    public function deleteManagementPosition($id)
    {
        return ManagementPosition::where('m_id', $id)->delete();
    }
}
