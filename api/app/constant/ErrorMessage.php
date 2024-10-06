<?php

namespace App\Constant;

class ErrorMessage
{
    const SOMETHING_WENT_WRONG = 'มีบางอย่างผิดพลาด';
    const LOGIN_INVALID = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
    const PDF_FILE_NOT_FOUND = 'ไม่พบไฟล์';


    //AcademicPosition
    const CREATE_ACADEMIC_SUCCESS = 'เพิ่มตำแหน่งทางวิชาการสำเร็จ';
    const CREATE_ACADEMIC_ERROR = 'เพิ่มตำแหน่งทางวิชาการไม่สำเร็จ';
    const ACADEMIC_NOT_FOUND = 'ไม่พบตำแหน่งทางวิชาการ';
    const UPDATE_ACADEMIC_ERROR = 'แก้ไขตำแหน่งทางวิชาการไม่สำเร็จ';
    const UPDATE_ACADEMIC_SUCCESS = 'แก้ไขตำแหน่งทางวิชาการสำเร็จ';
    const DELETE_ACADEMIC_ERROR = 'ลบตำแหน่งทางวิชาการไม่สำเร็จ';
    const DELETE_ACADEMIC_SUCESS = 'ลบตำแหน่งทางวิชาการสำเร็จ';

    //CourseOfStudy
    const CREATE_COURSE_OF_STUDY_SUCCESS = 'เพิ่มหลักสูตรสำเร็จ';
    const CREATE_COURSE_OF_STUDY_ERROR = 'เพิ่มหลักสูตรไม่สำเร็จ';
    const COURSE_OF_STUDY_NOT_FOUND = 'ไม่พบหลักสูตร';
    const UPDATE_COURSE_OF_STUDY_ERROR = 'แก้ไขหลักสูตรไม่สำเร็จ';
    const UPDATE_COURSE_OF_STUDY_SUCCESS = 'แก้ไขหลักสูตรสำเร็จ';
    const DELETE_COURSE_OF_STUDY_ERROR = 'ลบหลักสูตรไม่สำเร็จ';
    const DELETE_COURSE_OF_STUDY_SUCCESS = 'ลบหลักสูตรสำเร็จ';

     //CriteriaOfProcess
     const CREATE_CRITERIA_OF_PROCESS_SUCCESS = 'เพิ่มเกณฑ์คำนวณสำเร็จ';
     const CREATE_CRITERIA_OF_PROCESS_ERROR= 'เพิ่มเกณฑ์คำนวณไม่สำเร็จ';
     const CRITERIA_OF_PROCESS_NOT_FOUND = 'ไม่พบเกณฑ์คำนวณ';
     const UPDATE_CRITERIA_OF_PROCESS_ERROR = 'แก้ไขเกณฑ์คำนวณไม่สำเร็จ';
     const UPDATE_CRITERIA_OF_PROCESS_SUCCESS = 'แก้ไขเกณฑ์คำนวณสำเร็จ';
     const DELETE_CRITERIA_OF_PROCESS_ERROR = 'ลบเกณฑ์คำนวณไม่สำเร็จ';
     const DELETE_CRITERIA_OF_PROCESS_SUCCESS = 'ลบเกณฑ์คำนวณสำเร็จ';

     //CriteriaOfTeach
     const CREATE_CRITERIA_OF_TEACH_SUCCESS = 'เพิ่มเกณฑ์ค่าสอนสำเร็จ';
     const CREATE_CRITERIA_OF_TEACH_ERROR= 'เพิ่มเกณฑ์ค่าสอนไม่สำเร็จ';
     const CRITERIA_OF_TEACH_NOT_FOUND = 'ไม่พบเกณฑ์ค่าสอน';
     const UPDATE_CRITERIA_OF_TEACH_ERROR = 'แก้ไขเกณฑ์ค่าสอนไม่สำเร็จ';
     const UPDATE_CRITERIA_OF_TEACH_SUCCESS = 'แก้ไขเกณฑ์ค่าสอนสำเร็จ';
     const DELETE_CRITERIA_OF_TEACH_ERROR = 'ลบเกณฑ์ค่าสอนไม่สำเร็จ';
     const DELETE_CRITERIA_OF_TEACH_SUCCESS = 'ลบเกณฑ์ค่าสอนสำเร็จ';

     //Degree
     const CREATE_DEGREE_SUCCESS = 'เพิ่มระดับการศึกษาสำเร็จ';
     const CREATE_DEGREE_ERROR= 'เพิ่มระดับการศึกษาไม่สำเร็จ';
     const DEGREE_NOT_FOUND = 'ไม่พบระดับการศึกษา';
     const UPDATE_DEGREE_ERROR = 'แก้ไขระดับการศึกษาไม่สำเร็จ';
     const UPDATE_DEGREE_SUCCESS = 'แก้ไขระดับการศึกษาสำเร็จ';
     const DELETE_DEGREE_ERROR = 'ลบระดับการศึกษาไม่สำเร็จ';
     const DELETE_DEGREE_SUCCESS = 'ลบระดับการศึกษาสำเร็จ';
 
    //Disbursement
    const NO_DISBURSEMENT_FOUND = 'ไม่พบรายการเบิกค่าสอน';
    const DISBURSEMENT_NOT_FOUND = 'ไม่พบรายการเบิกค่าสอนดังกล่าว';
    const NO_DISBURSEMENT_FOUND_TERM = 'ไม่พบรายการเบิกค่าสอนในเทอมนี้';
    const DISBURSEMENT_CREATION_FAILED = 'เพิ่มรายการเบิกค่าสอนดังกล่าวไม่สำเร็จ';
    const DISBURSEMENT_UPDATE_FAILED = 'แก้ไขรายการเบิกค่าสอนดังกล่าวไม่สำเร็จ';
    const DISBURSEMENT_DELETION_FAILED = 'ลบรายการเบิกค่าสอนดังกล่าวไม่สำเร็จ';

    //Subject
    const NO_SUBJECTS_FOUND = 'ไม่พบรายวิชา';
    const SUBJECT_NOT_FOUND = 'ไม่พบรายวิชาดังกล่าว';
    const SUBJECT_CREATION_FAILED = 'เพิ่มรายวิชาดังกล่าวไม่สำเร็จ';
    const SUBJECT_UPDATE_FAILED = 'แก้ไขรายวิชาดังกล่าวไม่สำเร็จ';
    const SUBJECT_DELETION_FAILED = 'ลบรายวิชาดังกล่าวไม่สำเร็จ';

    //ScheduleTeach
    const CREATE_SCHEDULE_TEACH_SUCCESS = 'เพิ่มตารางสอนสำเร็จ';
    const CREATE_SCHEDULE_TEACH_ERROR= 'เพิ่มตารางสอนไม่สำเร็จ';
    const SCHEDULE_TEACH_NOT_FOUND = 'ไม่พบตารางสอน';
    const SCHEDULE_TEACH_UPDATE_FAILED = 'แก้ไขตารางสอนไม่สำเร็จ';
    const UPDATE_SCHEDULE_TEACH_SUCCESS = 'แก้ไขตารางสอนสำเร็จ';
    const DELETE_SCHEDULE_TEACH_SUCCESS = 'ลบตารางสอนสำเร็จ';
    const DELETE_SCHEDULE_TEACH_FAILED = 'ลบตารางสอนไม่สำเร็จ';

}