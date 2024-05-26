<?php

namespace App\Models;
use Symfony\Component\Validator\Constraints as Assert;

class TeacherDTO{
    /**
     *@Assert\NotNull()
     *@Assert\Type(type="string")
     */
    #[Assert\Type('string')]
    public $teacher_id;
    // public $prefix;
    // public $fullname;
    // public $position;
    // public $sub_position;
    // public $is_active;
}

// class TeacherResponseDTO{
    
// }