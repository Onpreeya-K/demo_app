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
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import PopupConfirm from '../../components/popupConfirm/Popup-Confirm';
import SnackBarAlert from '../../components/snackbar/Snackbar-alert';
import {
    createCriteraiProcess,
    deleteCriteraiProcess,
    getCriteraiProcess,
    updateCriteraiProcess,
} from '../../services/Criteria-service';
import { isNullOrUndefined } from '../../util/Util';

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
    const [isOpenSnackBar, setIsOpenSnackBar] = useState<boolean>(false);
    const [messageSnackBar, setMessageSnackBar] = useState<string>('');
    const [isOpenPopupConfirm, setIsOpenPopupConfirm] =
        useState<boolean>(false);

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'ตำแหน่ง',
            align: 'left',
            headerAlign: 'center',
            minWidth: 300,
            flex: 1,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
        },
        {
            field: 'min_unit',
            headerName: 'หน่วยกิตต่ำสุด',
            align: 'center',
            headerAlign: 'center',
            width: 300,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
        },
        {
            field: 'max_unit',
            headerName: 'หน่วยกิตสูงสุด',
            align: 'center',
            headerAlign: 'center',
            width: 300,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
        },
        {
            field: 'edit',
            headerName: 'แก้ไข',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <div>
                    <Tooltip title="แก้ไข" placement="top">
                        <IconButton
                            size="small"
                            onClick={() => onClickEdit(params.row)}
                        >
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="ลบ" placement="top">
                        <IconButton
                            size="small"
                            onClick={() => onClickDeleteData(params.row)}
                        >
                            <DeleteOutlineIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const onClickDeleteData = async (data: CriteriaProcess) => {
        setIsOpenPopupConfirm(true);
        setForm(data);
    };

    const onConfirmDelete = async () => {
        const response = await deleteCriteraiProcess(
            form.criteria_of_process_id
        );
        setIsOpenPopupConfirm(false);
        if (response && response.message === 'success') {
            fetchCriteriaProcess();
            setIsOpenSnackBar(true);
            setMessageSnackBar('ลบเกณฑ์คำนวณสำเร็จ');
        }
    };

    const onClickEdit = (data: CriteriaProcess) => {
        setForm(data);
        setDialogMode('EDIT');
        setOpenDialog(true);
    };

    const onClickAdd = () => {
        setDialogMode('ADD');
        setOpenDialog(true);
    };

    const fetchCriteriaProcess = async () => {
        try {
            const response = await getCriteraiProcess();
            if (response && response.message === 'success') {
                setCriteriaData(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
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
        if (validate()) {
            if (dialogMode === 'ADD') {
                const response = await createCriteraiProcess(form);
                if (response && response.message === 'success') {
                    setMessageSnackBar('เพิ่มเกณฑ์คำนวณสำเร็จ');
                    onCloseDialog();
                    fetchCriteriaProcess();
                    setIsOpenSnackBar(true);
                }
            } else {
                const response = await updateCriteraiProcess(
                    form.criteria_of_process_id,
                    form
                );
                if (response && response.message === 'success') {
                    setMessageSnackBar('แก้ไขเกณฑ์คำนวณสำเร็จ');
                    onCloseDialog();
                    fetchCriteriaProcess();
                    setIsOpenSnackBar(true);
                }
            }
        }
    };

    const onCloseSnackBar = () => {
        setIsOpenSnackBar(false);
        setMessageSnackBar('');
    };

    const renderDialogEditCriteria = () => {
        return (
            <Dialog open={openDialog} onClose={onCloseDialog} fullWidth>
                <DialogTitle sx={{ padding: '16px 24px 8px 24px' }}>
                    <Typography textAlign="center" variant="h6" component="div">
                        {dialogMode === 'ADD'
                            ? 'เพิ่มเกณฑ์คำนวณ'
                            : 'แก้ไขเกณฑ์คำนวณ'}
                    </Typography>
                    <Divider />
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
                                helperText={
                                    errors.name && 'This field is required'
                                }
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
                                helperText={
                                    errors.min_unit && 'This field is required'
                                }
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
                                helperText={
                                    errors.max_unit && 'This field is required'
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container marginTop={2}>
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            justifyContent={'center'}
                            gap={2}
                        >
                            <Button variant="outlined" onClick={onCloseDialog}>
                                ยกเลิก
                            </Button>
                            <Button
                                variant="contained"
                                onClick={onSubmitCriteria}
                            >
                                {dialogMode === 'ADD'
                                    ? 'เพิ่ม'
                                    : 'ยืนยันการแก้ไข'}
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
                    <SnackBarAlert
                        open={isOpenSnackBar}
                        onClose={onCloseSnackBar}
                        message={messageSnackBar}
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
                    <Box
                        component={'div'}
                        display={'flex'}
                        justifyContent={'flex-end'}
                        p={1}
                    >
                        <Button onClick={onClickAdd} variant="outlined">
                            เพิ่มเกณฑ์คำนวณ
                        </Button>
                    </Box>
                    <DataGrid
                        rows={criteriaData}
                        columns={columns}
                        getRowId={(row) => row.criteria_of_process_id}
                        autoHeight
                        // initialState={{
                        //     pagination: {
                        //         paginationModel: {
                        //             page: 0,
                        //             pageSize: 10,
                        //         },
                        //     },
                        // }}
                        // pageSizeOptions={[5, 10]}
                        disableRowSelectionOnClick
                        hideFooterPagination
                    />
                </Box>
            </Box>
        </div>
    );
};

export default CriteriaProcessPage;
