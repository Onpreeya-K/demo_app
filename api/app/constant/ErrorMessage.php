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
  const CREATE_CRITERIA_OF_PROCESS_ERROR = 'เพิ่มเกณฑ์คำนวณไม่สำเร็จ';
  const CRITERIA_OF_PROCESS_NOT_FOUND = 'ไม่พบเกณฑ์คำนวณ';
  const UPDATE_CRITERIA_OF_PROCESS_ERROR = 'แก้ไขเกณฑ์คำนวณไม่สำเร็จ';
  const UPDATE_CRITERIA_OF_PROCESS_SUCCESS = 'แก้ไขเกณฑ์คำนวณสำเร็จ';
  const DELETE_CRITERIA_OF_PROCESS_ERROR = 'ลบเกณฑ์คำนวณไม่สำเร็จ';
  const DELETE_CRITERIA_OF_PROCESS_SUCCESS = 'ลบเกณฑ์คำนวณสำเร็จ';

  //CriteriaOfTeach
  const CREATE_CRITERIA_OF_TEACH_SUCCESS = 'เพิ่มเกณฑ์ค่าสอนสำเร็จ';
  const CREATE_CRITERIA_OF_TEACH_ERROR = 'เพิ่มเกณฑ์ค่าสอนไม่สำเร็จ';
  const CRITERIA_OF_TEACH_NOT_FOUND = 'ไม่พบเกณฑ์ค่าสอน';
  const UPDATE_CRITERIA_OF_TEACH_ERROR = 'แก้ไขเกณฑ์ค่าสอนไม่สำเร็จ';
  const UPDATE_CRITERIA_OF_TEACH_SUCCESS = 'แก้ไขเกณฑ์ค่าสอนสำเร็จ';
  const DELETE_CRITERIA_OF_TEACH_ERROR = 'ลบเกณฑ์ค่าสอนไม่สำเร็จ';
  const DELETE_CRITERIA_OF_TEACH_SUCCESS = 'ลบเกณฑ์ค่าสอนสำเร็จ';

  //Degree
  const CREATE_DEGREE_SUCCESS = 'เพิ่มระดับการศึกษาสำเร็จ';
  const CREATE_DEGREE_ERROR = 'เพิ่มระดับการศึกษาไม่สำเร็จ';
  const DEGREE_NOT_FOUND = 'ไม่พบระดับการศึกษา';
  const UPDATE_DEGREE_ERROR = 'แก้ไขระดับการศึกษาไม่สำเร็จ';
  const UPDATE_DEGREE_SUCCESS = 'แก้ไขระดับการศึกษาสำเร็จ';
  const DELETE_DEGREE_ERROR = 'ลบระดับการศึกษาไม่สำเร็จ';
  const DELETE_DEGREE_SUCCESS = 'ลบระดับการศึกษาสำเร็จ';

  //Department      
  const CREATE_DEPARTMENT_SUCCESS = 'เพิ่มภาควิชาสำเร็จ';
  const CREATE_DEPARTMENT_ERROR = 'เพิ่มภาควิชาไม่สำเร็จ';
  const DEPARTMENT_NOT_FOUND = 'ไม่พบภาควิชา';
  const UPDATE_DEPARTMENT_ERROR = 'แก้ไขภาควิชาไม่สำเร็จ';
  const UPDATE_DEPARTMENT_SUCCESS = 'แก้ไขภาควิชาสำเร็จ';
  const DELETE_DEPARTMENT_ERROR = 'ลบภาควิชาไม่สำเร็จ';
  const DELETE_DEPARTMENT_SUCCESS = 'ลบภาควิชาสำเร็จ';

  //Disbursement
  const CREATE_DISBURSEMENT_SUCCESS = 'เพิ่มรายการเบิกค่าสอนสำเร็จ';
  const CREATE_DISBURSEMENT_ERROR = 'เพิ่มรายการเบิกค่าสอนไม่สำเร็จ';
  const DISBURSEMENT_TEACH_NOT_FOUND = 'ไม่พบข้อมูลรายการเบิกค่าสอน';
  const DISBURSEMENT_NOT_FOUND = 'ไม่พบรายการเบิกค่าสอน';
  const DISBURSEMENT_NOT_FOUND_TERM = 'ไม่พบรายการเบิกค่าสอนในเทอมนี้';
  const UPDATE_DISBURSEMENT_ERROR = 'แก้ไขรายการเบิกค่าสอนไม่สำเร็จ';
  const UPDATE_DISBURSEMENT_SUCCESS = 'แก้ไขรายการเบิกค่าสอนสำเร็จ';
  const UPDATE_DISBURSEMENT_STATUS_ERROR = 'แก้ไขสถานะรายการเบิกค่าสอนไม่สำเร็จ';
  const UPDATE_DISBURSEMENT_STATUS_SUCCESS = 'แก้ไขสถานะรายการเบิกค่าสอนสำเร็จ';
  const DELETE_DISBURSEMENT_ERROR = 'ลบรายการเบิกค่าสอนไม่สำเร็จ';
  const DELETE_DISBURSEMENT_SUCCESS = 'ลบรายการเบิกค่าสอนสำเร็จ';

  //Level      
  const CREATE_LEVEL_SUCCESS = 'เพิ่มระดับการศึกษาสำเร็จ';
  const CREATE_LEVEL_ERROR = 'เพิ่มระดับการศึกษาไม่สำเร็จ';
  const LEVEL_NOT_FOUND = 'ไม่พบระดับการศึกษา';
  const UPDATE_LEVEL_ERROR = 'แก้ไขระดับการศึกษาไม่สำเร็จ';
  const UPDATE_LEVEL_SUCCESS = 'แก้ไขระดับการศึกษาสำเร็จ';
  const DELETE_LEVEL_ERROR = 'ลบระดับการศึกษาไม่สำเร็จ';
  const DELETE_LEVEL_SUCCESS = 'ลบระดับการศึกษาสำเร็จ';

  //ManagementPosition
  const CREATE_MANAGEMENT_POSITION_SUCCESS = 'เพิ่มตำแหน่งบริหารสำเร็จ';
  const CREATE_MANAGEMENT_POSITION_ERROR = 'เพิ่มตำแหน่งบริหารไม่สำเร็จ';
  const MANAGEMENT_POSITION_NOT_FOUND = 'ไม่พบตำแหน่งบริหาร';
  const UPDATE_MANAGEMENT_POSITION_ERROR = 'แก้ไขตำแหน่งบริหารไม่สำเร็จ';
  const UPDATE_MANAGEMENT_POSITION_SUCCESS = 'แก้ไขตำแหน่งบริหารสำเร็จ';
  const DELETE_MANAGEMENT_POSITION_ERROR = 'ลบตำแหน่งบริหารไม่สำเร็จ';
  const DELETE_MANAGEMENT_POSITION_SUCCESS = 'ลบตำแหน่งบริหารสำเร็จ';

  //Subject
  const CREATE_SUBJECTS_SUCCESS = 'เพิ่มรายวิชาสำเร็จ';
  const CREATE_SUBJECTS_ERROR = 'เพิ่มรายวิชาไม่สำเร็จ';
  const SUBJECTS_NOT_FOUND = 'ไม่พบรายวิชา';
  const UPDATE_SUBJECTS_ERROR = 'แก้ไขรายวิชาไม่สำเร็จ';
  const UPDATE_SUBJECTS_SUCCESS = 'แก้ไขรายวิชาสำเร็จ';
  const DELETE_SUBJECTS_ERROR = 'ลบรายวิชาไม่สำเร็จ';
  const DELETE_SUBJECTS_SUCCESS = 'ลบรายวิชาสำเร็จ';

  //Teacher
  const CREATE_TEACHER_SUCCESS = 'เพิ่มอาจารย์สำเร็จ';
  const CREATE_TEACHER_ERROR = 'เพิ่มอาจารย์ไม่สำเร็จ';
  const TEACHER_NOT_FOUND = 'ไม่พบอาจารย์';
  const UPDATE_TEACHER_ERROR = 'แก้ไขอาจารย์ไม่สำเร็จ';
  const UPDATE_TEACHER_SUCCESS = 'แก้ไขอาจารย์สำเร็จ';
  const DELETE_TEACHER_ERROR = 'ลบอาจารย์ไม่สำเร็จ';
  const DELETE_TEACHER_SUCCESS = 'ลบอาจารย์สำเร็จ';

    //TermOfYear
    const CREATE_TERM_OF_YEAR_SUCCESS = 'เพิ่มปีการศึกษาสำเร็จ';
    const CREATE_TERM_OF_YEAR_ERROR = 'เพิ่มปีการศึกษาไม่สำเร็จ';
    const TERM_OF_YEAR_NOT_FOUND = 'ไม่พบปีการศึกษา';
    const UPDATE_TERM_OF_YEAR_ERROR = 'แก้ไขปีการศึกษาไม่สำเร็จ';
    const UPDATE_TERM_OF_YEAR_SUCCESS = 'แก้ไขปีการศึกษาสำเร็จ';
    const DELETE_TERM_OF_YEAR_ERROR = 'ลบปีการศึกษาไม่สำเร็จ';
    const DELETE_TERM_OF_YEAR_SUCCESS = 'ลบปีการศึกษาสำเร็จ';

  //User
  const CREATE_USER_SUCCESS = 'เพิ่มบัญชีผู้ใช้สำเร็จ';
  const CREATE_USER_ERROR = 'เพิ่มบัญชีผู้ใช้ไม่สำเร็จ';
  const USER_NOT_FOUND = 'ไม่พบบัญชีผู้ใช้';
  const UPDATE_USER_ERROR = 'แก้ไขบัญชีผู้ใช้ไม่สำเร็จ';
  const UPDATE_USER_SUCCESS = 'แก้ไขบัญชีผู้ใช้สำเร็จ';
  const DELETE_USER_ERROR = 'ลบบัญชีผู้ใช้ไม่สำเร็จ';
  const DELETE_USER_SUCCESS = 'ลบบัญชีผู้ใช้สำเร็จ';
  const PASSWORD_USER_INVARID = 'รหัสผ่านเดิมไม่ถูกต้อง';
  const UPDATE_PASSWORD_ERROR = 'เปลี่ยนรหัสผ่านไม่สำเร็จ';
  const UPDATE_PASSWORD_SUCCESS = 'เปลี่ยนรหัสผ่านสำเร็จ';
  const RESET_PASSWORD_ERROR = 'รีเซ็ทรหัสผ่านไม่สำเร็จ';
  const RESET_PASSWORD_SUCCESS = 'รีเซ็ทรหัสผ่านสำเร็จ';
  //ScheduleTeach
  const CREATE_SCHEDULE_TEACH_SUCCESS = 'เพิ่มตารางสอนสำเร็จ';
  const CREATE_SCHEDULE_TEACH_ERROR = 'เพิ่มตารางสอนไม่สำเร็จ';
  const SCHEDULE_TEACH_NOT_FOUND = 'ไม่พบตารางสอน';
  const SCHEDULE_TEACH_UPDATE_FAILED = 'แก้ไขตารางสอนไม่สำเร็จ';
  const UPDATE_SCHEDULE_TEACH_SUCCESS = 'แก้ไขตารางสอนสำเร็จ';
  const DELETE_SCHEDULE_TEACH_SUCCESS = 'ลบตารางสอนสำเร็จ';
  const DELETE_SCHEDULE_TEACH_FAILED = 'ลบตารางสอนไม่สำเร็จ';
}
