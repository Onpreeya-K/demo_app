import CheckIcon from '@mui/icons-material/Check';
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
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
import { useEffect, useState } from 'react';
import PopupConfirm from '../../components/popupConfirm/Popup-Confirm';
import appConfig from '../../config/application-config.json';
import { IProfessor } from '../../interface/Professor-interface';
import { getTeacherSchedule, getTermOfYear } from '../../services/Criteria-service';
import {
    addDisbursement,
    getDataDisbursementByTeacherIDAndTermID,
} from '../../services/Disburse-service';
import { getScheduleByTermIdAndTeacherId } from '../../services/Schedule-service';
import { getDataProfessor, getRoleUser, isNullOrUndefined, toMoneyFormat } from '../../util/Util';

interface DropdownTerm {
    term_of_year_id: string;
    term: string;
}

interface Professor {
    teacher_id: string;
    prefix: string;
    fullname: string;
    position: string;
    sub_position: string;
    has_schedule: boolean;
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
    rate_unit: number;
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
}

interface ScheduleTeachData {
    schedule_teach_id: number;
    count_of_teach: string;
    unit: string;
    unit_yes: string;
    unit_no: string;
    rate_of_unit: number | string;
    total: string;
    note: string;
    subject: Subject;
    section: number;
    enroll_seat: number;
}

interface DisburseScheduleTeach {
    teacher_id: string;
    term_of_year_id: number;
    sum_yes_unit: string;
    sum_no_unit: string;
    total: string;
    status: string;
    data: ScheduleTeachData[];
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
    const [disburseScheduleData, setDisburseScheduleData] = useState<DisburseScheduleTeach>();

    const fetchTeacherListByTerm = async (param: any) => {
        try {
            const response = await getTeacherSchedule(param);
            if (response && response.message === 'success') {
                if (!isNullOrUndefined(response.payload)) {
                    const professors = response.payload.filter(
                        (item: Professor) => item.has_schedule
                    );
                    console.log('professors :: ', professors);

                    setProfessorList(professors);
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

    useEffect(() => {
        fetchTerm();
        if (getRoleUser() === appConfig.role.USER) {
            const data = getDataProfessor();
            if (data) {
                const professorData: IProfessor = JSON.parse(data);
                setForm((prev) => ({
                    ...prev,
                    professor: {
                        teacher_id: professorData.teacher_id,
                        prefix: professorData.prefix,
                        fullname: professorData.fullname,
                        position: professorData.position,
                        sub_position: professorData.sub_position,
                        has_schedule: false,
                    },
                }));
            }
        }
    }, []);

    const onClickGetScheduleByUser = async () => {
        let payload = {
            termId: form.term?.term_of_year_id,
            teacherID: form.professor?.teacher_id,
        };
        const response = await getScheduleByTermIdAndTeacherId(payload);
        console.log('response :: ', response);
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
                    };
                });
                setDataSchedule(mapData);
            }
        }
    };

    const handleEdit = (id: number, field: string, value: string) => {
        const updatedRows = dataSchedule.map((row) =>
            row.schedule_teach_id === id ? { ...row, [field]: value } : row
        );
        // อัปเดตข้อมูลก่อน แล้วค่อยคำนวณ faculty_disburse
        setDataSchedule(updatedRows);
        // เรียกใช้เพื่อคำนวณค่า faculty_disburse หลังจากการอัปเดต field
        handleSetDisburseFaculty(id);
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
                    ? { ...row, faculty_disburse: calDisburseFaculty(row) }
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

    const onClickSubmitDisburse = () => {
        setMessagePopupConfirm('ต้องการยืนยันส่งข้อมูลเบิกค่าสอน ?');
        setIsOpenPopupConfirm(true);
    };

    const onConfirmSubmit = async () => {
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
                    rate_of_unit: item.criteria_of_teach ? item.criteria_of_teach.rate_unit : '',
                    total: item.faculty_disburse,
                    note: item.major_name,
                };
            }),
        };
        setIsOpenPopupConfirm(false);
        console.log('mapPayload :: ', mapPayload);
        const response = await addDisbursement(mapPayload);
        if (response && response.message === 'success') {
            console.log('response :: ', response);
        }
    };

    const onClickGetScheduleByAdmin = async () => {
        const mock: DisburseScheduleTeach = {
            teacher_id: '50012',
            term_of_year_id: 1,
            sum_yes_unit: '4.5',
            sum_no_unit: '0.5',
            total: '2850',
            status: 'pending',
            data: [
                {
                    schedule_teach_id: 9,
                    count_of_teach: '1',
                    unit: '1',
                    unit_yes: '1',
                    unit_no: '',
                    rate_of_unit: 40,
                    total: '1000',
                    note: 'MED',
                    section: 1,
                    enroll_seat: 25,
                    subject: {
                        subject_id: '502101-2',
                        course_of_study_id: 1,
                        name: 'Introduction to Psychology',
                        unit: 3,
                        type: '(3-0-6)',
                        is_internal: 1,
                    },
                },
                {
                    schedule_teach_id: 10,
                    count_of_teach: '2',
                    unit: '1',
                    unit_yes: '0.5',
                    unit_no: '0.5',
                    rate_of_unit: 40,
                    total: '900',
                    note: 'CS',
                    section: 3,
                    enroll_seat: 45,
                    subject: {
                        subject_id: '502102-9',
                        course_of_study_id: 1,
                        name: 'Descriptive Statistics for Data Analysis',
                        unit: 2,
                        type: '(1-2-3)',
                        is_internal: 1,
                    },
                },
                {
                    schedule_teach_id: 11,
                    count_of_teach: '3',
                    unit: '1.5',
                    unit_yes: '1',
                    unit_no: '',
                    rate_of_unit: 50,
                    total: '950',
                    note: 'CS',
                    section: 2,
                    enroll_seat: 19,
                    subject: {
                        subject_id: '505102-5',
                        course_of_study_id: 7,
                        name: 'Recreation',
                        unit: 2,
                        type: '(1-2-3)',
                        is_internal: 1,
                    },
                },
                {
                    schedule_teach_id: 12,
                    count_of_teach: '4',
                    unit: '2',
                    unit_yes: '2',
                    unit_no: '',
                    rate_of_unit: '',
                    total: '',
                    note: 'CS',
                    section: 2,
                    enroll_seat: 19,
                    subject: {
                        subject_id: '12345-5',
                        course_of_study_id: null,
                        name: 'TestAdd',
                        unit: 2,
                        type: '(1-2-3)',
                        is_internal: 0,
                    },
                },
            ],
        };
        setDisburseScheduleData(mock);
        // let payload = {
        //     termId: form.term?.term_of_year_id,
        //     teacherID: form.professor?.teacher_id,
        // };
        // const response = await getDataDisbursementByTeacherIDAndTermID(payload);
        // if (response && response.message === 'success') {
        // setMode('EDIT');
        // if (!isNullOrUndefined(response.payload)) {
        //     const mapData = response.payload.map((item: any) => {
        //         return {
        //             ...item,
        //             teacher_no: '',
        //             teacher_unit: '',
        //             accept_disburse: '',
        //             reject_disburse: '',
        //             faculty_disburse: '',
        //         };
        //     });
        //     setDataSchedule(mapData);
        //     }
        // }
    };

    const onClickApprove = () => {
        setMessagePopupConfirm('อนุมัติการเบิกค่าสอน ?');
        setIsOpenPopupConfirm(true);
    };

    const onClickReject = () => {
        setMessagePopupConfirm(
            <>
                {`ปฏิเสธการเบิกค่าสอน`}
                <br />
                {`กรุณาแจ้ง ${form.professor?.fullname} ดำเนินการต่อ`}
            </>
        );
        setIsOpenPopupConfirm(true);
    };

    const onClosePopupConfirm = () => {
        setIsOpenPopupConfirm(false);
        setMessagePopupConfirm('');
    };

    return (
        <div>
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
                                    onClick={onClickGetScheduleByUser}
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                        {!isNullOrUndefined(dataSchedule) && (
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
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '150px' }}
                                                >
                                                    {row.subject.subject_id}
                                                </TableCell>
                                                {/* รายวิชา */}
                                                <TableCell
                                                    align="left"
                                                    sx={{ minWidth: '300px', padding: 1 }}
                                                >
                                                    {row.subject.name}
                                                </TableCell>
                                                {/* หน่วยกิต */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '110px' }}
                                                >
                                                    {`${row.subject.unit}${row.subject.type}`}
                                                </TableCell>
                                                {/* กลุ่ม */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.section}
                                                </TableCell>
                                                {/* จำนวนนิสิตลงทะเบียน */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '180px' }}
                                                >
                                                    {row.enroll_seat}
                                                </TableCell>
                                                {/* ผู้สอน (คน) */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '120px', padding: 1 }}
                                                >
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
                                                        }}
                                                    />
                                                </TableCell>
                                                {/* จำนวนหน่วยกิตที่สอนจริง */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '200px', padding: 1 }}
                                                >
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
                                                        }}
                                                    />
                                                </TableCell>
                                                {/* เบิกได้ */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    <TextField
                                                        size="small"
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
                                                        }}
                                                    />
                                                </TableCell>
                                                {/* เบิกไม่ได้ */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    <TextField
                                                        size="small"
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
                                                        }}
                                                    />
                                                </TableCell>
                                                {/* เวลาเรียน */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {/* {row.time_study} */}
                                                </TableCell>
                                                {/* จำนวนนิสิตจ่ายเงิน */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '180px' }}
                                                >
                                                    {row.enroll_seat}
                                                </TableCell>
                                                {/* อัตราต่อหัว/นก. */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '150px' }}
                                                >
                                                    {row.criteria_of_teach?.rate_unit || '-'}
                                                </TableCell>
                                                {/* เบิกศึกษาทั่วไป */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '200px' }}
                                                >
                                                    {!row.course_of_study && (
                                                        <CheckIcon sx={{ color: '#008000' }} />
                                                    )}
                                                </TableCell>
                                                {/* เบิกคณะ */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '150px' }}
                                                >
                                                    {toMoneyFormat(row.faculty_disburse)}
                                                </TableCell>
                                                {/* หมายเหตุ */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '200px' }}
                                                >
                                                    <TextField
                                                        size="small"
                                                        value={row.major_name}
                                                        onChange={(e) =>
                                                            handleEdit(
                                                                row.schedule_teach_id,
                                                                'major_name',
                                                                e.target.value
                                                            )
                                                        }
                                                        inputProps={{
                                                            style: { textAlign: 'center' },
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            {/* <TableCell colSpan={1} /> */}
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">รวม</TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">
                                                {/* เบิกได้ */}
                                                {/* {calDisburseAccept()} */}
                                                {sumAcceptDisburse}
                                            </TableCell>
                                            <TableCell align="center">
                                                {/* เบิกไม่ได้ */}
                                                {sumRejectDisburse}
                                                {/* {calDisburseReject()} */}
                                            </TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">
                                                {/* เบิกคณะ */}
                                                {toMoneyFormat(sumFacultyDisburse)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {!isNullOrUndefined(dataSchedule) && (
                            <Grid
                                container
                                spacing={2}
                                justifyContent={'center'}
                                sx={{ paddingTop: 2, paddingBottom: 2 }}
                            >
                                <Grid item xs={4} sm={4} xl={2}>
                                    <Button variant="contained" onClick={onClickSubmitDisburse}>
                                        ยืนยันการเบิกค่าสอน
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
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
                                    getOptionLabel={(option) => option.fullname}
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
                                            <li {...props} key={option.teacher_id}>
                                                {option.fullname}
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
                                    onClick={onClickGetScheduleByAdmin}
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                        {!isNullOrUndefined(disburseScheduleData?.data) && (
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
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '150px' }}
                                                >
                                                    {row.subject.subject_id}
                                                </TableCell>
                                                {/* รายวิชา */}
                                                <TableCell
                                                    align="left"
                                                    sx={{ minWidth: '300px', padding: 1 }}
                                                >
                                                    {row.subject.name}
                                                </TableCell>
                                                {/* หน่วยกิต */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '110px' }}
                                                >
                                                    {`${row.subject.unit}${row.subject.type}`}
                                                </TableCell>
                                                {/* กลุ่ม */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.section}
                                                </TableCell>
                                                {/* จำนวนนิสิตลงทะเบียน */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '180px' }}
                                                >
                                                    {row.enroll_seat}
                                                </TableCell>
                                                {/* ผู้สอน (คน) */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '120px', padding: 1 }}
                                                >
                                                    {row.count_of_teach}
                                                </TableCell>
                                                {/* จำนวนหน่วยกิตที่สอนจริง */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '200px', padding: 1 }}
                                                >
                                                    {row.unit}
                                                </TableCell>
                                                {/* เบิกได้ */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.unit_yes}
                                                </TableCell>
                                                {/* เบิกไม่ได้ */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.unit_no}
                                                </TableCell>
                                                {/* เวลาเรียน */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {/* {row.time_study} */}
                                                </TableCell>
                                                {/* จำนวนนิสิตจ่ายเงิน */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '180px' }}
                                                >
                                                    {row.enroll_seat}
                                                </TableCell>
                                                {/* อัตราต่อหัว/นก. */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '150px' }}
                                                >
                                                    {row.rate_of_unit || '-'}
                                                </TableCell>
                                                {/* เบิกศึกษาทั่วไป */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '200px' }}
                                                >
                                                    {!row.subject.course_of_study_id && (
                                                        <CheckIcon sx={{ color: '#008000' }} />
                                                    )}
                                                </TableCell>
                                                {/* เบิกคณะ */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '150px' }}
                                                >
                                                    {toMoneyFormat(row.total)}
                                                </TableCell>
                                                {/* หมายเหตุ */}
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '200px' }}
                                                >
                                                    {row.note}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            {/* <TableCell colSpan={1} /> */}
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">รวม</TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">
                                                {/* เบิกได้ */}
                                                {disburseScheduleData?.sum_yes_unit}
                                            </TableCell>
                                            <TableCell align="center">
                                                {/* เบิกไม่ได้ */}
                                                {disburseScheduleData?.sum_no_unit}
                                            </TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">
                                                {/* เบิกคณะ */}
                                                {disburseScheduleData
                                                    ? toMoneyFormat(disburseScheduleData.total)
                                                    : ''}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {!isNullOrUndefined(disburseScheduleData) && (
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
                {/* <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ paddingTop: 2, paddingBottom: 2 }}
                >
                    <Grid item xs={4} md={2}>
                        <Button variant="text" fullWidth startIcon={<MdPreview />}>
                            ดูตัวอย่าง
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Button variant="text" fullWidth startIcon={<FaRegFilePdf />}>
                            ดาวน์โหลด
                        </Button>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        height: '300px',
                        width:
                            window?.innerWidth > 1024
                                ? `calc(100vw - 272px)`
                                : `calc(100vw - 32px)`,
                    }}
                >
                    <DataGrid
                        rows={rowsOfDisburse}
                        columns={columnsOfDisburse}
                        getRowId={(row: any) => row.id}
                        autoHeight
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    page: 0,
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        disableRowSelectionOnClick
                        columnGroupingModel={columnGroupingResult}
                    />
                </Box> */}
            </Box>
        </div>
    );
};

export default DisbursementPage;
