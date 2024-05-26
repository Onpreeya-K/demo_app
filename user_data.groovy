basepath = 'localhost/api/v1'

# Login

POST : '/login'
Header : null,
Request : {
    "username" : "user_id",
    "password" : "sss"
}
Response : {
    "message" : "dfdfdfd",
    "payload" : {
        "token" : "fggfgf",
        "role" : "user",
        "data" : {
         "theacher_id" : "1234",
         "fullname" : "nnnn nnnnnn"
        }
    }
}

# GET Schedule

GET : '/schedule/{id}'
Header : "Authorization" : Bearer,
Request : {
    {
        "term_year" : "1/2567"
    }
 }
Response : {
    "message" : "dfdfdfd",
    "payload" : {
        "data" : {
            "subject_teach_id" : 1,
            "teacher_id" : "11111",
            "subject_id" : "1",
        }
    }
}

# Add Teachers

POST : '/teachers'
Header : "Authorization" : Bearer,
Request : {
        "teacher_id": "50078",
        "prefix": "อ.ดร.",
        "fullname": "วิภาณี สุขเอิบ",
        "position": "อาจารย์",
        "sub_positon": "อาจารย์"
    }
Response : {
    "message" : "dfdfdfd",
}

# Update Teachers
PUT : '/teachers/{id}'
Header : "Authorization" : Bearer,
Request : {
        "teacher_id": "50078",
        "prefix": "อ.ดร.",
        "fullname": "วิภาณี สุขเอิบ",
        "position": "อาจารย์",
        "sub_positon": "อาจารย์"
    }
Response : {
    "message" : "dfdfdfd",
}

# Delete Teachers
DELETE : '/teachers/{id}'
Header : "Authorization" : Bearer,
Request : {}
Response : {
    "message" : "dfdfdfd",
}

-------------------------------------------------
