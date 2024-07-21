<?php

namespace App\Modules\User;

use App\Modules\User\Model\User;

class UserRepository
{
    public function getAllUsers()
    {
        return User::get();
    }

    public function getUserById($id)
    {
        return User::find($id);
    }

    public function createUser($data)
    {
        return User::create($data);
    }

    public function updateUser($id, $data)
    {
        return User::where('username', $id)->update($data);
    }

    public function deleteUser($id)
    {
        return User::where('username', $id)->delete();
    }
}
