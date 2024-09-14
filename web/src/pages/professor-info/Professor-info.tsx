import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridLocaleText } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import PopupConfirm from '../../components/popupConfirm/Popup-Confirm';
import {
    createTeacher,
    deleteTeacher,
    getAcademicPosition,
    getAllTeacher,
    getManagementPosition,
    updateTeacher,
} from '../../services/Teacher-service';
import PopupAlert from '../../components/popupAlert/Popup-Alert';

interface Teacher {
    teacher_id: string;
    prefix: string;
    fullname: string;
    academic_position: AcademicPosition;
    management_position: ManagementPosition;
}
interface FormState {
    teacher_id: string;
    prefix: string;
    fullname: string;
    academic_position: AcademicPosition | null;
    management_position: ManagementPosition | null;
}
interface ManagementPosition {
    m_id: number;
    criteria_of_process_id: number;
    name: string;
}
interface AcademicPosition {
    a_id: number;
    name: string;
}
interface ErrorState {
    teacher_id: boolean;
    prefix: boolean;
    fullname: boolean;
    academic_position: boolean;
    management_position: boolean;
}

const ProfessorInfoPage = () => {
    const startPage = useRef(false);
    const [teacherAll, setTeacherAll] = useState<Teacher[]>([]);
    const [dataTable, setDataTable] = useState<Teacher[]>([]);
    const [modalAction, setModalAction] = useState<string>('');
    const [form, setForm] = useState<FormState>({
        teacher_id: '',
        prefix: '',
        fullname: '',
        academic_position: null,
        management_position: null,
    });

    const [errors, setErrors] = useState<ErrorState>({
        teacher_id: false,
        prefix: false,
        fullname: false,
        academic_position: false,
        management_position: false,
    });
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [isOpenPopupConfirm, setIsOpenPopupConfirm] = useState<boolean>(false);
    const [isOpenPopupAlert, setIsOpenPopupAlert] = useState<boolean>(false);
    const [messagePopupAlert, setMessagePopupAlert] = useState<string>('');
    const [optionManagementPosition, setOptionManagementPosition] = useState<ManagementPosition[]>(
        []
    );
    const [optionAcademicPosition, setOptionAcademicPosition] = useState<AcademicPosition[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const columns: GridColDef[] = [
    //     {
    //         field: 'teacher_id',
    //         headerName: 'รหัสอาจารย์',
    //         align: 'center',
    //         headerAlign: 'center',
    //         width: 180,
    //         sortable: false,
    //         resizable: false,
    //         disableColumnMenu: true,
    //     },
    //     {
    //         field: 'prefix',
    //         headerName: 'คำนำหน้า',
    //         align: 'left',
    //         headerAlign: 'center',
    //         minWidth: 150,
    //         sortable: false,
    //         resizable: false,
    //         disableColumnMenu: true,
    //     },
    //     {
    //         field: 'fullname',
    //         headerName: 'ชื่อ',
    //         align: 'left',
    //         headerAlign: 'center',
    //         minWidth: 200,
    //         flex: 1,
    //         sortable: false,
    //         resizable: false,
    //         disableColumnMenu: true,
    //     },
    //     {
    //         field: 'position',
    //         headerName: 'ตำแหน่งทางวิชาการ',
    //         align: 'left',
    //         headerAlign: 'center',
    //         width: 200,
    //         sortable: false,
    //         resizable: false,
    //         disableColumnMenu: true,
    //         renderCell: (params) => <div>{params.row.academic_position.name}</div>,
    //     },
    //     {
    //         field: 'management_position',
    //         headerName: 'ตำแหน่งบริหาร',
    //         align: 'left',
    //         headerAlign: 'center',
    //         width: 200,
    //         sortable: false,
    //         resizable: false,
    //         disableColumnMenu: true,
    //         renderCell: (params) => <div>{params.row.management_position.name}</div>,
    //     },
    //     {
    //         field: 'edit',
    //         headerName: 'แก้ไข',
    //         align: 'center',
    //         headerAlign: 'center',
    //         width: 150,
    //         sortable: false,
    //         resizable: false,
    //         disableColumnMenu: true,
    //         renderCell: (params) => (
    //             <div>
    //                 <Tooltip title="แก้ไข" placement="top">
    //                     <IconButton size="small" onClick={() => onClickEditData(params.row)}>
    //                         <EditIcon fontSize="inherit" />
    //                     </IconButton>
    //                 </Tooltip>
    //                 <Tooltip title="ลบ" placement="top">
    //                     <IconButton size="small" onClick={() => onClickDeleteData(params.row)}>
    //                         <DeleteOutlineIcon fontSize="inherit" />
    //                     </IconButton>
    //                 </Tooltip>
    //             </div>
    //         ),
    //     },
    // ];
    const onClickEditData = (row: Teacher) => {
        setModalAction('UPDATE');
        setOpenDialog(true);
        setForm(row);
    };

    const onConfirmDelete = async () => {
        const response = await deleteTeacher(form.teacher_id);
        setIsOpenPopupConfirm(false);
        if (response && response.message === 'success') {
            await fetchData();
            setIsOpenPopupAlert(true);
            setMessagePopupAlert('ลบรายชื่ออาจารย์สำเร็จ');
        }
    };

    const onClickDeleteData = async (row: Teacher) => {
        setForm(row);
        setIsOpenPopupConfirm(true);
    };

    const fetchData = async () => {
        try {
            const response = await getAllTeacher();
            if (response && response.message === 'success') {
                setTeacherAll(response.payload);
                setDataTable(response.payload);
            }
            const responseManagementPosition = await getManagementPosition();
            if (responseManagementPosition && responseManagementPosition.message === 'success') {
                setOptionManagementPosition(responseManagementPosition.payload);
            }
            const responseAcademicPosition = await getAcademicPosition();
            if (responseAcademicPosition && responseAcademicPosition.message === 'success') {
                setOptionAcademicPosition(responseAcademicPosition.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const onClickAddProfessor = () => {
        clearForm();
        setModalAction('CREATE');
        setOpenDialog(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: !value,
        });
    };

    const onChangeAutocompleteManagementPosition = (option: ManagementPosition | null) => {
        setForm({
            ...form,
            management_position: option,
        });
    };

    const onChangeAutocompleteAcademicPosition = (option: AcademicPosition | null) => {
        setForm({
            ...form,
            academic_position: option,
        });
    };

    const clearForm = () => {
        setForm({
            teacher_id: '',
            prefix: '',
            fullname: '',
            academic_position: null,
            management_position: null,
        });
        setErrors({
            teacher_id: false,
            prefix: false,
            fullname: false,
            academic_position: false,
            management_position: false,
        });
    };

    const validate = () => {
        const tempErrors: ErrorState = {
            teacher_id: form.teacher_id === '',
            prefix: form.prefix === '',
            fullname: form.fullname === '',
            academic_position: !form.academic_position,
            management_position: !form.management_position,
        };
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === false);
    };

    const onSubmitAddProfessor = async () => {
        if (validate()) {
            setOpenDialog(false);
            if (modalAction === 'CREATE') {
                const payload = {
                    teacher_id: form.teacher_id,
                    prefix: form.prefix,
                    fullname: form.fullname,
                    a_id: form.academic_position?.a_id,
                    m_id: form.management_position?.m_id,
                };
                const response = await createTeacher(payload);
                if (response && response.message === 'success') {
                    setIsOpenPopupAlert(true);
                    setModalAction('');
                    setMessagePopupAlert('เพิ่มรายชื่ออาจารย์สำเร็จ');
                    clearForm();
                    fetchData();
                    setOpenDialog(false);
                }
            } else {
                const payload = {
                    teacher_id: form.teacher_id,
                    prefix: form.prefix,
                    fullname: form.fullname,
                    a_id: form.academic_position?.a_id,
                    m_id: form.management_position?.m_id,
                };
                const response = await updateTeacher(form.teacher_id, payload);
                if (response && response.message === 'success') {
                    setIsOpenPopupAlert(true);
                    setModalAction('');
                    setMessagePopupAlert('แก้ไขรายชื่ออาจารย์สำเร็จ');
                    clearForm();
                    fetchData();
                }
            }
        } else {
            console.log('Form has errors.');
        }
    };

    const onChangeSaleOwnerAndRefer = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value) {
            let filter = teacherAll.filter(
                (item) => item.fullname.includes(value) || item.teacher_id.includes(value)
            );
            setDataTable(filter);
        } else {
            setDataTable(teacherAll);
        }
    };

    const onClosePopup = () => {
        setIsOpenPopupAlert(false);
        setMessagePopupAlert('');
    };

    useEffect(() => {
        if (startPage.current === false) {
            fetchData();
        }
        return () => {
            startPage.current = true;
        };
    });

    const renderDialogAddProfessor = () => {
        return (
            <Dialog
                open={openDialog}
                onClose={() => {
                    clearForm();
                    setOpenDialog(false);
                }}
                fullWidth
            >
                <DialogTitle sx={{ padding: '16px 24px 8px 24px' }}>
                    <Typography textAlign="center" variant="h6" component="div">
                        {modalAction === 'CREATE' ? 'เพิ่มรายชื่ออาจารย์' : 'แก้ไขรายชื่ออาจารย์'}
                    </Typography>
                    <Divider />
                </DialogTitle>
                <DialogContent sx={{ padding: 3 }}>
                    <Grid container spacing={2} paddingTop={1}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="รหัสอาจารย์"
                                name="teacher_id"
                                size="small"
                                fullWidth
                                value={form.teacher_id}
                                onChange={handleChange}
                                error={errors.teacher_id}
                                helperText={errors.teacher_id && 'กรุณาระบุรหัสอาจารย์'}
                                disabled={modalAction !== 'CREATE'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="คำนำหน้า"
                                name="prefix"
                                size="small"
                                fullWidth
                                value={form.prefix}
                                onChange={handleChange}
                                error={errors.prefix}
                                helperText={errors.prefix && 'กรุณาระบุคำนำหน้า'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="ชื่อ - นามสกุล"
                                name="fullname"
                                size="small"
                                fullWidth
                                value={form.fullname}
                                onChange={handleChange}
                                error={errors.fullname}
                                helperText={errors.fullname && 'กรุณาระบุชื่อ - นามสกุล'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                size="small"
                                fullWidth
                                options={optionAcademicPosition}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        label="ตำแหน่งทางวิชาการ"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={errors.academic_position}
                                        helperText={
                                            errors.academic_position &&
                                            'กรุณาเลือกตำแหน่งทางวิชาการ'
                                        }
                                    />
                                )}
                                isOptionEqualToValue={(option, value) => option.a_id === value.a_id}
                                value={form.academic_position}
                                onChange={(_e, option) =>
                                    onChangeAutocompleteAcademicPosition(option)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                size="small"
                                fullWidth
                                options={optionManagementPosition || []}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        label="ตำแหน่งบริหาร"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={errors.management_position}
                                        helperText={
                                            errors.management_position && 'กรุณาเลือกตำแหน่งบริหาร'
                                        }
                                    />
                                )}
                                isOptionEqualToValue={(option, value) => option.m_id === value.m_id}
                                value={form.management_position}
                                onChange={(_e, option) =>
                                    onChangeAutocompleteManagementPosition(option)
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container component={'div'} marginTop={2}>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} gap={2}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    clearForm();
                                    setOpenDialog(false);
                                }}
                            >
                                ยกเลิก
                            </Button>
                            <Button variant="contained" onClick={onSubmitAddProfessor}>
                                {modalAction === 'CREATE' ? 'เพิ่ม' : 'ยืนยันการแก้ไข'}
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    };

    // const localeText: Partial<GridLocaleText> = {
    //     MuiTablePagination: {
    //         labelDisplayedRows: ({ from, to, count }) =>
    //             `รายชื่ออาจารย์ตั้งแต่ ${from} ถึง ${to} จาก ${count !== -1 ? count : `${to}`}`,
    //         labelRowsPerPage: 'จำนวนอาจารย์ต่อหน้า',
    //     },
    // };

    return (
        <div>
            <PopupAlert
                isOpen={isOpenPopupAlert}
                onClose={onClosePopup}
                title={<div>{messagePopupAlert}</div>}
                type="SUCCESS"
            />
            <Box>
                <Typography textAlign="start" variant="h6" component="div">
                    ข้อมูลอาจารย์
                </Typography>
                <Divider />
            </Box>
            <Box
                sx={{
                    marginTop: 2,
                    width: window?.innerWidth > 1024 ? `calc(100vw - 272px)` : `calc(100vw - 32px)`,
                }}
            >
                <Grid container marginBottom={2} spacing={2} alignItems="center">
                    <Grid item xs={12} md={10}>
                        <TextField
                            fullWidth
                            size="small"
                            label="ค้นหารายชื่อ"
                            variant="outlined"
                            onChange={onChangeSaleOwnerAndRefer}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button fullWidth variant="outlined" onClick={onClickAddProfessor}>
                            เพิ่มรายชื่ออาจารย์
                        </Button>
                    </Grid>
                </Grid>
                {renderDialogAddProfessor()}
                <PopupConfirm
                    isOpen={isOpenPopupConfirm}
                    onClose={() => setIsOpenPopupConfirm(false)}
                    onConfirm={onConfirmDelete}
                    title={'คุณต้องการลบข้อมูลอาจารย์ ?'}
                />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">รหัสอาจารย์</TableCell>
                                <TableCell align="left">คำนำหน้า</TableCell>
                                <TableCell align="left">ชื่อ</TableCell>
                                <TableCell align="left">ตำแหน่งทางวิชาการ</TableCell>
                                <TableCell align="left">ตำแหน่งบริหาร</TableCell>
                                <TableCell align="center">แก้ไข</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataTable
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.teacher_id}>
                                        <TableCell align="center">{row.teacher_id}</TableCell>
                                        <TableCell align="left">{row.prefix}</TableCell>
                                        <TableCell align="left">{row.fullname}</TableCell>
                                        <TableCell align="left">
                                            {row.academic_position.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.management_position.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="แก้ไข" placement="top">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onClickEditData(row)}
                                                >
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="ลบ" placement="top">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onClickDeleteData(row)}
                                                >
                                                    <DeleteOutlineIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        component="div"
                        count={dataTable.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelDisplayedRows={({ from, to, count }) =>
                            `รายชื่ออาจารย์ตั้งแต่ ${from} ถึง ${to} จาก ${
                                count !== -1 ? count : `${to}`
                            }`
                        }
                        labelRowsPerPage="จำนวนอาจารย์ต่อหน้า"
                    />
                </TableContainer>
                {/* <DataGrid
                    rows={dataTable}
                    columns={columns}
                    getRowId={(row: any) => row.teacher_id}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15, 20]}
                    disableRowSelectionOnClick
                    localeText={localeText}
                /> */}
            </Box>
        </div>
    );
};

export default ProfessorInfoPage;
