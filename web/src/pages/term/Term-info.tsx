import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormHelperText,
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
import { addTerm, getAllTerm, updateTerm } from '../../services/Term-service';
import { isNullOrUndefined } from '../../util/Util';

interface Term {
    term_of_year_id: number;
    term: string;
}

const TermPage = () => {
    const [termList, setTermList] = useState<Term[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const startPage = useRef(false);

    const [isOpenPopupAlert, setIsOpenPopupAlert] = useState<boolean>(false);
    const [messagePopupAlert, setMessagePopupAlert] = useState<string>('');
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [dialogMode, setDialogMode] = useState<'ADD' | 'EDIT' | null>(null);

    const [term, setTerm] = useState<string>('');
    const [termId, setTermId] = useState<number | null>(null);
    const [errorTerm, setErrorTerm] = useState<boolean>(false);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchAllTerm = async () => {
        try {
            const response = await getAllTerm();
            if (response && response.message === 'Success') {
                setTermList(response.payload);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (startPage.current === false) {
            fetchAllTerm();
            startPage.current = true;
        }
    });

    const onClosePopup = () => {
        setIsOpenPopupAlert(false);
        setMessagePopupAlert('');
    };

    const onCloseDialog = () => {
        setTerm('');
        setTermId(null);
        setOpenDialog(false);
    };

    const onClickAddTerm = () => {
        setDialogMode('ADD');
        setTerm('');
        setOpenDialog(true);
    };

    const onClickEdit = (row: Term) => {
        setDialogMode('EDIT');
        setTermId(row.term_of_year_id);
        setTerm(row.term);
        setOpenDialog(true);
    };

    const onSubmitAddTerm = async () => {
        try {
            if (!isNullOrUndefined(term)) {
                const payload = {
                    term: term.trim(),
                };
                if (dialogMode === 'ADD') {
                    const response = await addTerm(payload);
                    if (response && response.message === 'Success') {
                        setIsOpenPopupAlert(true);
                        setMessagePopupAlert('เพิ่มปีการศึกษาสำเร็จ');
                        onCloseDialog();
                        await fetchAllTerm();
                    }
                } else {
                    const response = await updateTerm(termId, payload);
                    if (response && response.message === 'Success') {
                        setIsOpenPopupAlert(true);
                        setMessagePopupAlert('แก้ไขปีการศึกษาสำเร็จ');
                        onCloseDialog();
                        await fetchAllTerm();
                    }
                }
            } else {
                setErrorTerm(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onChangeTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTerm(value);
        setErrorTerm(!value);
    };

    const renderDialogAddTerm = () => {
        return (
            <Dialog open={openDialog} onClose={onCloseDialog} fullWidth>
                <DialogTitle sx={{ padding: '16px 24px 8px 24px', position: 'relative' }}>
                    <Typography textAlign="center" variant="h6" component="div">
                        {dialogMode === 'ADD' ? 'เพิ่มปีการศึกษา' : 'แก้ไขปีการศึกษา'}
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
                                label="ปีการศึกษา"
                                name="name"
                                size="small"
                                fullWidth
                                value={term || ''}
                                onChange={onChangeTerm}
                                error={errorTerm}
                                helperText={errorTerm && 'กรุณาระบุปีการศึกษา'}
                            />
                            <FormHelperText>
                                กรุณากรอกปีการศึกษาในรูปแบบ x/(ปี พ.ศ.) เช่น 1/2567 หรือ 2/2567
                            </FormHelperText>
                        </Grid>
                    </Grid>
                    <Grid container marginTop={2}>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} gap={2}>
                            <Button variant="contained" onClick={onSubmitAddTerm}>
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
                    {renderDialogAddTerm()}
                    <PopupAlert
                        isOpen={isOpenPopupAlert}
                        onClose={onClosePopup}
                        title={<div>{messagePopupAlert}</div>}
                        type="SUCCESS"
                    />
                    <Typography textAlign="start" variant="h6" component="div">
                        ปีการศึกษา
                    </Typography>
                    <Divider />
                    <Box component={'div'} display={'flex'} justifyContent={'flex-end'} p={1}>
                        <Button onClick={onClickAddTerm} variant="contained">
                            เพิ่มปีการศึกษา
                        </Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ปีการศึกษา</TableCell>
                                    <TableCell align="center">แก้ไข</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {termList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.term_of_year_id}>
                                            <TableCell align="left" sx={{ minWidth: '120px' }}>
                                                {row.term}
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: '120px' }}>
                                                <Tooltip title="แก้ไข" placement="top">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => onClickEdit(row)}
                                                    >
                                                        <EditIcon fontSize="inherit" />
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
                            count={termList.length}
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

export default TermPage;
