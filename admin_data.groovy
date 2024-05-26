basepath = 'api/v1'

# Login

POST : '/login'
Header : null,
Request : {
    "username" : "aaa",
    "password" : "sss"
}
Response : {
    "message" : "dfdfdfd",
    "payload" : {
        "token" : "fggfgf",
        "role" : "admin",
        "data" : {
         "theacher_id" : "1234",
         "fullname" : "nnnn nnnnnn"
        }
    }
}

# All Teachers

GET : '/teachers'
Header : "Authorization" : Bearer,
Request : { }
Response : {
    "message" : "dfdfdfd",
    "payload" : {
        "data" : [
            {
                "teacher_id": "50078",
                "prefix": "อ.ดร.",
                "fullname": "วิภาณี สุขเอิบ",
                "position": "อาจารย์",
                "sub_positon": "อาจารย์"
            },
            {
                "teacher_id": "50079",
                "prefix": "อ.ดร.",
                "fullname": "วิภาณี2 สุขเอิบ",
                "position": "อาจารย์",
                "sub_positon": "อาจารย์"
            },
            {
                "teacher_id": "50080",
                "prefix": "อ.ดร.",
                "fullname": "วิภาณี3 สุขเอิบ",
                "position": "อาจารย์",
                "sub_positon": "อาจารย์"
            },
        ]
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
