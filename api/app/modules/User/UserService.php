<?php

namespace App\Modules\User;

use App\Constant\ErrorMessage;
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
        $fetchAll = $this->userRepository->getAllUsers();
        if (!$fetchAll) {
            throw new Exception(ErrorMessage::USER_NOT_FOUND, 404);
        }
        return $fetchAll;
    }

    public function getUsersRole()
    {
        $fetch = $this->userRepository->getAllUsersRole();
        if (!$fetch) {
            throw new Exception(ErrorMessage::USER_NOT_FOUND, 404);
        }
        return $fetch;
    }

    public function getUserById($id)
    {
        $fetch = $this->userRepository->getUserById($id);
        if (!$fetch) {
            throw new Exception(ErrorMessage::USER_NOT_FOUND, 404);
        }
        return $fetch;
    }

    public function createUser($data)
    {   
        return $this->userRepository->createUser($data);
    }

    public function updateUser($id, $data)
    {   
        $user = $this->userRepository->getUserById($id);

        if (!$user) {
            throw new Exception(ErrorMessage::USER_NOT_FOUND, 404);
        }

        if ($user && password_verify($data["old_password"], $user->password)){
            $newData["password"] = password_hash($data["new_password"], PASSWORD_BCRYPT);
            $update  = $this->userRepository->updateUser($id, $newData);
            if (!$update) {
                throw new Exception(ErrorMessage::UPDATE_PASSWORD_ERROR, 400);
            } 
            return ["message" => ErrorMessage::UPDATE_PASSWORD_SUCCESS];
            
        } else {
            throw new Exception(ErrorMessage::PASSWORD_USER_INVARID, 400);
        }
        
    }

    public function resetUserPassword($id)
    {   
        $data["password"]= password_hash($id, PASSWORD_BCRYPT);
        $updated = $this->userRepository->updateUser($id, $data);
        if (!$updated) {
            throw new Exception(ErrorMessage::RESET_PASSWORD_ERROR, 400);
        }
        return ["message" => ErrorMessage::RESET_PASSWORD_SUCCESS];
    }

    public function deleteUser($id)
    {
        $delete = $this->userRepository->deleteUser($id);
        if (!$delete) {
            throw new Exception(ErrorMessage::DELETE_USER_ERROR, 400);
        }
        return ["message" => ErrorMessage::DELETE_USER_SUCCESS];
    }
}
