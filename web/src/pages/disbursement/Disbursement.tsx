import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { FaRegFilePdf } from 'react-icons/fa';
import PopupAlert from '../../components/popupAlert/Popup-Alert';
import PopupConfirm from '../../components/popupConfirm/Popup-Confirm';
import appConfig from '../../config/application-config.json';
import { IProfessor } from '../../interface/Professor-interface';
import { getTermOfYear } from '../../services/Criteria-service';
import {
    addDisbursement,
    getDataDisbursementByTeacherIDAndTermID,
    getPdf,
    getTeacherListByTermID,
    updateDisbursement,
    updateStatus,
} from '../../services/Disburse-service';
import { getScheduleByTermIdAndTeacherId } from '../../services/Schedule-service';
import { getRateByTeacherId } from '../../services/Teacher-service';
import { getDataProfessor, getRoleUser, isNullOrUndefined, toMoneyFormat } from '../../util/Util';

interface DropdownTerm {
    term_of_year_id: string;
    term: string;
}

interface Professor {
    disbursement_id: number;
    teacher_id: string;
    term_of_year_id: number;
    sum_yes_unit: number;
    sum_no_unit: number;
    total: number;
    status: string;
    pdf_path: string;
    created_at: string;
    teacher: {
        teacher_id: string;
        prefix: string;
        fullname: string;
    };
}

interface Form {
    term: DropdownTerm | null;
    professor: Professor | null;
}

interface Teacher {
    teacher_id: string;
    prefix: string;
    fullname: string;
}

interface Subject {
    subject_id: string;
    course_of_study_id: number | null;
    name: string;
    unit: number;
    type: string;
    is_internal: number;
}

interface Level {
    level_id: number | null;
    name: string;
}

interface TermOfYear {
    term_of_year_id: number;
    term: string;
}

interface CriteriaOfTeach {
    criteria_of_teach_id: number;
    course_of_study_id: number;
    level_id: number;
    teaching_rates: number;
    rate_unit: number | string;
}

interface CourseOfStudy {
    course_of_study_id: number;
    department_id: number;
    degree_id: number;
    name: string;
}

export interface ScheduleTeach {
    schedule_teach_id: number;
    teacher_id: string;
    subject_id: string;
    level_id: number | null;
    term_of_year_id: number;
    section: number;
    course_code: string;
    teach_date: string;
    total_seat: number;
    enroll_seat: number;
    major_name: string;
    teacher: Teacher;
    subject: Subject;
    level: Level | null;
    term_of_year: TermOfYear;
    criteria_of_teach: CriteriaOfTeach | null;
    course_of_study: CourseOfStudy | null;
    teacher_no: string; // จำนวนผู้สอน
    teacher_unit: string; // หน่วยกิตที่สอน
    accept_disburse: string; // เบิกได้
    reject_disburse: string; // เบิกไม่ได้
    faculty_disburse: string; // เบิกไม่ได้
    isEdit: boolean; // เปิด input
}

interface ScheduleTeachData {
    schedule_teach_id: number;
    teacher_id: string;
    subject_id: string;
    level_id: number;
    term_of_year_id: number;
    section: number;
    course_code: string;
    teach_date: string;
    total_seat: number;
    enroll_seat: number;
    major_name: string;
    pivot: {
        disbursement_id: number;
        schedule_teach_id: number;
        count_of_teach: number;
        unit: string;
        unit_yes: string;
        unit_no: string;
        rate_of_unit: string;
        total: string;
        note: string;
    };
    subject: Subject;
}

interface DisburseScheduleTeach {
    teacher_id: string;
    term_of_year_id: number;
    disbursement_id: number;
    sum_yes_unit: string | number;
    sum_no_unit: string | number;
    total: string | number;
    status: string;
    pdf_path: string;
    created_at: string;
    data: ScheduleTeachData[];
}

interface ManagementPosition {
    m_id: number;
    criteria_of_process_id: number;
    name: string;
}

interface CriteriaOfProcess {
    criteria_of_process_id: number;
    name: string;
    min_unit: number;
    max_unit: number;
}

interface TeacherRate {
    teacher_id: string;
    prefix: string;
    fullname: string;
    management_position: ManagementPosition;
    criteria_of_process: CriteriaOfProcess;
}

const DisbursementPage = () => {
    const [termOfYear, setTermOfYear] = useState<DropdownTerm[]>([]);
    const [professorList, setProfessorList] = useState<Professor[]>([]);
    const [form, setForm] = useState<Form>({
        term: null,
        professor: null,
    });
    const [dataSchedule, setDataSchedule] = useState<ScheduleTeach[]>([]);
    const [sumFacultyDisburse, setSumFacultyDisburse] = useState<string>('');
    const [sumAcceptDisburse, setSumAcceptDisburse] = useState<string>('');
    const [sumRejectDisburse, setSumRejectDisburse] = useState<string>('');
    const [isOpenPopupConfirm, setIsOpenPopupConfirm] = useState<boolean>(false);
    const [messagePopupConfirm, setMessagePopupConfirm] = useState<React.ReactNode>('');
    const [disburseScheduleData, setDisburseScheduleData] = useState<DisburseScheduleTeach | null>(
        null
    );
    const startPage = useRef(false);
    const [teacherRate, setTeacherRate] = useState<TeacherRate>();
    const [status, setStatus] = useState<string>('');

    const [adminStatusBtn, setAdminStatusBtn] = useState<string>('');

    const [textRateUnits, setTextRateUnits] = useState<{
        [key: number]: {
            days: string;
            errorsDays: boolean;
            hours: string;
            errorsHours: boolean;
            weeks: string;
            errorsWeeks: boolean;
        };
    }>({});

    const [errors, setErrors] = useState<{
        [key: number]: { teacher_no: boolean; teacher_unit: boolean };
    }>({});

    const fetchTeacherListByTerm = async (param: any) => {
        try {
            const response = await getTeacherListByTermID(param);
            if (response && response.message === 'success') {
                if (!isNullOrUndefined(response.payload)) {
                    setProfessorList(response.payload);
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const handleChangeTerm = (opt: DropdownTerm | null) => {
        setForm((prev) => ({
            ...prev,
            term: opt,
        }));
        if (opt && getRoleUser() === appConfig.role.ADMIN) {
            fetchTeacherListByTerm(opt.term_of_year_id);
        } else {
            if (getRoleUser() === appConfig.role.ADMIN) {
                setForm((prev) => ({
                    ...prev,
                    professor: null,
                }));
            }
            setDataSchedule([]);
            setDisburseScheduleData(null);
            setStatus('');
        }
    };

    const handleAutocompleteChange = (opt: Professor | null) => {
        setForm((prev) => ({
            ...prev,
            professor: opt,
        }));
    };

    const fetchTerm = async () => {
        try {
            const response = await getTermOfYear();
            if (response && response.message === 'success') {
                setTermOfYear(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const fetchRate = async (teacher_id: string) => {
        try {
            const response = await getRateByTeacherId(teacher_id);
            if (response && response.message === 'success') {
                setTeacherRate(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (!startPage.current) {
            fetchTerm();
            if (getRoleUser() === appConfig.role.USER) {
                const data = getDataProfessor();
                if (data) {
                    const professorData: IProfessor = JSON.parse(data);
                    setForm((prev) => ({
                        ...prev,
                        professor: {
                            disbursement_id: 0,
                            teacher_id: professorData.teacher_id,
                            term_of_year_id: 0,
                            sum_yes_unit: 0,
                            sum_no_unit: 0,
                            total: 0,
                            status: '',
                            pdf_path: '',
                            created_at: '',
                            teacher: {
                                teacher_id: professorData.teacher_id,
                                prefix: professorData.prefix,
                                fullname: professorData.fullname,
                            },
                        },
                    }));
                    fetchRate(professorData.teacher_id);
                    // fetchGetScheduleDisburse(professorData.teacher_id);
                }
            }
            startPage.current = true;
        }
    }, []);

    const fetchScheduleByTermIdAndTeacherId = async () => {
        let payload = {
            termId: form.term?.term_of_year_id,
            teacherID: form.professor?.teacher_id,
        };
        const response = await getScheduleByTermIdAndTeacherId(payload);
        if (response && response.message === 'success') {
            if (!isNullOrUndefined(response.payload)) {
                const mapData = response.payload.map((item: any) => {
                    return {
                        ...item,
                        teacher_no: '',
                        teacher_unit: '',
                        accept_disburse: '',
                        reject_disburse: '',
                        faculty_disburse: '',
                        isEdit: false,
                    };
                });
                setDataSchedule(mapData);
            }
        }
    };

    const fetchScheduleByUser = async () => {
        const responseDisburse: DisburseScheduleTeach | null = await fetchScheduleDisburse();
        if (responseDisburse) {
            const data = getDataProfessor();
            if (data) {
                const professorData: IProfessor = JSON.parse(data);
                setForm((prev) => ({
                    ...prev,
                    professor: {
                        disbursement_id: responseDisburse.disbursement_id,
                        teacher_id: responseDisburse.teacher_id,
                        term_of_year_id: responseDisburse.term_of_year_id,
                        sum_yes_unit: Number(responseDisburse.sum_yes_unit),
                        sum_no_unit: Number(responseDisburse.sum_no_unit),
                        total: Number(responseDisburse.total),
                        status: responseDisburse.status,
                        pdf_path: responseDisburse.pdf_path,
                        created_at: responseDisburse.created_at,
                        teacher: {
                            teacher_id: professorData.teacher_id,
                            prefix: professorData.prefix,
                            fullname: professorData.fullname,
                        },
                    },
                }));
                setStatus(responseDisburse.status);
                if (responseDisburse.status === 'reject') {
                    setMessagePopupAlert('รายการเบิกค่าสอนถูกปฏิเสธ กรุณาทำรายการใหม่');
                    setIsOpenPopupAlert(true);
                    fetchScheduleByTermIdAndTeacherId();
                }
            }
        } else {
            setStatus('new');
            fetchScheduleByTermIdAndTeacherId();
        }
    };

    const handleEdit = (id: number, field: string, value: string) => {
        const updatedRows = dataSchedule.map((row) =>
            row.schedule_teach_id === id ? { ...row, [field]: value } : row
        );
        // อัปเดตข้อมูลก่อน แล้วค่อยคำนวณ faculty_disburse
        setDataSchedule(updatedRows);
        if (!['major_name'].includes(field)) {
            // เรียกใช้เพื่อคำนวณค่า faculty_disburse หลังจากการอัปเดต field
            handleSetDisburseFaculty(id);
            if (['teacher_no', 'teacher_unit'].includes(field)) {
                validateRow(id, updatedRows);
            }
        }
    };

    const summaryList = (data: ScheduleTeach[], field: keyof ScheduleTeach): number => {
        return data.reduce((sum, item) => {
            const value = Number(item[field]);
            return sum + value;
        }, 0);
    };

    const handleSetDisburseFaculty = (id: number) => {
        setDataSchedule((prevRows) => {
            const mapData = prevRows.map((row) =>
                row.schedule_teach_id === id
                    ? { ...row, faculty_disburse: row.isEdit ? '' : calDisburseFaculty(row) }
                    : row
            );
            const totalAcceptDisburse = summaryList(mapData, 'accept_disburse');
            setSumAcceptDisburse(totalAcceptDisburse.toString());

            const totalRejectDisburse = summaryList(mapData, 'reject_disburse');
            setSumRejectDisburse(totalRejectDisburse.toString());

            const totalFacultyDisburse = summaryList(mapData, 'faculty_disburse');
            setSumFacultyDisburse(totalFacultyDisburse.toString());
            return mapData;
        });
    };

    const calDisburseFaculty = (scheduleItem: ScheduleTeach) => {
        if (!isNullOrUndefined(scheduleItem.accept_disburse) && scheduleItem.criteria_of_teach) {
            const acceptValue = Number(scheduleItem.accept_disburse);
            const enrollSeat = Number(scheduleItem.enroll_seat);
            const rateUnit = Number(scheduleItem.criteria_of_teach.rate_unit);
            const result = (acceptValue * enrollSeat * rateUnit).toString();
            return result;
        }
        return '';
    };

    const onClickEditRate = (id: number) => {
        setTextRateUnits((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                days: '',
                errorsDays: false,
                hours: '',
                errorsHours: false,
                weeks: '',
                errorsWeeks: false,
            },
        }));
        const updatedRows = dataSchedule.map((row) =>
            row.schedule_teach_id === id
                ? {
                      ...row,
                      isEdit: !row.isEdit,
                      faculty_disburse: !row.isEdit ? '' : calDisburseFaculty(row),
                  }
                : row
        );
        setDataSchedule(updatedRows);
        const totalFacultyDisburse = summaryList(updatedRows, 'faculty_disburse');
        setSumFacultyDisburse(totalFacultyDisburse.toString());
    };

    const onClickSubmitDisburse = () => {
        validateUserSubmit();
    };

    const [isOpenPopupAlert, setIsOpenPopupAlert] = useState<boolean>(false);
    const [messagePopupAlert, setMessagePopupAlert] = useState<string>('');
    const [typePopupAlert, setTypePopupAlert] = useState<'ERROR' | 'SUCCESS' | 'WARNING'>(
        'WARNING'
    );

    const validateUserSubmit = () => {
        let hasError = false;
        const newErrors: typeof errors = {};
        let checkError = true;
        dataSchedule.forEach((row) => {
            const teacherNoError = row.teacher_no === '' || isNaN(Number(row.teacher_no));
            const teacherUnitError =
                row.teacher_unit === '' || Number(row.teacher_unit) > Number(row.subject.unit);
            if (teacherNoError || teacherUnitError) {
                hasError = true;
            }
            newErrors[row.schedule_teach_id] = {
                teacher_no: teacherNoError,
                teacher_unit: teacherUnitError,
            };
            if (row.isEdit) {
                const hasDays = Boolean(textRateUnits[row.schedule_teach_id]?.days);
                const hasHours = Boolean(textRateUnits[row.schedule_teach_id]?.hours);
                const hasWeeks = Boolean(textRateUnits[row.schedule_teach_id]?.weeks);
                checkError = hasDays && hasHours && hasWeeks;
                setTextRateUnits((prev) => ({
                    ...prev,
                    [row.schedule_teach_id]: {
                        ...prev[row.schedule_teach_id],
                        errorsDays: !hasDays,
                        errorsHours: !hasHours,
                        errorsWeeks: !hasWeeks,
                    },
                }));
            }
        });
        setErrors(newErrors);
        if (!checkError) {
            setTypePopupAlert('WARNING');
            setIsOpenPopupAlert(true);
            setMessagePopupAlert('กรุณาระบุข้อมูลให้ครบถ้วน');
            return;
        }

        let checkFieldDisburse = {
            isPass: false,
            message: '',
        };
        dataSchedule.forEach((row) => {
            if (!checkFieldDisburse.isPass) {
                if (row.reject_disburse || row.accept_disburse) {
                    const sumDisburse = Number(row.accept_disburse) + Number(row.reject_disburse);
                    if (sumDisburse > Number(row.teacher_unit)) {
                        checkFieldDisburse.isPass = true;
                        checkFieldDisburse.message = row.course_code;
                    }
                }
            }
        });

        if (checkFieldDisburse.isPass) {
            setTypePopupAlert('WARNING');
            setIsOpenPopupAlert(true);
            setMessagePopupAlert(`กรุณาระบุข้อมูลการเบิก ${checkFieldDisburse.message} ให้ถูกต้อง`);
            return;
        }

        if (teacherRate && sumAcceptDisburse && sumRejectDisburse) {
            const checkSumDisburse =
                Number(sumAcceptDisburse) > teacherRate.criteria_of_process.min_unit &&
                Number(sumAcceptDisburse) < teacherRate.criteria_of_process.max_unit;
            if (!checkSumDisburse) {
                setTypePopupAlert('WARNING');
                setIsOpenPopupAlert(true);
                setMessagePopupAlert(
                    `กรุณาระบุหน่วยกิตระหว่าง ${teacherRate.criteria_of_process.min_unit} ถึง ${teacherRate.criteria_of_process.max_unit}`
                );
                return;
            }
        }
        if (!hasError) {
            console.log('Form submitted!');
            setMessagePopupConfirm('ต้องการยืนยันส่งข้อมูลเบิกค่าสอน ?');
            setIsOpenPopupConfirm(true);
        }
    };

    const onConfirmSubmit = async () => {
        if (getRoleUser() === appConfig.role.ADMIN) {
            let payload = {
                status: adminStatusBtn === 'REJECT' ? 'reject' : 'accept',
            };
            const response = await updateStatus(form.professor?.disbursement_id, payload);
            if (response && response.message === 'success') {
                onClosePopupConfirm();
                setTypePopupAlert('SUCCESS');
                setIsOpenPopupAlert(true);
                setMessagePopupAlert('ให้ผลรายการขอเบิกค่าสอนสำเร็จ');
                fetchTeacherListByTerm(form.term?.term_of_year_id);
                fetchScheduleDisburse();
            }
        } else {
            const mapPayload = {
                teacher_id: form.professor?.teacher_id,
                term_of_year_id: form.term?.term_of_year_id,
                sum_yes_unit: sumAcceptDisburse,
                sum_no_unit: sumRejectDisburse,
                total: sumFacultyDisburse,
                status: 'pending',
                data: dataSchedule.map((item) => {
                    return {
                        schedule_teach_id: item.schedule_teach_id,
                        count_of_teach: item.teacher_no,
                        unit: item.teacher_unit,
                        unit_yes: item.accept_disburse,
                        unit_no: item.reject_disburse,
                        rate_of_unit: item.isEdit
                            ? `${textRateUnits[item.schedule_teach_id]?.days}วัน*${
                                  textRateUnits[item.schedule_teach_id]?.hours
                              }ชม/${textRateUnits[item.schedule_teach_id]?.weeks}สัปดาห์`
                            : item.criteria_of_teach
                            ? item.criteria_of_teach.rate_unit
                            : '',
                        total: item.faculty_disburse,
                        note: item.major_name,
                    };
                }),
            };
            setIsOpenPopupConfirm(false);
            const response =
                status === 'reject'
                    ? await updateDisbursement(form.professor?.disbursement_id, mapPayload)
                    : await addDisbursement(mapPayload);
            // const response = await updateDisbursement(mapPayload);
            if (response && response.message === 'success') {
                setDataSchedule([]);
                setTypePopupAlert('SUCCESS');
                setIsOpenPopupAlert(true);
                setMessagePopupAlert('ส่งรายการขอเบิกค่าสอนสำเร็จ');
                fetchScheduleByUser();
            }
        }
    };

    const fetchScheduleDisburse = async () => {
        let payload = {
            termId: form.term?.term_of_year_id,
            teacherID: form.professor?.teacher_id,
        };
        const response = await getDataDisbursementByTeacherIDAndTermID(payload);
        if (response && response.message === 'success' && response.payload) {
            setDisburseScheduleData(response.payload);
            return response.payload;
        }
        return null;
    };

    const onClickApprove = () => {
        setAdminStatusBtn('APPROVE');
        setMessagePopupConfirm('อนุมัติการเบิกค่าสอน ?');
        setIsOpenPopupConfirm(true);
    };

    const onClickReject = () => {
        setAdminStatusBtn('REJECT');
        setMessagePopupConfirm(
            <>
                {`ปฏิเสธการเบิกค่าสอน`}
                <br />
                {`กรุณาแจ้ง ${form.professor?.teacher.fullname} ดำเนินการต่อ`}
            </>
        );
        setIsOpenPopupConfirm(true);
    };

    const onClosePopupConfirm = () => {
        setIsOpenPopupConfirm(false);
        setMessagePopupConfirm('');
    };

    const isAcceptDisburseError = (value: ScheduleTeach) => {
        const sumDisburse = Number(value.accept_disburse) + Number(value.reject_disburse || 0);
        return value.accept_disburse !== '' && sumDisburse > Number(value.subject.unit);
    };

    const isRejectDisburseError = (value: ScheduleTeach) => {
        const sumDisburse = Number(value.accept_disburse || 0) + Number(value.reject_disburse);
        return value.reject_disburse !== '' && sumDisburse > Number(value.subject.unit);
    };

    const validateRow = (schedule_teach_id: number, data: ScheduleTeach[]) => {
        const row = data.find((r) => r.schedule_teach_id === schedule_teach_id);
        if (!row) return;
        const newErrors = { ...errors };
        const teacherNoError = row.teacher_no === '' || isNaN(Number(row.teacher_no));
        const teacherUnitError =
            row.teacher_unit === '' || Number(row.teacher_unit) > Number(row.subject.unit);
        newErrors[schedule_teach_id] = {
            teacher_no: teacherNoError,
            teacher_unit: teacherUnitError,
        };
        setErrors(newErrors);
    };

    const onClosePopupAlert = () => {
        setIsOpenPopupAlert(false);
        setMessagePopupAlert('');
        setTypePopupAlert('WARNING');
    };

    const handleInputChange = (id: number, field: string, value: string) => {
        setTextRateUnits((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
                [`errors${field.charAt(0).toUpperCase() + field.slice(1)}`]: !value,
            },
        }));
    };

    const onClickViewPdf = () => {
        const baseUrl = `${window.location.origin}`;
        const path = `/viewpdf/${form.professor?.pdf_path}`;
        const url = `${baseUrl}${path}`;
        window.open(url, '_blank');
    };

    const onClickDownloadPdf = async () => {
        try {
            const fileName = form.professor ? form.professor.pdf_path : '';
            let payload = {
                pdf_path: fileName,
            };
            const response = await getPdf(payload);
            if (response && response.message === 'success' && response.payload?.base64) {
                const base64 = response.payload.base64;
                const byteCharacters = atob(base64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderTableSchedule = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" rowSpan={2}>
                                รหัสวิชา
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                รายวิชา
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                หน่วยกิต
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                กลุ่ม
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                จำนวนนิสิตลงทะเบียน
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                ผู้สอน (คน)
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                จำนวนหน่วยกิตที่สอนจริง
                            </TableCell>
                            {/* กลุ่มคอลัมน์สำหรับ "เบิก" */}
                            <TableCell align="center" colSpan={2}>
                                เบิก
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                เวลาเรียน
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                จำนวนนิสิตจ่ายเงิน
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                อัตราต่อหัว/นก.
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                เบิกศึกษาทั่วไป
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                เบิกคณะ
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                หมายเหตุ
                            </TableCell>
                        </TableRow>
                        {/* แถวสำหรับคอลัมน์ "ได้" และ "ไม่ได้" */}
                        <TableRow>
                            <TableCell align="center">ได้</TableCell>
                            <TableCell align="center">ไม่ได้</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSchedule.map((row) => (
                            <TableRow key={row.schedule_teach_id}>
                                {/* รหัสวิชา */}
                                <TableCell align="center" sx={{ minWidth: '150px' }}>
                                    {row.subject.subject_id}
                                </TableCell>
                                {/* รายวิชา */}
                                <TableCell align="left" sx={{ minWidth: '300px', padding: 1 }}>
                                    {row.subject.name}
                                </TableCell>
                                {/* หน่วยกิต */}
                                <TableCell align="center" sx={{ minWidth: '110px' }}>
                                    {`${row.subject.unit}${row.subject.type}`}
                                </TableCell>
                                {/* กลุ่ม */}
                                <TableCell align="center" sx={{ minWidth: '100px' }}>
                                    {row.section}
                                </TableCell>
                                {/* จำนวนนิสิตลงทะเบียน */}
                                <TableCell align="center" sx={{ minWidth: '180px' }}>
                                    {row.enroll_seat}
                                </TableCell>
                                {/* ผู้สอน (คน) */}
                                <TableCell align="center" sx={{ minWidth: '120px', padding: 1 }}>
                                    <TextField
                                        size="small"
                                        value={row.teacher_no}
                                        onChange={(e) =>
                                            handleEdit(
                                                row.schedule_teach_id,
                                                'teacher_no',
                                                e.target.value
                                            )
                                        }
                                        inputProps={{
                                            style: { textAlign: 'center' },
                                            onInput: (event: any) => {
                                                event.target.value = event.target.value.replace(
                                                    /[^0-9]/g,
                                                    ''
                                                );
                                            },
                                        }}
                                        error={errors[row.schedule_teach_id]?.teacher_no}
                                    />
                                </TableCell>
                                {/* จำนวนหน่วยกิตที่สอนจริง */}
                                <TableCell align="center" sx={{ minWidth: '140px', padding: 1 }}>
                                    <TextField
                                        size="small"
                                        value={row.teacher_unit}
                                        onChange={(e) =>
                                            handleEdit(
                                                row.schedule_teach_id,
                                                'teacher_unit',
                                                e.target.value
                                            )
                                        }
                                        inputProps={{
                                            style: { textAlign: 'center' },
                                            onInput: (event: any) => {
                                                event.target.value = event.target.value.replace(
                                                    /[^0-9.]/g,
                                                    ''
                                                );
                                            },
                                        }}
                                        error={errors[row.schedule_teach_id]?.teacher_unit}
                                        helperText={
                                            errors[row.schedule_teach_id]?.teacher_unit &&
                                            row.teacher_unit !== ''
                                                ? `ระบุค่าที่น้อยกว่าหรือเท่ากับ ${row.subject.unit}`
                                                : ''
                                        }
                                    />
                                </TableCell>
                                {/* เบิกได้ */}
                                <TableCell align="center" sx={{ minWidth: '80px', padding: 1 }}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={row.accept_disburse}
                                        onChange={(e) =>
                                            handleEdit(
                                                row.schedule_teach_id,
                                                'accept_disburse',
                                                e.target.value
                                            )
                                        }
                                        inputProps={{
                                            style: { textAlign: 'center' },
                                            onInput: (event: any) => {
                                                event.target.value = event.target.value.replace(
                                                    /[^0-9.]/g,
                                                    ''
                                                );
                                            },
                                        }}
                                        error={isAcceptDisburseError(row)}
                                    />
                                </TableCell>
                                {/* เบิกไม่ได้ */}
                                <TableCell align="center" sx={{ minWidth: '80px', padding: 1 }}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={row.reject_disburse}
                                        onChange={(e) =>
                                            handleEdit(
                                                row.schedule_teach_id,
                                                'reject_disburse',
                                                e.target.value
                                            )
                                        }
                                        inputProps={{
                                            style: { textAlign: 'center' },
                                            onInput: (event: any) => {
                                                event.target.value = event.target.value.replace(
                                                    /[^0-9.]/g,
                                                    ''
                                                );
                                            },
                                        }}
                                        error={isRejectDisburseError(row)}
                                    />
                                </TableCell>
                                {/* เวลาเรียน */}
                                <TableCell align="center" sx={{ minWidth: '120px', padding: 1 }}>
                                    {row.teach_date}
                                </TableCell>
                                {/* จำนวนนิสิตจ่ายเงิน */}
                                <TableCell align="center" sx={{ minWidth: '180px' }}>
                                    {row.enroll_seat}
                                </TableCell>
                                {/* อัตราต่อหัว/นก. */}
                                <TableCell
                                    align="center"
                                    sx={{ minWidth: !row.isEdit ? '150px' : '370px' }}
                                >
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs>
                                            {!row.isEdit ? (
                                                row.criteria_of_teach?.rate_unit || '-'
                                            ) : (
                                                <Box>
                                                    <Box display="flex" alignItems="center">
                                                        <TextField
                                                            size="small"
                                                            value={
                                                                textRateUnits[row.schedule_teach_id]
                                                                    ?.days || ''
                                                            }
                                                            error={
                                                                textRateUnits[row.schedule_teach_id]
                                                                    ?.errorsDays || false
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    row.schedule_teach_id,
                                                                    'days',
                                                                    e.target.value
                                                                )
                                                            }
                                                            inputProps={{
                                                                style: {
                                                                    textAlign: 'center',
                                                                },
                                                                maxLength: 3,
                                                            }}
                                                            placeholder="วัน"
                                                            style={{ width: '50px' }}
                                                        />
                                                        <Box mx={1}>วัน*</Box>

                                                        <TextField
                                                            size="small"
                                                            value={
                                                                textRateUnits[row.schedule_teach_id]
                                                                    ?.hours || ''
                                                            }
                                                            error={
                                                                textRateUnits[row.schedule_teach_id]
                                                                    ?.errorsHours || false
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    row.schedule_teach_id,
                                                                    'hours',
                                                                    e.target.value
                                                                )
                                                            }
                                                            inputProps={{
                                                                style: {
                                                                    textAlign: 'center',
                                                                },
                                                                maxLength: 3,
                                                            }}
                                                            placeholder="ชม"
                                                            style={{ width: '50px' }}
                                                        />
                                                        <Box mx={1}>ชม/</Box>
                                                        <TextField
                                                            size="small"
                                                            value={
                                                                textRateUnits[row.schedule_teach_id]
                                                                    ?.weeks || ''
                                                            }
                                                            error={
                                                                textRateUnits[row.schedule_teach_id]
                                                                    ?.errorsWeeks || false
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    row.schedule_teach_id,
                                                                    'weeks',
                                                                    e.target.value
                                                                )
                                                            }
                                                            inputProps={{
                                                                style: {
                                                                    textAlign: 'center',
                                                                },
                                                                maxLength: 3,
                                                            }}
                                                            placeholder="สัปดาห์"
                                                            style={{ width: '50px' }}
                                                        />
                                                        <Box ml={1}>สัปดาห์</Box>
                                                    </Box>
                                                </Box>
                                            )}
                                        </Grid>
                                        <Grid item xs>
                                            {row.criteria_of_teach && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        onClickEditRate(row.schedule_teach_id)
                                                    }
                                                >
                                                    {row.isEdit ? (
                                                        <CloseIcon fontSize="inherit" />
                                                    ) : (
                                                        <EditIcon fontSize="inherit" />
                                                    )}
                                                </IconButton>
                                            )}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                {/* เบิกศึกษาทั่วไป */}
                                <TableCell align="center" sx={{ minWidth: '200px' }}>
                                    {!row.course_of_study && (
                                        <CheckIcon sx={{ color: '#008000' }} />
                                    )}
                                </TableCell>
                                {/* เบิกคณะ */}
                                <TableCell align="center" sx={{ minWidth: '150px' }}>
                                    {toMoneyFormat(row.faculty_disburse)}
                                </TableCell>
                                {/* หมายเหตุ */}
                                <TableCell align="center" sx={{ minWidth: '200px', padding: 1 }}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={row.major_name}
                                        onChange={(e) =>
                                            handleEdit(
                                                row.schedule_teach_id,
                                                'major_name',
                                                e.target.value
                                            )
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                                <Typography variant="body1">รวม</Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                                {/* เบิกได้ */}
                                <Typography variant="body1">{sumAcceptDisburse}</Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                                {/* เบิกไม่ได้ */}
                                <Typography variant="body1">{sumRejectDisburse}</Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                                {/* เบิกคณะ */}
                                <Typography variant="body1">
                                    {toMoneyFormat(sumFacultyDisburse)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const renderTableDisbursement = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" rowSpan={2}>
                                รหัสวิชา
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                รายวิชา
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                หน่วยกิต
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                กลุ่ม
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                จำนวนนิสิตลงทะเบียน
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                ผู้สอน (คน)
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                จำนวนหน่วยกิตที่สอนจริง
                            </TableCell>
                            {/* กลุ่มคอลัมน์สำหรับ "เบิก" */}
                            <TableCell align="center" colSpan={2}>
                                เบิก
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                เวลาเรียน
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                จำนวนนิสิตจ่ายเงิน
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                อัตราต่อหัว/นก.
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                เบิกศึกษาทั่วไป
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                เบิกคณะ
                            </TableCell>
                            <TableCell align="center" rowSpan={2}>
                                หมายเหตุ
                            </TableCell>
                        </TableRow>
                        {/* แถวสำหรับคอลัมน์ "ได้" และ "ไม่ได้" */}
                        <TableRow>
                            <TableCell align="center">ได้</TableCell>
                            <TableCell align="center">ไม่ได้</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {disburseScheduleData?.data.map((row) => (
                            <TableRow key={row.schedule_teach_id}>
                                {/* รหัสวิชา */}
                                <TableCell align="center" sx={{ minWidth: '150px' }}>
                                    {row.subject.subject_id}
                                </TableCell>
                                {/* รายวิชา */}
                                <TableCell align="left" sx={{ minWidth: '300px', padding: 1 }}>
                                    {row.subject.name}
                                </TableCell>
                                {/* หน่วยกิต */}
                                <TableCell align="center" sx={{ minWidth: '110px' }}>
                                    {`${row.subject.unit}${row.subject.type}`}
                                </TableCell>
                                {/* กลุ่ม */}
                                <TableCell align="center" sx={{ minWidth: '100px' }}>
                                    {row.section}
                                </TableCell>
                                {/* จำนวนนิสิตลงทะเบียน */}
                                <TableCell align="center" sx={{ minWidth: '180px' }}>
                                    {row.enroll_seat}
                                </TableCell>
                                {/* ผู้สอน (คน) */}
                                <TableCell align="center" sx={{ minWidth: '120px', padding: 1 }}>
                                    {row.pivot.count_of_teach}
                                </TableCell>
                                {/* จำนวนหน่วยกิตที่สอนจริง */}
                                <TableCell align="center" sx={{ minWidth: '200px', padding: 1 }}>
                                    {row.pivot.unit}
                                </TableCell>
                                {/* เบิกได้ */}
                                <TableCell align="center" sx={{ minWidth: '100px' }}>
                                    {row.pivot.unit_yes}
                                </TableCell>
                                {/* เบิกไม่ได้ */}
                                <TableCell align="center" sx={{ minWidth: '100px' }}>
                                    {row.pivot.unit_no}
                                </TableCell>
                                {/* เวลาเรียน */}
                                <TableCell align="center" sx={{ minWidth: '100px' }}>
                                    {row.teach_date}
                                </TableCell>
                                {/* จำนวนนิสิตจ่ายเงิน */}
                                <TableCell align="center" sx={{ minWidth: '180px' }}>
                                    {row.enroll_seat}
                                </TableCell>
                                {/* อัตราต่อหัว/นก. */}
                                <TableCell align="center" sx={{ minWidth: '150px' }}>
                                    {row.pivot.rate_of_unit || '-'}
                                </TableCell>
                                {/* เบิกศึกษาทั่วไป */}
                                <TableCell align="center" sx={{ minWidth: '200px' }}>
                                    {!row.subject.course_of_study_id && (
                                        <CheckIcon sx={{ color: '#008000' }} />
                                    )}
                                </TableCell>
                                {/* เบิกคณะ */}
                                <TableCell align="center" sx={{ minWidth: '150px' }}>
                                    {!isNullOrUndefined(row.pivot.total) && row.pivot.total !== '-'
                                        ? toMoneyFormat(row.pivot.total)
                                        : '-'}
                                </TableCell>
                                {/* หมายเหตุ */}
                                <TableCell align="center" sx={{ minWidth: '200px' }}>
                                    {row.pivot.note}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                                รวม
                            </TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                                {/* เบิกได้ */}
                                {disburseScheduleData?.sum_yes_unit}
                            </TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                                {/* เบิกไม่ได้ */}
                                {disburseScheduleData?.sum_no_unit}
                            </TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}></TableCell>
                            <TableCell align="center" sx={{ border: 'none' }}>
                                {/* เบิกคณะ */}
                                {disburseScheduleData
                                    ? toMoneyFormat(disburseScheduleData.total.toString())
                                    : ''}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <div>
            <PopupAlert
                isOpen={isOpenPopupAlert}
                onClose={onClosePopupAlert}
                title={<div>{messagePopupAlert}</div>}
                type={typePopupAlert}
            />
            <PopupConfirm
                isOpen={isOpenPopupConfirm}
                onClose={onClosePopupConfirm}
                onConfirm={onConfirmSubmit}
                title={messagePopupConfirm}
            />
            <Box sx={{ height: '100%' }}>
                <Box>
                    <Typography textAlign="start" variant="h6" component="div">
                        เบิกค่าสอน
                    </Typography>
                    <Divider />
                </Box>
                {/* USER */}
                {getRoleUser() !== appConfig.role.ADMIN ? (
                    <div>
                        <Grid container spacing={2} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                            <Grid item xs={12} sm={10}>
                                <Autocomplete
                                    size="small"
                                    fullWidth
                                    options={termOfYear}
                                    getOptionLabel={(option) => option.term}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="ปีการศึกษา"
                                            variant="outlined"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option.term === value.term
                                    }
                                    value={form.term}
                                    onChange={(_e, option) => handleChangeTerm(option)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={isNullOrUndefined(form.term)}
                                    onClick={fetchScheduleByUser}
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                        {status && status !== 'new' && (
                            <Grid
                                container
                                spacing={2}
                                justifyContent={'center'}
                                sx={{ paddingTop: 2, paddingBottom: 2 }}
                            >
                                <Grid item xs={12} sm={12} xl={12}>
                                    {status === 'pending' && (
                                        <Typography variant="h6">{`สถานะ : รออนุมัติ`}</Typography>
                                    )}
                                    {status === 'reject' && (
                                        <Typography variant="h6">{`สถานะ : ปฏิเสธ`}</Typography>
                                    )}
                                    {status === 'accept' && (
                                        <Grid
                                            container
                                            item
                                            xs={12}
                                            sm={12}
                                            xl={12}
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Grid item xs>
                                                <Typography
                                                    variant="h6"
                                                    align="center"
                                                >{`สถานะ : อนุมัติ`}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={2} xl={1}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<RemoveRedEyeIcon />}
                                                    onClick={onClickViewPdf}
                                                >
                                                    ดู
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={2} xl={1}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<FaRegFilePdf />}
                                                    onClick={onClickDownloadPdf}
                                                >
                                                    ดาวน์โหลด
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        )}
                        {(!isNullOrUndefined(dataSchedule) || status === 'reject') && (
                            <>
                                {renderTableSchedule()}
                                <Grid
                                    container
                                    spacing={2}
                                    justifyContent={'center'}
                                    sx={{ paddingTop: 2, paddingBottom: 2 }}
                                >
                                    <Grid item xs={6} sm={3} xl={2}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            onClick={onClickSubmitDisburse}
                                        >
                                            ยืนยันการเบิกค่าสอน
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={3} xl={2}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            onClick={() => {
                                                setDataSchedule([]);
                                                setDisburseScheduleData(null);
                                                setStatus('');
                                            }}
                                        >
                                            ยกเลิก
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                        {!isNullOrUndefined(disburseScheduleData) &&
                            status &&
                            status !== 'new' &&
                            status !== 'reject' &&
                            renderTableDisbursement()}
                        {/* {!isNullOrUndefined(disburseScheduleData) &&
                            status &&
                            status === 'reject' &&
                            renderTableSchedule()} */}
                    </div>
                ) : (
                    <div>
                        <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            sx={{ paddingTop: 2, paddingBottom: 2 }}
                        >
                            <Grid item xs={12} sm={4}>
                                <Autocomplete
                                    size="small"
                                    fullWidth
                                    options={termOfYear}
                                    getOptionLabel={(option) => option.term}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="ปีการศึกษา"
                                            variant="outlined"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option.term === value.term
                                    }
                                    value={form.term}
                                    onChange={(_e, option) => handleChangeTerm(option)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    size="small"
                                    fullWidth
                                    options={professorList}
                                    getOptionLabel={(option) => option.teacher.fullname}
                                    renderInput={(params) => (
                                        <TextField {...params} label="อาจารย์" variant="outlined" />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option.teacher_id === value.teacher_id
                                    }
                                    value={form.professor}
                                    onChange={(_e, option) => handleAutocompleteChange(option)}
                                    disabled={!form.term}
                                    renderOption={(props, option) => {
                                        return (
                                            <li
                                                {...props}
                                                key={option.teacher_id}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                {option.teacher.fullname}
                                                {['pending', 'reject', 'accept'].includes(
                                                    option.status
                                                ) && (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        {option.status === 'accept' && (
                                                            <>
                                                                <CheckCircleOutlineIcon
                                                                    fontSize="small"
                                                                    sx={{
                                                                        color: '#008000',
                                                                    }}
                                                                />
                                                                <label
                                                                    style={{
                                                                        fontSize: 14,
                                                                        color: '#008000',
                                                                    }}
                                                                >
                                                                    อนุมัติแล้ว
                                                                </label>
                                                            </>
                                                        )}
                                                        {option.status === 'reject' && (
                                                            <>
                                                                <CloseIcon
                                                                    fontSize="small"
                                                                    sx={{
                                                                        color: '#ff0000',
                                                                    }}
                                                                />
                                                                <label
                                                                    style={{
                                                                        fontSize: 14,
                                                                        color: '#ff0000',
                                                                    }}
                                                                >
                                                                    ปฏิเสธ
                                                                </label>
                                                            </>
                                                        )}
                                                        {option.status === 'pending' && (
                                                            <>
                                                                <AccessTimeIcon
                                                                    fontSize="small"
                                                                    sx={{
                                                                        color: '#FF9800',
                                                                    }}
                                                                />
                                                                <label
                                                                    style={{
                                                                        fontSize: 14,
                                                                        color: '#FF9800',
                                                                    }}
                                                                >
                                                                    รออนุมัติ
                                                                </label>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={
                                        isNullOrUndefined(form.term) ||
                                        isNullOrUndefined(form.professor)
                                    }
                                    onClick={fetchScheduleDisburse}
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                        {disburseScheduleData &&
                            !isNullOrUndefined(disburseScheduleData.data) &&
                            renderTableDisbursement()}
                        {disburseScheduleData && disburseScheduleData.status === 'pending' && (
                            <Grid
                                container
                                spacing={2}
                                justifyContent={'center'}
                                sx={{ paddingTop: 2, paddingBottom: 2 }}
                            >
                                <Grid item xs={4} sm={4} xl={2}>
                                    <Button variant="contained" onClick={onClickApprove}>
                                        อนุมัติการขอเบิกค่าสอน
                                    </Button>
                                </Grid>
                                <Grid item xs={4} sm={4} xl={2}>
                                    <Button variant="contained" onClick={onClickReject}>
                                        ปฏิเสธการขอเบิกค่าสอน
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </div>
                )}
            </Box>
        </div>
    );
};

export default DisbursementPage;
