import CloseIcon from '@mui/icons-material/Close';
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
import { useEffect, useRef, useState } from 'react';
import PopupAlert from '../../components/popupAlert/Popup-Alert';
import PopupConfirm from '../../components/popupConfirm/Popup-Confirm';
import {
    createCriteraiProcess,
    deleteCriteraiProcess,
    getCriteraiProcess,
    updateCriteraiProcess,
} from '../../services/Criteria-service';
import { isNullOrUndefined, loadingClose, loadingOpen } from '../../util/Util';

interface CriteriaProcess {
    criteria_of_process_id: number;
    name: string;
    min_unit: number;
    max_unit: number;
}

interface Form {
    criteria_of_process_id: number | null;
    name: string;
    min_unit: number | null;
    max_unit: number | null;
}

interface Error {
    criteria_of_process_id: boolean;
    name: boolean;
    min_unit: boolean;
    max_unit: boolean;
}
const CriteriaProcessPage = () => {
    const startPage = useRef(false);
    const [criteriaData, setCriteriaData] = useState<CriteriaProcess[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const initForm = {
        criteria_of_process_id: null,
        name: '',
        min_unit: null,
        max_unit: null,
    };
    const [form, setForm] = useState<Form>(initForm);
    const [errors, setErrors] = useState<Error>({
        criteria_of_process_id: false,
        name: false,
        min_unit: false,
        max_unit: false,
    });
    const [dialogMode, setDialogMode] = useState<'ADD' | 'EDIT' | null>(null);
    const [isOpenPopupAlert, setIsOpenPopupAlert] = useState<boolean>(false);
    const [messagePopupAlert, setMessagePopupAlert] = useState<string>('');
    const [isOpenPopupConfirm, setIsOpenPopupConfirm] = useState<boolean>(false);

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onClickDeleteData = async (data: CriteriaProcess) => {
        setIsOpenPopupConfirm(true);
        setForm(data);
    };

    const onConfirmDelete = async () => {
        try {
            loadingOpen();
            const response = await deleteCriteraiProcess(form.criteria_of_process_id);
            setIsOpenPopupConfirm(false);
            if (response && response.message === 'Success') {
                loadingClose();
                fetchCriteriaProcess();
                setMessagePopupAlert(response.payload.message ? response.payload.message : '');
                setIsOpenPopupAlert(!!response.payload.message);
            }
        } catch (error) {
            console.error('error :: ', error);
        } finally {
            loadingClose();
        }
    };

    const onClickEdit = (data: CriteriaProcess) => {
        setForm(data);
        setDialogMode('EDIT');
        setOpenDialog(true);
    };

    const onClickAdd = () => {
        setForm(initForm);
        setDialogMode('ADD');
        setOpenDialog(true);
    };

    const fetchCriteriaProcess = async () => {
        try {
            loadingOpen();
            const response = await getCriteraiProcess();
            if (response && response.message === 'Success') {
                loadingClose();
                setCriteriaData(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        } finally {
            loadingClose();
        }
    };

    useEffect(() => {
        if (startPage.current === false) {
            fetchCriteriaProcess();
            startPage.current = true;
        }
    });

    const onChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const onCloseDialog = () => {
        setOpenDialog(false);
        setForm(initForm);
        setDialogMode(null);
        setErrors({
            criteria_of_process_id: false,
            name: false,
            max_unit: false,
            min_unit: false,
        });
    };

    const validate = () => {
        const tempErrors: Error = {
            criteria_of_process_id: false,
            name: form.name === '',
            max_unit: isNullOrUndefined(form.max_unit),
            min_unit: isNullOrUndefined(form.min_unit),
        };
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === false);
    };

    const onSubmitCriteria = async () => {
        try {
            loadingOpen();
            if (validate()) {
                if (dialogMode === 'ADD') {
                    const response = await createCriteraiProcess(form);
                    if (response && response.message === 'Success') {
                        loadingClose();
                        setMessagePopupAlert(
                            response.payload.message ? response.payload.message : ''
                        );
                        onCloseDialog();
                        fetchCriteriaProcess();
                        setIsOpenPopupAlert(!!response.payload.message);
                    }
                } else {
                    const response = await updateCriteraiProcess(form.criteria_of_process_id, form);
                    if (response && response.message === 'Success') {
                        loadingClose();
                        setMessagePopupAlert(
                            response.payload.message ? response.payload.message : ''
                        );
                        onCloseDialog();
                        fetchCriteriaProcess();
                        setIsOpenPopupAlert(!!response.payload.message);
                    }
                }
            }
        } catch (error) {
            console.error('error :: ', error);
        } finally {
            loadingClose();
        }
    };

    const onClosePopup = () => {
        setIsOpenPopupAlert(false);
        setMessagePopupAlert('');
    };

    const renderDialogEditCriteria = () => {
        return (
            <Dialog open={openDialog} onClose={onCloseDialog} fullWidth>
                <DialogTitle sx={{ padding: '16px 24px 8px 24px', position: 'relative' }}>
                    <Typography textAlign="center" variant="h6" component="div">
                        {dialogMode === 'ADD' ? 'เพิ่มเกณฑ์คำนวณ' : 'แก้ไขเกณฑ์คำนวณ'}
                    </Typography>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                        onClick={onCloseDialog}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ padding: 3 }}>
                    <Grid container spacing={2} paddingTop={1}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="ตำแหน่ง"
                                name="name"
                                size="small"
                                fullWidth
                                value={form.name || ''}
                                onChange={onChangeTextField}
                                error={errors.name}
                                helperText={errors.name && 'This field is required'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="หน่วยกิตต่ำสุด"
                                name="min_unit"
                                size="small"
                                fullWidth
                                value={form.min_unit || ''}
                                onChange={onChangeTextField}
                                error={errors.min_unit}
                                helperText={errors.min_unit && 'This field is required'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="หน่วยกิตสูงสุด"
                                name="max_unit"
                                size="small"
                                fullWidth
                                value={form.max_unit || ''}
                                onChange={onChangeTextField}
                                error={errors.max_unit}
                                helperText={errors.max_unit && 'This field is required'}
                            />
                        </Grid>
                    </Grid>
                    <Grid container marginTop={2}>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} gap={2}>
                            <Button variant="contained" onClick={onSubmitCriteria}>
                                {dialogMode === 'ADD' ? 'เพิ่ม' : 'ยืนยันการแก้ไข'}
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <div>
            <Box sx={{ height: '100%' }}>
                <Box>
                    {renderDialogEditCriteria()}
                    <PopupAlert
                        isOpen={isOpenPopupAlert}
                        onClose={onClosePopup}
                        title={<div>{messagePopupAlert}</div>}
                        type="SUCCESS"
                    />
                    <PopupConfirm
                        isOpen={isOpenPopupConfirm}
                        onClose={() => setIsOpenPopupConfirm(false)}
                        onConfirm={onConfirmDelete}
                        title={'คุณต้องการลบเกณฑ์คำนวณ ?'}
                    />
                    <Typography textAlign="start" variant="h6" component="div">
                        เกณฑ์คำนวณ
                    </Typography>
                    <Divider />
                    <Box component={'div'} display={'flex'} justifyContent={'flex-end'} p={1}>
                        <Button onClick={onClickAdd} variant="contained">
                            เพิ่มเกณฑ์คำนวณ
                        </Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ตำแหน่ง</TableCell>
                                    <TableCell align="center">หน่วยกิตต่ำสุด</TableCell>
                                    <TableCell align="center">หน่วยกิตสูงสุด</TableCell>
                                    <TableCell align="center">แก้ไข</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {criteriaData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.criteria_of_process_id}>
                                            <TableCell align="left" sx={{ minWidth: '120px' }}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.min_unit}</TableCell>
                                            <TableCell align="center">{row.max_unit}</TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{ minWidth: '80px', padding: 0 }}
                                            >
                                                <Tooltip title="แก้ไข" placement="top">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => onClickEdit(row)}
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
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={criteriaData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelDisplayedRows={({ from, to, count }) =>
                                `แสดง ${from} ถึง ${to} จาก ${count}`
                            }
                            labelRowsPerPage="จำนวนแถวต่อหน้า"
                        />
                    </TableContainer>
                </Box>
            </Box>
        </div>
    );
};

export default CriteriaProcessPage;
