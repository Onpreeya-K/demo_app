import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment,
    TextField,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import { BsTable } from 'react-icons/bs';
import { FaCalculator } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdOutlineCalculate } from 'react-icons/md';
import { PiUserListBold } from 'react-icons/pi';
import { TbLogout } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../config/application-config.json';
import { IProfessor } from '../../interface/Professor-interface';
import { updatePassword } from '../../services/User-service';
import { getDataProfessor, getRoleUser } from '../../util/Util';
import PopupAlert from '../popupAlert/Popup-Alert';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface ProfessorData {
    teacher_id: string;
    prefix: string;
    fullname: string;
    management_position: {
        m_id: number;
        criteria_of_process_id: number;
        name: string;
    };
    academic_position: {
        a_id: number;
        name: string;
    };
}

interface MenuDrawerProps {
    children: ReactNode;
}

const MenuDrawer = ({ children }: MenuDrawerProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [professorData, setProfessorData] = useState<ProfessorData>();
    const [isOpenPopupAlert, setIsOpenPopupAlert] = useState<boolean>(false);
    const [messagePopupAlert, setMessagePopupAlert] = useState<string>('');
    const [typePopupAlert, setTypePopupAlert] = useState<'ERROR' | 'SUCCESS' | 'WARNING'>(
        'WARNING'
    );
    const [isChangePassword, setIsChangePassword] = useState<boolean>();
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const onChangePage = (path: string) => {
        navigate(path);
        if (!isDesktop) {
            setOpen(false);
        }
    };

    const onClickLogout = () => {
        navigate('/login');
        sessionStorage.clear();
    };

    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    const checkWindowSize = () => {
        let windowWidth: number = 0;
        if (typeof window !== 'undefined') {
            windowWidth = window.innerWidth;
        }
        if (windowWidth >= 1024) {
            setIsDesktop(true);
        } else {
            setIsDesktop(false);
        }
    };

    useEffect(() => {
        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);
        return () => window.removeEventListener('resize', checkWindowSize);
    }, []);

    const drawerListMenu = () => {
        const menuList = appConfig.menu.filter((menu) => {
            if (getRoleUser() === appConfig.role.ADMIN) {
                return true;
            } else {
                return !['PROFESSOR-INFO', 'CRITERIA-OF-TEACH', 'CRITERIA-PROCESS'].includes(
                    menu.key
                );
            }
        });
        return (
            <List>
                {menuList.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItemButton
                            sx={{
                                color: '#FFFFFF',
                            }}
                            onClick={() => onChangePage(item.link)}
                        >
                            <ListItemIcon>
                                {item.key === 'PROFESSOR-INFO' && <PiUserListBold color="#FFF" />}
                                {item.key === 'CLASS_SCHEDULE' && <BsTable color="#FFF" />}
                                {item.key === 'DISBURSEMENT' && <GiReceiveMoney color="#FFF" />}
                                {item.key === 'CRITERIA-OF-TEACH' && (
                                    <MdOutlineCalculate color="#FFF" />
                                )}
                                {item.key === 'CRITERIA-PROCESS' && <FaCalculator color="#FFF" />}
                            </ListItemIcon>
                            <Typography variant="subtitle2" noWrap component="div" color="#FFFFFF">
                                {item.name}
                            </Typography>
                        </ListItemButton>
                    </React.Fragment>
                ))}
            </List>
        );
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const getNameFromSession = () => {
        const data = getDataProfessor();
        if (data) {
            const teacherData: IProfessor = JSON.parse(data);
            return teacherData.fullname;
        }
        return null;
    };

    const onClickViewInfo = () => {
        const data = getDataProfessor();
        if (data) {
            const teacherData: ProfessorData = JSON.parse(data);
            setProfessorData(teacherData);
            setOpenDialog(true);
        }
    };

    const onCloseDialog = () => {
        setProfessorData(undefined);
        setOpenDialog(false);
    };

    const onClickChangePassword = () => {
        setIsChangePassword(!isChangePassword);
    };

    const onConfirmChangePassword = async () => {
        try {
            if (newPassword !== confirmPassword) {
                setPasswordError(true);
                setErrorMessage('รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน');
            } else {
                setPasswordError(false);
                setErrorMessage('');
                const payload = {
                    old_password: oldPassword,
                    new_password: newPassword,
                };
                const response = await updatePassword(professorData?.teacher_id, payload);
                if (response && response.message === 'success') {
                    setMessagePopupAlert('เปลี่ยนรหัสผ่านสำเร็จ');
                    setTypePopupAlert('SUCCESS');
                    setIsOpenPopupAlert(true);
                    onCancelChangePassword();
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const togglePasswordVisibility = (type: string) => {
        if (type === 'old') {
            setShowOldPassword((prev) => !prev);
        } else if (type === 'new') {
            setShowNewPassword((prev) => !prev);
        } else if (type === 'confirm') {
            setShowConfirmPassword((prev) => !prev);
        }
    };

    const onCancelChangePassword = () => {
        setIsChangePassword(!isChangePassword);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError(false);
        setErrorMessage('');
    };

    const onClosePopupAlert = () => {
        setIsOpenPopupAlert(false);
        setMessagePopupAlert('');
    };

    const theme = createTheme({
        typography: {
            fontFamily: appConfig.fontFamily,
            fontSize: 16,
        },
        palette: {
            mode: 'light',
            primary: {
                main: '#2c517b',
            },
            error: {
                main: '#ff0000',
            },
            warning: {
                main: '#FFC107',
            },
        },
        components: {
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined',
                    InputLabelProps: {
                        shrink: true,
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        border: '1px solid #e0e0e0',
                    },
                },
            },
        },
    });

    const renderDialogInfo = () => {
        return (
            <Dialog open={openDialog} fullWidth>
                <DialogTitle sx={{ padding: '16px 24px 8px 24px', position: 'relative' }}>
                    <Typography textAlign="center" variant="h6" component="div">
                        ข้อมูลอาจารย์
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
                                fullWidth
                                label="รหัสอาจารย์"
                                size="medium"
                                value={professorData?.teacher_id || ''}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ชื่อ - นามสกุล"
                                size="medium"
                                value={professorData?.fullname || ''}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ตำแหน่งทางวิชาการ"
                                size="medium"
                                value={professorData?.academic_position.name || ''}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ตำแหน่งบริหาร"
                                size="medium"
                                value={professorData?.management_position.name || ''}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>
                    {isChangePassword && (
                        <Grid
                            container
                            component={'div'}
                            marginTop={2}
                            rowSpacing={2}
                            sx={{
                                border: 'solid 3px #A7C8EE',
                                borderRadius: 2,
                                padding: '0px 16px',
                            }}
                        >
                            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                <TextField
                                    fullWidth
                                    label="รหัสผ่านเดิม"
                                    size="small"
                                    type={showOldPassword ? 'text' : 'password'}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    InputProps={{
                                        autoComplete: 'new-password',
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('old')}
                                                    edge="end"
                                                >
                                                    {showOldPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                <TextField
                                    fullWidth
                                    label="รหัสผ่านใหม่"
                                    size="small"
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setPasswordError(false);
                                        setErrorMessage('');
                                    }}
                                    error={passwordError}
                                    InputProps={{
                                        autoComplete: 'new-password',
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('new')}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                <TextField
                                    fullWidth
                                    label="ยืนยันรหัสผ่านใหม่"
                                    size="small"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setPasswordError(false);
                                        setErrorMessage('');
                                    }}
                                    error={passwordError}
                                    helperText={passwordError ? errorMessage : ''}
                                    InputProps={{
                                        autoComplete: 'new-password',
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        togglePasswordVisibility('confirm')
                                                    }
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                display={'flex'}
                                justifyContent={'center'}
                                marginBottom={2}
                                gap={2}
                            >
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={onConfirmChangePassword}
                                >
                                    ยืนยันการเปลี่ยนรหัสผ่าน
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={onCancelChangePassword}
                                >
                                    ยกเลิก
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                    {!isChangePassword && (
                        <Grid container component={'div'} marginTop={2}>
                            <Grid
                                item
                                xs={12}
                                display={'flex'}
                                justifyContent={'center'}
                                marginBottom={2}
                            >
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={onClickChangePassword}
                                >
                                    เปลี่ยนรหัสผ่าน
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    open={open}
                    sx={{
                        ...(isDesktop && { display: 'none' }),
                        backgroundColor:
                            getRoleUser() === appConfig.role.ADMIN ? '#FD7301' : '#223C5A',
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            sx={{
                                display: 'flex',
                                marginLeft: 2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            ระบบเบิกเงินค่าตอบแทนการสอน
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor:
                                getRoleUser() === appConfig.role.ADMIN ? '#FD7301' : '#223C5A',
                        },
                    }}
                    open={open}
                    onClose={toggleDrawer(false)}
                >
                    <DrawerHeader
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <IconButton onClick={toggleDrawer(false)}>
                            <ChevronLeftIcon sx={{ color: '#FFFFFF' }} />
                        </IconButton>
                    </DrawerHeader>
                    <Divider sx={{ borderColor: '#FFFFFF' }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px 0px 20px 0px',
                        }}
                    >
                        <Typography variant="subtitle2" noWrap component="div" color="#FFFFFF">
                            {getNameFromSession()}
                        </Typography>
                        <AccountCircleIcon
                            sx={{
                                fontSize: 50,
                                color: '#FFFFFF',
                            }}
                            onClick={onClickViewInfo}
                        />
                    </Box>
                    <Divider sx={{ borderColor: '#FFFFFF' }} />
                    {drawerListMenu()}
                    <div
                        style={{
                            position: 'fixed',
                            width: `${drawerWidth}px`,
                            height: '64px',
                            bottom: 0,
                            alignContent: 'center',
                        }}
                    >
                        <Divider sx={{ borderColor: '#FFFFFF' }} />
                        <Button
                            fullWidth
                            startIcon={<TbLogout color="#FFF" />}
                            sx={{ height: '48px' }}
                            onClick={onClickLogout}
                        >
                            <Typography variant="subtitle2" noWrap component="div" color="#FFFFFF">
                                ออกจากระบบ
                            </Typography>
                        </Button>
                    </div>
                </Drawer>
                <Drawer
                    sx={{
                        width: isDesktop ? drawerWidth : 'none',
                        '& .MuiDrawer-paper': {
                            width: isDesktop ? drawerWidth : 'none',
                            boxSizing: 'border-box',
                            backgroundColor:
                                getRoleUser() === appConfig.role.ADMIN ? '#FD7301' : '#223C5A',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={isDesktop ? isDesktop : false}
                >
                    <DrawerHeader
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                // ...(!isDesktop && { display: 'none' }),
                                color: '#FFF',
                                fontSize: 16,
                            }}
                        >
                            ระบบเบิกเงินค่าตอบแทนการสอน
                        </Box>
                    </DrawerHeader>
                    <Divider sx={{ borderColor: '#FFFFFF' }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px 0px 20px 0px',
                        }}
                    >
                        <Typography variant="subtitle2" noWrap component="div" color="#FFFFFF">
                            {getNameFromSession()}
                        </Typography>
                        <AccountCircleIcon
                            sx={{
                                fontSize: 50,
                                color: '#FFFFFF',
                            }}
                            onClick={onClickViewInfo}
                        />
                    </Box>
                    <Divider sx={{ borderColor: '#FFFFFF' }} />
                    {drawerListMenu()}
                    <div
                        style={{
                            position: 'fixed',
                            width: `${drawerWidth}px`,
                            height: '64px',
                            bottom: 0,
                            alignContent: 'center',
                        }}
                    >
                        <Divider sx={{ borderColor: '#FFFFFF' }} />
                        <Button
                            fullWidth
                            startIcon={<TbLogout color="#FFF" />}
                            sx={{ height: '48px' }}
                            onClick={onClickLogout}
                        >
                            <Typography variant="subtitle2" noWrap component="div" color="#FFFFFF">
                                ออกจากระบบ
                            </Typography>
                        </Button>
                    </div>
                </Drawer>
                <Box
                    component="main"
                    id="childMenu"
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        width: isDesktop ? `calc(100% - 240px)` : '100%',
                        ...(!isDesktop && { marginTop: 7 }),
                    }}
                >
                    <PopupAlert
                        isOpen={isOpenPopupAlert}
                        onClose={onClosePopupAlert}
                        title={<div>{messagePopupAlert}</div>}
                        type={typePopupAlert}
                    />
                    {renderDialogInfo()}
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};
export default MenuDrawer;
