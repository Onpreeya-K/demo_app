<?php

namespace App\Modules\User;

use Exception;
class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAllUsers()
    {
        return $this->userRepository->getAllUsers();
    }

    public function getUserById($id)
    {
        return $this->userRepository->getUserById($id);
    }

    public function createUser($data)
    {   
        return $this->userRepository->createUser($data);
    }

    public function updateUser($id, $data)

    {   $user = $this->userRepository->getUserById($id);
        if ($user && password_verify($data["old_password"], $user->password)){
            $newData["password"] = password_hash($data["new_password"], PASSWORD_BCRYPT);
            return $this->userRepository->updateUser($id, $newData);
        } else {
            throw new Exception("Old password is incorrect");
        }
        
    }

    public function resetUserPassword($id)
    {   
        $data["password"]= password_hash($id, PASSWORD_BCRYPT);
        return $this->userRepository->updateUser($id, $data);
    }

    public function deleteUser($id)
    {
        return $this->userRepository->deleteUser($id);
    }
}
