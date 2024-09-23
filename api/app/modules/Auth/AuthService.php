<?php

namespace App\Modules\Auth;

use App\Modules\User\UserRepository;
use App\Modules\Teacher\TeacherRepository;
use Firebase\JWT\JWT;

use Exception;

class AuthService
{
    protected $userRepository;
    protected $teacherRopository;
    private $secret;

    public function __construct(UserRepository $userRepository, TeacherRepository $teacherRepository)
    {
        $this->userRepository = $userRepository;
        $this->teacherRopository = $teacherRepository;
        $this->secret = $_ENV['SECRET_KEY'];

    }

    public function signUp($data)
    {
        $user = $this->userRepository->createUser($data);
        $resp = array('data' => $user);
        return json_encode($resp);
    }

    public function login($data)
    {
        $user = $this->userRepository->getUserById($data["username"]);
        if ($user && password_verify($data["password"], $user->password)) {
            $now = new \DateTime();
            $future = new \DateTime("now +5 hours");
            $jti = base64_encode(random_bytes(16));

            $payload = [
                "iat" => $now->getTimeStamp(),
                "exp" => $future->getTimeStamp(),
                "jti" => $jti,
                "sub" => "abc",
            ];
            $teacher = $this->teacherRopository->getTeacherById($data["username"]);
            $token = JWT::encode($payload, $this->secret , $_ENV["ALGRO"]);
            $resp = array('token' => $token, 'role' =>$user['role'] , 'data' => $teacher);
            return $resp;
            
        } else {
            throw new Exception("Invalid username or password", 401);
        }
    }

    public function logout($data)
    {
        // $data->
        // return $this->userRepository->updateUser($id, $data);
        return "sss";
    }

    public function forgetPassword($data)
    {
        // $data->
        // return $this->userRepository->updateUser($id, $data);
    }

    

}
