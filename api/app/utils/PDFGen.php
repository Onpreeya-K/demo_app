<?php

namespace App\Utils;

use TCPDF;
require 'BathText.php';

class PDFGen
{
    private TCPDF $pdf;
    protected string $pathFile;
    protected $data;

    public function __construct(string $pathFile, $data = null)
    {
        $this->pdf = new TCPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        $this->pdf->setPrintHeader(false);
        $this->pdf->AddPage();
        $this->pathFile = $pathFile;
        $this->data = $data;
    }

    public function createPDF()
    {
        $pdfPath = $this->getPDFPath();
        $this->pdf->Output($pdfPath, 'F');
    }

    public function updatePDF()
    {

        $this->pageNumber();
        $this->textHead($this->data['term_of_year']);
        $this->textTeacherDetail();
        $this->bodyDetail();
        $pdfPath = $this->getPDFPath();
        $this->pdf->Output($pdfPath, 'F');
    }

    private function textHead($termOfYear)
    {
        $this->pdf->SetFont('thsarabun_b', 'B', 14);
        $this->pdf->Write(h: 0, txt: "คณะศึกษาศาสตร์ มหาวิทยาลัยมหาสารคาม",align: 'C', ln: true);
        $this->pdf->Write(h: 0, txt: "ใบเบิกเงินค่าตอบแทนการสอน ประจำภาคเรียนที่ $termOfYear", align: 'C', ln: true);
    }

    private function textTeacherDetail()
    {
        $this->pdf->SetFont('thsarabun_b', 'B', 14);
        $this->pdf->Write(h: 0, txt: "1. คำขอเบิก",ln: true);
        $this->pdf->Cell(w: 93, h: 0, txt: "ข้าพเจ้า         " . $this->data['teacher_name']);
        $this->pdf->Cell(w: 50, h: 0, txt: "ตำแหน่ง  " . $this->data['academic_position']);
        $this->pdf->Cell(w: 80, h: 0, txt: "ตำแหน่ง  " . $this->data['management_position']);
        $this->pdf->Ln();
        $this->pdf->Write(h: 0, txt: "สังกัด            คณะศึกษาศาสตร์ มหาวิทยาลัยมหาสารคาม ตำบลตลาด อำเภอเมือง จังหวัดมหาสารคาม 44000",  ln: true, );
        $this->pdf->Write(h: 0, txt: "ขอเบิกเงินค่าตอบแทนการสอน (   ) อาจารย์ประจำ     (   ) อาจารย์พิเศษ", ln: true);
    }

    private function bodyDetail()
    {
        $this->pdf->SetFont('thsarabun_b', 'B', 14);
        $cellWidth = [20, 55, 20, 15, 15, 20, 13, 15, 15, 15, 15, 15, 12, 18, 18];


        $this->bodyHeader($cellWidth);

        $this->subjectDatail($this->data['data'], $cellWidth);
        
        $this->pdf->SetFont('thsarabun_b', 'B', 14);
        $this->bodyCalRate($cellWidth);

        if ($this->pdf->GetY() > 130) {
            $this->pdf->AddPage();
            $this->pageNumber();
            $this->pdf->SetFont('thsarabun_b', 'B', 14);
            $this->pdf->Ln();
        }

        $this->detailDisbursement($cellWidth);
        $this->detailSignature();
    }

    private function bodyHeader($cellWidth)
    {
        $this->pdf->SetFont('thsarabun_b', 'B', 14);
        $headers = [
            "รหัสวิชา", "รายวิชา", "หน่วยกิต", "กลุ่ม", "ระดับ", "จำนวนนิสิต\nลงทะเบียน",
            "ผู้สอน\n(คน)", "เบิก\nได้", "เบิก\nไม่ได้", "เวลา\nเรียน", "จำนวน นิสิต จ่ายเงิน", 
            "อัตราต่อ หัว/นก.", "เบิก ศึกษา ทั่วไป", "เบิกคณะฯ", "หมายเหตุ"
        ];

        foreach ($headers as $index => $header) {
            $this->pdf->MultiCell($cellWidth[$index], 15, $header, 1, 'C', false, 0, '', '', true, 0, false, true, 15, 'M', true);
        }
        $this->pdf->Ln();
    }

    private function bodyCalRate($cellWidth)
    {
        $this->pdf->Cell($cellWidth[0], 4, "", 0, 0, 'L');
        $this->pdf->Cell($cellWidth[1], 4, "รวม", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[2], 4, "", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[3], 4, "", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[4], 4, "", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[5], 4, "", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[6], 4, "", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[7], 4, $this->data['sum_yes_unit'], 1, 0, 'R');
        $this->pdf->Cell($cellWidth[8], 4, $this->data['sum_no_unit'], 1, 0, 'R');
        $this->pdf->Cell($cellWidth[9], 4, "", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[10], 4, "", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[11], 4, "", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[12], 4, "", 1, 0, 'L');
        $this->pdf->Cell($cellWidth[13], 4, $this->strToNumber($this->data['total']), 1, 0, 'R');
        $this->pdf->Cell($cellWidth[14], 4, "", 1, 0, 'L');
        $this->pdf->Ln();
    }

    private function detailDisbursement($cellWidth)
    {
        $this->pdf->Cell($cellWidth[0], 4, "2. ใบรับเงิน", 0, 0, 'L');
        $this->pdf->Cell($cellWidth[1], 4, "เบิกจากคณะศึกษาศาสตร์", 0, 0, 'L');
        $this->pdf->Cell(60, 4, "ข้าพเจ้าได้รับเงินจำนวน", 0, 0, 'L');
        $this->pdf->Cell(30, 4, $this->strToNumber($this->data['total']) ."  บาท", 0, 0, 'L');
        $this->pdf->Cell(80, 4, baht_text($this->data['total']), 0, 0, 'L');
        $this->pdf->Cell(20, 4, "ไว้เรียบร้อยแล้ว", 0, 0, 'L');
        $this->pdf->Ln();
        $this->pdf->Ln();
    }

    private function detailSignature()
    {
        $block1Text = 'ข้าพเจ้าขอรับรองว่าฐานวิชาคณะถูกต้องครบถ้วนและได้<br>ตรวจสอบละเอียดในใบเบิกนี้ถูกต้องครบถ้วนแล้วโดยจะ<br>ไม่มีการแก้ไขเอกสารไม่ว่ากรณีใดเมื่อเบิกจ่ายเสร็จ<br>เรียบร้อยแล้ว<br><br>   ลงชื่อ..........................................................ผู้รับเงิน<br>     <font face="thsarabun_b" size="14">' . $this->data['teacher_name'] . '</font><br>     อาจารย์ผู้สอน/ผู้ขอเบิก';
        
        $this->pdf->SetFont('thsarabun', 'B', 14);
        $this->pdf->writeHTMLCell(75, 0, '', '', $block1Text , 1, 0, false);
        $this->pdf->MultiCell(50, 0, "ได้ตรวจสอบภาระงานสอน\nครบถ้วนเป็นไปตามประกาศที่\nมหาวิทยาลัยกำหนด\n\n\n   ลงชื่อ.......................................\n\nเจ้าหน้าที่การเงิน", 1, 'J', false, 0);
        $this->pdf->MultiCell(47, 0, "ขอรับรองว่าผู้เบิกส่งเกรดและ\nมคอ.5รายวิชาคณะฯครบ\n\n\n\n  ลงชื่อ.......................................\n\nฝ่ายวิชาการ", 1, 'J', false, 0);
        $this->pdf->MultiCell(45, 0, "รายวิชาข้างต้นถูกต้องตามที่ได้จัด\nการเรียนการสอน\n\n\n\n ลงชื่อ.......................................\n\nรองคณบดี", 1, 'J', false, 0);
        $this->pdf->MultiCell(64, 0, "\n\n\n\n\n   ลงชื่อ.......................................ผู้อนุมัติ\n\nคณบดี", 1, 'J', false, 0);
    }



    private function subjectDatail($data, $cellWidth)
        {
            $this->pdf->SetFont('thsarabun', '', 14);
            foreach ($data as $row) {
                $credit = $row->subject->unit . ' '. $row->subject->type;
                $this->pdf->Cell($cellWidth[0], 6, $row->subject->subject_id, border: 1);
                $this->pdf->Cell($cellWidth[1], 6, $this->shortenText($row->subject->name, $cellWidth[1]), 1);
                $this->pdf->Cell(w: $cellWidth[2], h: 6, txt: $credit, border: 1, align: 'C');
                $this->pdf->Cell(w: $cellWidth[3], h: 6, txt: $row->section, border: 1, align: 'C');
                $this->pdf->Cell(w: $cellWidth[4], h: 6, txt: $row->level_id, border: 1, align: 'C');
                $this->pdf->Cell(w: $cellWidth[5], h: 6, txt: $row->enroll_seat, border: 1, align: 'C');
                $this->pdf->Cell(w: $cellWidth[6], h: 6, txt: $row->pivot->count_of_teach, border: 1, align: 'C');
                $this->pdf->Cell(w: $cellWidth[7], h: 6, txt: $this->validateText($row->pivot->unit_yes), border: 1, align: 'R');
                $this->pdf->Cell(w: $cellWidth[8], h: 6, txt: $this->validateText($row->pivot->unit_no), border: 1, align: 'R');
                $this->pdf->Cell(w: $cellWidth[9], h: 6, txt: $row->teach_date, border: 1, align: 'C');
                $this->pdf->Cell(w: $cellWidth[10], h: 6, txt: $row->enroll_seat, border: 1, align: 'R');

                if (strlen($row->pivot->rate_of_unit) > 3) {
                    $cellW = $cellWidth[11]+$cellWidth[12];

                    $this->pdf->Cell(w: $cellW, h: 6, txt: $row->pivot->rate_of_unit, border: 1, align: 'L', stretch: 1);
                } else{
                    $this->pdf->Cell(w: $cellWidth[11], h: 6, txt: $row->pivot->rate_of_unit, border: 1, align: 'R');
                    if ($row->subject->is_internal == 1){
                        $this->pdf->Cell(w: $cellWidth[12], h: 6, txt: '', border: 1, align: 'C');
                    } else {
                        $this->pdf->Cell(w: $cellWidth[12], h: 6, txt: '/', border: 1, align: 'C');
                    }
                    
                }

                $this->pdf->Cell(w: $cellWidth[13], h: 6, txt: $this->strToNumber($row->pivot->total), border: 1, align: 'R');
                $this->pdf->Cell(w: $cellWidth[14], h: 6, txt: $row->pivot->note, border: 1, align: 'C');
                $this->pdf->Ln();
            }
        }

    private function getPDFPath()
    {
        $rootPath = __DIR__ . '/../../storage/pdfs/';
        return $rootPath . $this->pathFile;
    }

    private function shortenText($text, $maxWidth)
    {
        $textWidth = $this->pdf->GetStringWidth($text);

        while ($textWidth > $maxWidth && strlen($text) > 0) {
            $text = substr($text, 0, -1);
            $textWidth = $this->pdf->GetStringWidth($text);
        }

        return $text;
    }

    private function validateText($text) {
        return $text === "0" ? "" : $text;
    }

    private function strToNumber($text) {
        if ($text === "-") {
            return $text;
        }
        return number_format((float)$text, 2, '.', ',');
    }
    private function pageNumber(){
        $this->pdf->SetXY(0,1);
        $this->pdf->SetFont('thsarabun', 'I', 10);
        $this->pdf->Cell(305, 10, $this->data['teacher_name']. ' หน้า  ' . $this->pdf->getAliasNumPage() . '/' . $this->pdf->getAliasNbPages(), 0, 0, 'R');
        $this->pdf->Ln();
    }
}
