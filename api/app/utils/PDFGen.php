<?php

namespace App\Utils;

use TCPDF;

class PDFGen {

    private $pdf;
    protected string $pathFile;

    protected $data;

    public function __construct(string $pathFile, $data = null) {
        $this->pdf = new TCPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        $this->pdf->setPrintHeader(false);
        $this->pdf->AddPage();

        $this->pathFile = $pathFile;
        $this->data = $data;

    }
    public function createPDF() {

        $rootPath = __DIR__ . '/../../storage/pdfs/';
        $pdfPath = $rootPath.$this->pathFile;

        // Output the PDF and force download
        $this->pdf->Output($pdfPath , 'F');
    }

    public function updatePDF() {
        $termOfYear = "2/2566";
        $this->textHead($termOfYear);
        $this->textTeacherDetail();
        $this->bodyDetail();

        // Set font
        $this->pdf->SetFont('thsarabun', 'B', 30);

        // Add a page
        
        // Add a cell with some text
        // $this->pdf->Write(0, "ทดสอบ", '', 0, 'C', true, 0, false, false, 0);

        $rootPath = __DIR__ . '/../../storage/pdfs/';
        $pdfPath = $rootPath.$this->pathFile;

        // Output the PDF and force download
        $this->pdf->Output($pdfPath , 'F');
    }

    private function textHead($termOfYear){
        $this->pdf->SetFont('thsarabun_b', 'B', size: 14);
        $this->pdf->Write(0, "คณะศึกษาศาสตร์ มหาวิทยาลัยมหาสารคาม", '', 0, 'C', true, 0, false, false, 0);
        $this->pdf->Write(0, "ใบเบิกเงินค่าตอบแทนการสอน ประจำภาคเรียนที่ $termOfYear", '', 0, 'C', true, 0, false, false);
    }

    private function textTeacherDetail(){
        $this->pdf->SetFont('thsarabun_b', 'B', size: 14);
        $this->pdf->Write(0, "1. คำขอเบิก", '', 0, 'L', true, 0, false, false, 0);
        $this->pdf->Cell(93, 0, "ข้าพเจ้า         อ.ดร.นิตยา วรรณกิต", 1, 0, 'L');
        $this->pdf->Write(0, "ตำแหน่ง  คณบดีคณะ", '', 0, 'L', true, 0, false, false, 0);
        $this->pdf->Write(0, "สังกัด            คณะศึกษาศาสตร์ มหาวิทยาลัยมหาสารคาม ตำบลตลาด อำเภอเมือง จังหวัดมหาสารคาม 44000", '', 0, 'L', true, 0, false, false, 0);
        $this->pdf->Write(0, "ขอเบิกเงินค่าตอบแทนการสอน ( / ) อาจารย์ประจำ     (   ) อาจารย์พิเศษ", '', 0, 'L', true, 0, false, false, 0);
    }

    private function bodyDetail(){
        $this->pdf->SetFont('thsarabun_b', 'B', size: 14);
        $cellWidth = [20, 67, 15, 10, 10, 15, 10, 10, 10, 25, 20,15, 10, 20, 22];

        $mock = [
            [
                "course_id" => "0501702-10",
                "course_name" => "principles, theories and innovations in",
                "credit" => "3 (2-2-5)",
                "group" => "15",
                "level" => "1",
                "student" => "50",
                "teacher" => "2",
                "can_disburse" => "50",
                "cannot_disburse" => "0",
                "time" => "MON10:00-12:00",
                "rate" => "500",
                "pay" => "25000",
                "general" => "25000",
                "faculty" => "0",
                "note" => "ทดสอบ"
            ],
            [
                "course_id" => "0501908-3",
                "course_name" => "Seminar  on Research in Educational Admin",
                "credit" => "3 (2-2-5)",
                "group" => "16",
                "level" => "1",
                "student" => "50",
                "teacher" => "2",
                "can_disburse" => "50",
                "cannot_disburse" => "0",
                "time" => "MON10:00-12:00",
                "rate" => "500",
                "pay" => "25000",
                "general" => "25000",
                "faculty" => "0",
                "note" => "ทดสอบ"
            ],
            [
                "course_id" => "0560301-2",
                "course_name" => "Practicum 3",
                "credit" => "3 (2-2-5)",
                "group" => "17",
                "level" => "1",
                "student" => "50",
                "teacher" => "2",
                "can_disburse" => "50",
                "cannot_disburse" => "0",
                "time" => "MON10:00-12:00",
                "rate" => "500",
                "pay" => "25000",
                "general" => "25000",
                "faculty" => "0",
                "note" => "ทดสอบ"
            ],
            [
                "course_id" => "0501702-10",
                "course_name" => "principles, theories and innovations in",
                "credit" => "3 (2-2-5)",
                "group" => "15",
                "level" => "1",
                "student" => "50",
                "teacher" => "2",
                "can_disburse" => "50",
                "cannot_disburse" => "0",
                "time" => "MON10:00-12:00",
                "rate" => "500",
                "pay" => "25000",
                "general" => "25000",
                "faculty" => "0",
                "note" => "ทดสอบ"
            ],
            [
                "course_id" => "0501908-3",
                "course_name" => "Seminar  on Research in Educational Adm",
                "credit" => "3 (2-2-5)",
                "group" => "16",
                "level" => "1",
                "student" => "50",
                "teacher" => "2",
                "can_disburse" => "50",
                "cannot_disburse" => "0",
                "time" => "MON10:00-12:00",
                "rate" => "500",
                "pay" => "25000",
                "general" => "25000",
                "faculty" => "0",
                "note" => "ทดสอบ"
            ],
            [
                "course_id" => "0560301-2",
                "course_name" => "Practicum 3",
                "credit" => "3 (2-2-5)",
                "group" => "17",
                "level" => "1",
                "student" => "50",
                "teacher" => "2",
                "can_disburse" => "50",
                "cannot_disburse" => "0",
                "time" => "MON10:00-12:00",
                "rate" => "500",
                "pay" => "25000",
                "general" => "25000",
                "faculty" => "0",
                "note" => "ทดสอบ"
            ],
        ];

        $this->bodyHeader($cellWidth);
        

        foreach ($mock as $row) {
            $this->pdf->Cell($cellWidth[0], 4, $row['course_id'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[1], 4, $row['course_name'], 1, 0, 'L',);
            $this->pdf->Cell($cellWidth[2], 4, $row['credit'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[3], 4, $row['group'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[4], 4, $row['level'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[5], 4, $row['student'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[6], 4, $row['teacher'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[7], 4, $row['can_disburse'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[8], 4, $row['cannot_disburse'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[9], 4, $row['time'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[10], 4, $row['rate'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[11], 4, $row['pay'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[12], 4, $row['general'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[13], 4, $row['faculty'], 1, 0, 'L');
            $this->pdf->Cell($cellWidth[14], 4, $row['note'], 1, 0, 'L');
            $this->pdf->Ln();
        }

        $this->bodyFooter($cellWidth);

        $this->pdf->Cell($cellWidth[0], 4, "2. ใบรับเงิน", 0, 0, 'L');
        $this->pdf->Cell($cellWidth[1], 4, "เบิกจากคณะศึกษาศาสตร์", 0, 0, 'L',);
        $this->pdf->Cell(60, 4, "ข้าพเจ้าได้รับเงินจำนวน", 0, 0, 'L');
        $this->pdf->Cell(30, 4, "6,500.00  บาท", 0, 0, 'L');
        $this->pdf->Cell(60, 4, "หกพันห้าร้อยบาทถ้วน", 0, 0, 'L');
        $this->pdf->Cell(20, 4, "ไว้เรียบร้อยแล้ว", 0, 0, 'L');
        $this->pdf->Ln();
        $this->pdf->Ln();


        $this->pdf->MultiCell(87, 0, "ข้าพเจ้าขอรับรองว่าฐานวิชาคณะถูกต้องครบถ้วนและได้ ตรวจสอบละเอียดในใบเบิกนี้ถูกต้องครบถ้วนแล้วโดยจะไม่มีการแก้ไขเอกสารไม่ว่ากรณีใดเมื่อเบิกจ่ายเสร็จเรียบร้อยแล้ว\n\n\nลงชื่อ...............................................................ผู้รับเงิน\nอ.ดร.นิตยา วรรณกิต\nอาจารย์ผู้สอน/ผู้ขอเบิก", 1, 'J', false, 0);
        $this->pdf->MultiCell(50, 0, "ได้ตรวจสอบภาระงานสอน\nครบถ้วนเป็นไปตามประกาศที่\nมหาวิทยาลัยกำหนด\n\n\nลงชื่อ.......................................\n\nเจ้าหน้าที่การเงิน", 1, 'J', false, 0);
        $this->pdf->MultiCell(45, 0, "ขอรับรองว่าผู้เบิกส่งเกรดและ\nมคอ.5รายวิชาคณะฯครบ\n\n\n\nลงชื่อ.......................................\n\nฝ่ายวิชาการ", 1, 'J', false, 0);
        $this->pdf->MultiCell(47, 0, "รายวิชาข้างต้นถูกต้องตามที่ได้จัด\nการเรียนการสอน\n\n\n\nลงชื่อ.......................................\n\nรองคณบดี", 1, 'J', false, 0);
        $this->pdf->MultiCell(50, 0, "\n\n\n\nลงชื่อ.......................................\n\n\nคณบดี", 1, 'J', false, 0);




        // $this->pdf->Cell($cellWidth[0], 4, "รหัสวิชา", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[1], 4, "รายวิชา", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[2], 4, "หน่วยกิต", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[3], 4, "กลุ่ม", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[4], 4, "ระดับ", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[5], 4, "จำนวนนิสิตลงทะเบียน", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[6], 4, "ผู้สอน (คน)", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[7], 4, "เบิกได้", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[8], 4, "เบิกไม่ได้", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[9], 4, "เวลา", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[10], 4, "อัตรา(บาท)", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[11], 4, "จ่ายเงิน", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[12], 4, "ศึกษาทั่วไป", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[13], 4, "เบิกคณะ", 1, 0, 'L');
        // $this->pdf->Cell($cellWidth[14], 4, "หมายเหตุ", 1, 0, 'L');

    }

    private function bodyHeader($cellWidth){
        $this->pdf->SetFont('thsarabun_b', 'B', size: 14);
        $this->pdf->MultiCell($cellWidth[0], 0, "รหัสวิชา", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[1], 0, "รายวิชา", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[2], 0, "หน่วยกิต", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[3], 0, "กลุ่ม", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[4], 0, "ระดับ", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[5], 0, "จำนวนนิสิตลงทะเบียน", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[6], 0, "ผู้สอน (คน)", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[7], 0, "เบิกได้", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[8], 0, "เบิกไม่ได้", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[9], 0, "เวลา", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[10], 0, "อัตรา(บาท)", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[11], 0, "จ่ายเงิน", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[12], 0, "ศึกษาทั่วไป", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[13], 0, "เบิกคณะ", 1, 'J', false, 0);
        $this->pdf->MultiCell($cellWidth[14], 0, "หมายเหตุ", 1, 'J', false, 0);
        $this->pdf->Ln();
    }

    private function bodyFooter($cellWidth){
        $this->pdf->Cell($cellWidth[0], 4, "", 0, 0, 'L');
            $this->pdf->Cell($cellWidth[1], 4, "รวม", 1, 0, 'L',);
            $this->pdf->Cell($cellWidth[2], 4, "", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[3], 4, "", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[4], 4, "", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[5], 4, "", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[6], 4, "", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[7], 4, "7.00", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[8], 4, "6.25", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[9], 4, "", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[10], 4, "", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[11], 4, "", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[12], 4, "", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[13], 4, "6,5025.00", 1, 0, 'L');
            $this->pdf->Cell($cellWidth[14], 4, "", 1, 0, 'L');
            $this->pdf->Ln();
    }
}






