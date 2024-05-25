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
import { getRoleUser } from '../../util/Util';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
    isDesktop?: boolean;
}>(({ theme, open, isDesktop }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    height: `calc(100vh - 56px)`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // marginLeft: 0,
    }),
    ...(isDesktop && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        height: '100vh',
    }),
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
const MenuDrawer: React.FC<MenuDrawerProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

    const onChangePage = (path: string) => {
        navigate(path);
    };

    const onClickLogout = () => {
        navigate('/login');
        sessionStorage.removeItem('ROLE');
    };

    const [isDesktop, setIsDesktop] = useState<boolean>(true);
    const checkWindowSize = () => {
        let windowWidth: number = 0;
        if (typeof window !== 'undefined') {
            windowWidth = window.innerWidth;
        }
        if (windowWidth >= 1024) {
            // setOpen(false);
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
                return menu.key !== 'PROFESSOR-INFO';
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
            MuiDrawer: {
                // styleOverrides: {
                //     root: {
                //         backgroundColor:
                //             appConfig.component.appBar.backgroundColor,
                //     },
                // },
            },
        },
    });

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="absolute"
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
                        {/* <Typography variant="h6" noWrap component="div">
                            ระบบเบิกเงินค่าตอบแทนการสอน
                        </Typography> */}
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
                        <IconButton
                            onClick={toggleDrawer(false)}
                        >
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
                            Onpreeya Kitphuek
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
                        {/* <IconButton
                            onClick={handleDrawerClose}
                            sx={{ ...(isDesktop && { display: 'none' }) }}
                        >
                            <ChevronLeftIcon sx={{ color: '#FFFFFF' }} />
                        </IconButton> */}
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
                            Onpreeya Kitphuek
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
                <Main open={open} isDesktop={isDesktop}>
                    <DrawerHeader
                        sx={{ ...(isDesktop && { display: 'none' }) }}
                    />
                    {children}
                </Main>
            </Box>
        </ThemeProvider>
    );
};
export default MenuDrawer;