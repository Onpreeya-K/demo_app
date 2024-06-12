import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    BoxProps,
    Button,
    Divider,
    Grid,
    IconButton,
    Modal,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import {
    createTeacher,
    deleteTeacher,
    getAllTeacher,
    updateTeacher,
} from '../../services/Teacher-service';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Teacher {
    teacher_id: string;
    prefix: string;
    fullname: string;
    position: string;
    sub_position: string;
}
interface FormState {
    teacher_id: string;
    prefix: string;
    fullname: string;
    position: string;
    sub_position: string;
}

interface ErrorState {
    teacher_id: boolean;
    prefix: boolean;
    fullname: boolean;
    position: boolean;
    sub_position: boolean;
}
const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '60%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '24px',
    borderRadius: '0.5em',
    textAlign: 'center',
    padding: '1.2em',
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    minHeight: '300px',
}));

const ProfessorInfoPage = () => {
    const startPage = useRef(false);
    const [teacherAll, setTeacherAll] = useState<Teacher[]>([]);
    const [dataTable, setDataTable] = useState<Teacher[]>([]);
    const [modalAction, setModalAction] = useState<string>('');
    const [form, setForm] = useState<FormState>({
        teacher_id: '',
        prefix: '',
        fullname: '',
        position: '',
        sub_position: '',
    });

    const [errors, setErrors] = useState<ErrorState>({
        teacher_id: false,
        prefix: false,
        fullname: false,
        position: false,
        sub_position: false,
    });
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const columns: GridColDef[] = [
        {
            field: 'teacher_id',
            headerName: 'รหัสอาจารย์',
            align: 'center',
            headerAlign: 'center',
            width: 150,
        },
        {
            field: 'prefix',
            headerName: 'คำนำหน้า',
            align: 'left',
            headerAlign: 'center',
            minWidth: 150,
        },
        {
            field: 'fullname',
            headerName: 'ชื่อ',
            align: 'left',
            headerAlign: 'center',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'position',
            headerName: 'ตำแหน่ง',
            align: 'left',
            headerAlign: 'center',
            width: 200,
        },
        {
            field: 'sub_position',
            headerName: 'ตำแหน่ง',
            align: 'left',
            headerAlign: 'center',
            width: 200,
        },
        {
            field: 'edit',
            headerName: 'แก้ไข',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton
                        size="small"
                        onClick={() => onClickEditData(params.row)}
                    >
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => onClickDeleteData(params.row)}
                    >
                        <DeleteOutlineIcon fontSize="inherit" />
                    </IconButton>
                </div>
            ),
        },
    ];
    const onClickEditData = (row: Teacher) => {
        setModalAction('UPDATE');
        setOpenDialog(true);
        setForm(row);
    };
    const onClickDeleteData = async (row: Teacher) => {
        setForm(row);
        const response = await deleteTeacher(row.teacher_id);
        if (response && response.message === 'success') {
            fetchData();
        }
    };

    const fetchData = async () => {
        try {
            const response = await getAllTeacher();
            if (response && response.message === 'success') {
                setTeacherAll(response.payload);
                setDataTable(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const onClickAddProfessor = () => {
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

    const clearForm = () => {
        setForm({
            teacher_id: '',
            prefix: '',
            fullname: '',
            position: '',
            sub_position: '',
        });
        setErrors({
            teacher_id: false,
            prefix: false,
            fullname: false,
            position: false,
            sub_position: false,
        });
    };

    const validate = () => {
        const tempErrors: ErrorState = {
            teacher_id: form.teacher_id === '',
            prefix: form.prefix === '',
            fullname: form.fullname === '',
            position: form.position === '',
            sub_position: form.sub_position === '',
        };
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === false);
    };

    const onSubmitAddProfessor = async () => {
        if (validate()) {
            const response =
                modalAction === 'CREATE'
                    ? await createTeacher(form)
                    : await updateTeacher(form.teacher_id, form);
            if (response && response.message === 'success') {
                setModalAction('');
                setOpenDialog(false);
                clearForm();
                fetchData();
            }
        } else {
            console.log('Form has errors.');
        }
    };

    const onChangeSaleOwnerAndRefer = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        if (value) {
            let filter = teacherAll.filter((item) =>
                item.fullname.includes(value)
            );
            setDataTable(filter);
        } else {
            setDataTable(teacherAll);
        }
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
            <Modal open={openDialog}>
                <StyledBox>
                    <div>
                        <Typography variant="h6">
                            เพิ่มรายชื่ออาจารย์
                        </Typography>
                        <Divider />
                    </div>
                    <Grid container spacing={2}>
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
                                helperText={
                                    errors.teacher_id &&
                                    'This field is required'
                                }
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
                                helperText={
                                    errors.prefix && 'This field is required'
                                }
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
                                helperText={
                                    errors.fullname && 'This field is required'
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="ตำแหน่ง"
                                name="position"
                                size="small"
                                fullWidth
                                value={form.position}
                                onChange={handleChange}
                                error={errors.position}
                                helperText={
                                    errors.position && 'This field is required'
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="ตำแหน่ง"
                                name="sub_position"
                                size="small"
                                fullWidth
                                value={form.sub_position}
                                onChange={handleChange}
                                error={errors.sub_position}
                                helperText={
                                    errors.sub_position &&
                                    'This field is required'
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container component={'div'}>
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            justifyContent={'center'}
                            gap={2}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    clearForm();
                                    setOpenDialog(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={onSubmitAddProfessor}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </StyledBox>
            </Modal>
        );
    };

    return (
        <div>
            <Box sx={{ height: '100%', width: '100%' }}>
                <Box>
                    <Typography textAlign="start" variant="h6" component="div">
                        ข้อมูลอาจารย์
                    </Typography>
                    <Divider />
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        width:
                            window?.innerWidth > 1024
                                ? `calc(100vw - 272px)`
                                : `calc(100vw - 32px)`,
                    }}
                >
                    {renderDialogAddProfessor()}
                    <Grid
                        container
                        marginBottom={2}
                        spacing={2}
                        alignItems="center"
                    >
                        <Grid item xs={8} md={10}>
                            <TextField
                                fullWidth
                                size="small"
                                label="ค้นหารายชื่อ"
                                variant="outlined"
                                onChange={onChangeSaleOwnerAndRefer}
                            />
                        </Grid>
                        {/* <Grid item xs={4} md={2}>
                            <Button fullWidth variant="contained">
                                ค้นหา
                            </Button>
                        </Grid> */}
                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={onClickAddProfessor}
                            >
                                เพิ่มรายชื่ออาจารย์
                            </Button>
                        </Grid>
                    </Grid>
                    <DataGrid
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
                        pageSizeOptions={[5, 10]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </div>
    );
};

export default ProfessorInfoPage;
