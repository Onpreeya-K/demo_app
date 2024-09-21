<?php

namespace App\Utils;

use TCPDF;

class PDFGen {

    private $pdf;
    protected string $pathFile;

    public function __construct(string $pathFile){
        $this->pdf = new TCPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        $this->pdf->setPrintHeader(false);
        $this->pdf->AddPage();

        $this->pathFile = $pathFile;
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
        $this->pdf->Write(0, "ทดสอบ", '', 0, 'C', true, 0, false, false, 0);

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
        $this->pdf->Cell(93, 0, "ข้าพเจ้า         นางสาวนิตยา วรรณกิต", 1, 0, 'L');
        $this->pdf->Write(0, "ตำแหน่ง  คณบดีคณะ", '', 0, 'L', true, 0, false, false, 0);
        $this->pdf->Write(0, "สังกัด            คณะศึกษาศาสตร์ มหาวิทยาลัยมหาสารคาม ตำบลตลาด อำเภอเมือง จังหวัดมหาสารคาม 44000", '', 0, 'L', true, 0, false, false, 0);
        $this->pdf->Write(0, "ขอเบิกเงินค่าตอบแทนการสอน ( / ) อาจารย์ประจำ     (   ) อาจารย์พิเศษ", '', 0, 'L', true, 0, false, false, 0);
    }

    private function bodyDetail(){
        $this->pdf->SetFont('thsarabun_b', 'B', size: 14);

        // Header
        $w = [30, 50, 15, 10, 10, 15, 10, 10, 10, 25, 20,15, 10, 20, 20];
        $this->pdf->Cell($w[0], 4, "รหัสวิชา", 1, 0, 'L');
        $this->pdf->Cell($w[1], 4, "รายวิชา", 1, 0, 'L');
        $this->pdf->Cell($w[2], 4, "หน่วยกิต", 1, 0, 'L');
        $this->pdf->Cell($w[3], 4, "กลุ่ม", 1, 0, 'L');
        $this->pdf->Cell($w[4], 4, "ระดับ", 1, 0, 'L');
        $this->pdf->Cell($w[5], 4, "จำนวนนิสิตลงทะเบียน", 1, 0, 'L');
        $this->pdf->Cell($w[6], 4, "ผู้สอน (คน)", 1, 0, 'L');
        $this->pdf->Cell($w[7], 4, "เบิกได้", 1, 0, 'L');
        $this->pdf->Cell($w[8], 4, "เบิกไม่ได้", 1, 0, 'L');
        $this->pdf->Cell($w[9], 4, "เวลา", 1, 0, 'L');
        $this->pdf->Cell($w[10], 4, "อัตรา(บาท)", 1, 0, 'L');
        $this->pdf->Cell($w[11], 4, "จ่ายเงิน", 1, 0, 'L');
        $this->pdf->Cell($w[12], 4, "ศึกษาทั่วไป", 1, 0, 'L');
        $this->pdf->Cell($w[13], 4, "เบิกคณะ", 1, 0, 'L');
        $this->pdf->Cell($w[14], 4, "หมายเหตุ", 1, 0, 'L');
    }
}






