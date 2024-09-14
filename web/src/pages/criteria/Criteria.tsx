import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import { getCriteriaOfTeach } from '../../services/Criteria-service';
import { getAllLavel, getAllSubject } from '../../services/LavelAndSubject-service';

interface Course {
    criteria_of_teach_id: number;
    course_of_study_id: number;
    level_id: number;
    teaching_rates: number;
    rate_unit: number;
    course_of_study: {
        course_of_study_id: number;
        department_id: number;
        degree_id: number;
        name: string;
    };
    level: {
        level_id: number;
        name: string;
    };
}

interface EducationData {
    bachelor: Course[];
    master: Course[];
    doctor: Course[];
    master_inter: Course[];
    doctor_inter: Course[];
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface DropdownLavel {
    level_id: number;
    name: string;
}

const CriteriaPage = () => {
    const startPage = useRef(false);

    const [data, setData] = useState<EducationData>();
    // const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [popupAction, setPopupAction] = useState<string>('');
    // const [optionLavel, setOptionLavel] = useState<DropdownLavel[]>([]);

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    // Event handler to change page
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Event handler to change rows per page
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchCriteriaOfTeach = async () => {
        try {
            const response = await getCriteriaOfTeach();
            if (response && response.message === 'success') {
                setData(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    // const fetchAllLavel = async () => {
    //     try {
    //         const response = await getAllLavel();
    //         if (response && response.message === 'success') {
    //             setOptionLavel(response.payload);
    //         }
    //     } catch (error: any) {
    //         console.error('Error:', error);
    //     }
    // };

    const fetchAllSubject = async () => {
        try {
            const response = await getAllSubject();
            if (response && response.message === 'success') {
                console.log('response.payload :: ', response.payload);

                // setOptionLavel(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (startPage.current === false) {
            fetchCriteriaOfTeach();
            // fetchAllLavel();
            fetchAllSubject();
            startPage.current = true;
        }
    });

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    }

    const columns: GridColDef[] = [
        {
            field: 'course_name',
            headerName: 'หลักสูตร',
            flex: 1,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
            headerAlign: 'center',
            align: 'left',
        },
        {
            field: 'level_name',
            headerName: 'ระดับ',
            flex: 1,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'teaching_rates',
            headerName: 'ค่าบริหารการศึกษา',
            flex: 1,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'rate_unit',
            headerName: 'อัตราค่าสอน/หัว/หน่วยกิต',
            flex: 1,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
            headerAlign: 'center',
            align: 'center',
        },
        // {
        //     field: 'edit',
        //     headerName: 'แก้ไข',
        //     align: 'center',
        //     headerAlign: 'center',
        //     width: 150,
        //     sortable: false,
        //     resizable: false,
        //     disableColumnMenu: true,
        //     renderCell: (params) => (
        //         <div>
        //             <Tooltip title="แก้ไข" placement="top">
        //                 <IconButton
        //                     size="small"
        //                     onClick={() => setOpenDialog(true)}
        //                     // onClick={() => onClickEditData(params.row)}
        //                 >
        //                     <EditIcon fontSize="inherit" />
        //                 </IconButton>
        //             </Tooltip>
        //             <Tooltip title="ลบ" placement="top">
        //                 <IconButton
        //                     size="small"
        //                     // onClick={() => onClickDeleteData(params.row)}
        //                 >
        //                     <DeleteOutlineIcon fontSize="inherit" />
        //                 </IconButton>
        //             </Tooltip>
        //         </div>
        //     ),
        // },
    ];

    // const renderDialogAddProfessor = () => {
    //     return (
    //         <Dialog
    //             open={openDialog}
    //             onClose={() => {
    //                 // clearForm();
    //                 setOpenDialog(false);
    //             }}
    //             fullWidth
    //         >
    //             <DialogTitle sx={{ padding: '16px 24px 8px 24px' }}>
    //                 <Typography textAlign="center" variant="h6" component="div">
    //                     {popupAction === 'CREATE' ? 'เพิ่มเกณฑ์ค่าสอน' : 'แก้ไขเกณฑ์ค่าสอน'}
    //                 </Typography>
    //                 <Divider />
    //             </DialogTitle>
    //             <DialogContent sx={{ padding: 3 }}>
    //                 <Grid container spacing={2} paddingTop={1}>
    //                     {/* <Grid item xs={12}>
    //                         <Autocomplete
    //                             size="small"
    //                             fullWidth
    //                             options={optionLavel}
    //                             getOptionLabel={(option) => option.name}
    //                             renderInput={(params) => (
    //                                 <TextField
    //                                     {...params}
    //                                     required
    //                                     label="หลักสูตร"
    //                                     variant="outlined"
    //                                     InputLabelProps={{
    //                                         shrink: true,
    //                                     }}
    //                                 />
    //                             )}
    //                             isOptionEqualToValue={(option, value) =>
    //                                 option.level_id === value.level_id
    //                             }
    //                         />
    //                     </Grid> */}
    //                     <Grid item xs={12}>
    //                         <TextField
    //                             required
    //                             label="หลักสูตร"
    //                             name="teacher_id"
    //                             size="small"
    //                             fullWidth
    //                             // value={form.teacher_id}
    //                             // onChange={handleChange}
    //                             // error={errors.teacher_id}
    //                             // helperText={errors.teacher_id && 'กรุณาระบุรหัสอาจารย์'}
    //                             // disabled={modalAction !== 'CREATE'}
    //                         />
    //                     </Grid>
    //                     {/* <Grid item xs={12}>
    //                         <TextField
    //                             required
    //                             label="คำนำหน้า"
    //                             name="prefix"
    //                             size="small"
    //                             fullWidth
    //                             // value={form.prefix}
    //                             // onChange={handleChange}
    //                             // error={errors.prefix}
    //                             // helperText={errors.prefix && 'กรุณาระบุคำนำหน้า'}
    //                         />
    //                     </Grid>
    //                     <Grid item xs={12}>
    //                         <TextField
    //                             required
    //                             label="ชื่อ - นามสกุล"
    //                             name="fullname"
    //                             size="small"
    //                             fullWidth
    //                             // value={form.fullname}
    //                             // onChange={handleChange}
    //                             // error={errors.fullname}
    //                             // helperText={errors.fullname && 'กรุณาระบุชื่อ - นามสกุล'}
    //                         />
    //                     </Grid>
    //                     <Grid item xs={12}>
    //                         <Autocomplete
    //                             size="small"
    //                             fullWidth
    //                             options={[]}
    //                             // getOptionLabel={(option) => option.name}
    //                             renderInput={(params) => (
    //                                 <TextField
    //                                     {...params}
    //                                     required
    //                                     label="ตำแหน่งทางวิชาการ"
    //                                     variant="outlined"
    //                                     InputLabelProps={{
    //                                         shrink: true,
    //                                     }}
    //                                     // error={errors.academic_position}
    //                                     // helperText={
    //                                     //     errors.academic_position &&
    //                                     //     'กรุณาเลือกตำแหน่งทางวิชาการ'
    //                                     // }
    //                                 />
    //                             )}
    //                             // isOptionEqualToValue={(option, value) => option.a_id === value.a_id}
    //                             // value={form.academic_position}
    //                             // onChange={(_e, option) =>
    //                             //     onChangeAutocompleteAcademicPosition(option)
    //                             // }
    //                         />
    //                     </Grid> */}
    //                 </Grid>
    //                 <Grid container component={'div'} marginTop={2}>
    //                     <Grid item xs={12} display={'flex'} justifyContent={'center'} gap={2}>
    //                         <Button
    //                             variant="outlined"
    //                             onClick={() => {
    //                                 // clearForm();
    //                                 setOpenDialog(false);
    //                             }}
    //                         >
    //                             ยกเลิก
    //                         </Button>
    //                         <Button
    //                             variant="contained"
    //                             //  onClick={onSubmitAddProfessor}
    //                         >
    //                             {popupAction === 'CREATE' ? 'เพิ่ม' : 'ยืนยันการแก้ไข'}
    //                         </Button>
    //                     </Grid>
    //                 </Grid>
    //             </DialogContent>
    //         </Dialog>
    //     );
    // };

    const formatCourses = (courses: Course[]) => {
        return courses.map((course) => ({
            course_of_study_id: course.criteria_of_teach_id,
            course_name: course.course_of_study.name,
            level_name: course.level.name,
            teaching_rates: course.teaching_rates,
            rate_unit: course.rate_unit,
        }));
    };

    return (
        <div>
            <Box sx={{ height: '100%' }}>
                <div>
                    <Typography textAlign="start" variant="h6" component="div">
                        เกณฑ์ค่าสอน
                    </Typography>
                    <Divider />
                </div>
                {/* {renderDialogAddProfessor()} */}
                {data && (
                    <div>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="ระดับปริญญาตรี" {...a11yProps(0)} />
                            <Tab label="ระดับมหาบัณฑิต" {...a11yProps(1)} />
                            <Tab label="ระดับปริญญาดุษฎีบัณฑิต" {...a11yProps(2)} />
                            <Tab label="ระดับมหาบัณฑิต (นิสิตต่างชาติ)" {...a11yProps(3)} />
                            <Tab label="ระดับปริญญาดุษฎีบัณฑิต (นิสิตต่างชาติ)" {...a11yProps(4)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">หลักสูตร</TableCell>
                                            <TableCell align="center">ระดับ</TableCell>
                                            <TableCell align="center">ค่าบริหารการศึกษา</TableCell>
                                            <TableCell align="center">
                                                อัตราค่าสอน/หัว/หน่วยกิต
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formatCourses(data.bachelor)
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => (
                                                <TableRow key={row.course_of_study_id}>
                                                    <TableCell align="left">
                                                        {row.course_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.level_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.teaching_rates}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.rate_unit}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    component="div"
                                    count={formatCourses(data.bachelor).length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelDisplayedRows={({ from, to, count }) =>
                                        `แสดง ${from} ถึง ${to} จาก ${count}`
                                    }
                                    labelRowsPerPage="จำนวนหลักสูตรต่อหน้า"
                                />
                            </TableContainer>
                            {/* <DataGrid
                                rows={formatCourses(data.bachelor)}
                                columns={columns}
                                getRowId={(row) => row.course_of_study_id}
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
                            /> */}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">หลักสูตร</TableCell>
                                            <TableCell align="center">ระดับ</TableCell>
                                            <TableCell align="center">ค่าบริหารการศึกษา</TableCell>
                                            <TableCell align="center">
                                                อัตราค่าสอน/หัว/หน่วยกิต
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formatCourses(data.master)
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => (
                                                <TableRow key={row.course_of_study_id}>
                                                    <TableCell align="left">
                                                        {row.course_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.level_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.teaching_rates}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.rate_unit}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    component="div"
                                    count={formatCourses(data.master).length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelDisplayedRows={({ from, to, count }) =>
                                        `แสดง ${from} ถึง ${to} จาก ${count}`
                                    }
                                    labelRowsPerPage="จำนวนหลักสูตรต่อหน้า"
                                />
                            </TableContainer>
                            {/* <DataGrid
                                rows={formatCourses(data.master)}
                                columns={columns}
                                getRowId={(row) => row.course_of_study_id}
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
                            /> */}
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">หลักสูตร</TableCell>
                                            <TableCell align="center">ระดับ</TableCell>
                                            <TableCell align="center">ค่าบริหารการศึกษา</TableCell>
                                            <TableCell align="center">
                                                อัตราค่าสอน/หัว/หน่วยกิต
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formatCourses(data.doctor)
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => (
                                                <TableRow key={row.course_of_study_id}>
                                                    <TableCell align="left">
                                                        {row.course_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.level_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.teaching_rates}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.rate_unit}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    component="div"
                                    count={formatCourses(data.doctor).length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelDisplayedRows={({ from, to, count }) =>
                                        `แสดง ${from} ถึง ${to} จาก ${count}`
                                    }
                                    labelRowsPerPage="จำนวนหลักสูตรต่อหน้า"
                                />
                            </TableContainer>
                            {/* <DataGrid
                                rows={formatCourses(data.doctor)}
                                columns={columns}
                                getRowId={(row) => row.course_of_study_id}
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
                            /> */}
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">หลักสูตร</TableCell>
                                            <TableCell align="center">ระดับ</TableCell>
                                            <TableCell align="center">ค่าบริหารการศึกษา</TableCell>
                                            <TableCell align="center">
                                                อัตราค่าสอน/หัว/หน่วยกิต
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formatCourses(data.master_inter)
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => (
                                                <TableRow key={row.course_of_study_id}>
                                                    <TableCell align="left">
                                                        {row.course_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.level_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.teaching_rates}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.rate_unit}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    component="div"
                                    count={formatCourses(data.master_inter).length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelDisplayedRows={({ from, to, count }) =>
                                        `แสดง ${from} ถึง ${to} จาก ${count}`
                                    }
                                    labelRowsPerPage="จำนวนหลักสูตรต่อหน้า"
                                />
                            </TableContainer>
                            {/* <DataGrid
                                rows={formatCourses(data.master_inter)}
                                columns={columns}
                                getRowId={(row) => row.course_of_study_id}
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
                            /> */}
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">หลักสูตร</TableCell>
                                            <TableCell align="center">ระดับ</TableCell>
                                            <TableCell align="center">ค่าบริหารการศึกษา</TableCell>
                                            <TableCell align="center">
                                                อัตราค่าสอน/หัว/หน่วยกิต
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formatCourses(data.doctor_inter)
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => (
                                                <TableRow key={row.course_of_study_id}>
                                                    <TableCell align="left">
                                                        {row.course_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.level_name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.teaching_rates}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.rate_unit}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    component="div"
                                    count={formatCourses(data.doctor_inter).length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelDisplayedRows={({ from, to, count }) =>
                                        `แสดง ${from} ถึง ${to} จาก ${count}`
                                    }
                                    labelRowsPerPage="จำนวนหลักสูตรต่อหน้า"
                                />
                            </TableContainer>
                            {/* <DataGrid
                                rows={formatCourses(data.doctor_inter)}
                                columns={columns}
                                getRowId={(row) => row.course_of_study_id}
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
                            /> */}
                        </TabPanel>
                    </div>
                )}
            </Box>
        </div>
    );
};

export default CriteriaPage;
