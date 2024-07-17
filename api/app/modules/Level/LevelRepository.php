<?php

namespace App\Modules\Level;

use App\Modules\Level\Model\Level;

class LevelRepository
{
    public function getAllLevels()
    {
        return Level::get();
    }

    public function getLevelById($id)
    {
        return Level::find($id);
    }

    public function createLevel($data)
    {
        
        return Level::create($data);
    }

    public function updateLevel($id, $data)
    {
        return Level::where('level_id', $id)->update($data);
    }

    public function deleteLevel($id)
    {
        return Level::where('level_id', $id)->delete();
    }
}
