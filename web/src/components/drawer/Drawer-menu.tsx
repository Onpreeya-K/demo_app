import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
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
import { GiReceiveMoney } from 'react-icons/gi';
import { PiUserListBold } from 'react-icons/pi';
import { TbLogout } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../config/application-config.json';
import { getDataProfessor, getRoleUser } from '../../util/Util';
import { FaCalculator } from 'react-icons/fa';
import { MdOutlineCalculate } from 'react-icons/md';
import { IProfessor } from '../../interface/Professor-interface';

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

// const Sidebar: React.FC<Props> = ({ children, loading, window }) => {
interface MenuDrawerProps {
    children: ReactNode;
}
const MenuDrawer = ({ children }: MenuDrawerProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

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
                return ![
                    'PROFESSOR-INFO',
                    'CRITERIA-OF-TEACH',
                    'CRITERIA-PROCESS',
                ].includes(menu.key);
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
                                {item.key === 'PROFESSOR-INFO' && (
                                    <PiUserListBold color="#FFF" />
                                )}
                                {item.key === 'CLASS_SCHEDULE' && (
                                    <BsTable color="#FFF" />
                                )}
                                {item.key === 'DISBURSEMENT' && (
                                    <GiReceiveMoney color="#FFF" />
                                )}
                                {item.key === 'CRITERIA-OF-TEACH' && (
                                    <MdOutlineCalculate color="#FFF" />
                                )}
                                {item.key === 'CRITERIA-PROCESS' && (
                                    <FaCalculator color="#FFF" />
                                )}
                            </ListItemIcon>
                            <Typography
                                variant="subtitle2"
                                noWrap
                                component="div"
                                color="#FFFFFF"
                            >
                                {item.name}
                            </Typography>
                        </ListItemButton>
                    </React.Fragment>
                ))}
            </List>
        );
    };

    const theme = createTheme({
        typography: {
            fontFamily: appConfig.fontFamily,
            fontSize: 16,
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
        },
    });

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
                            getRoleUser() === appConfig.role.ADMIN
                                ? '#FD7301'
                                : '#223C5A',
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
                                getRoleUser() === appConfig.role.ADMIN
                                    ? '#FD7301'
                                    : '#223C5A',
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
                        <Typography
                            variant="subtitle2"
                            noWrap
                            component="div"
                            color="#FFFFFF"
                        >
                            {getNameFromSession()}
                        </Typography>
                        <AccountCircleIcon
                            sx={{
                                fontSize: 50,
                                color: '#FFFFFF',
                            }}
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
                            <Typography
                                variant="subtitle2"
                                noWrap
                                component="div"
                                color="#FFFFFF"
                            >
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
                                getRoleUser() === appConfig.role.ADMIN
                                    ? '#FD7301'
                                    : '#223C5A',
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
                        <Typography
                            variant="subtitle2"
                            noWrap
                            component="div"
                            color="#FFFFFF"
                        >
                            {getNameFromSession()}
                        </Typography>
                        <AccountCircleIcon
                            sx={{
                                fontSize: 50,
                                color: '#FFFFFF',
                            }}
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
                            <Typography
                                variant="subtitle2"
                                noWrap
                                component="div"
                                color="#FFFFFF"
                            >
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
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};
export default MenuDrawer;
