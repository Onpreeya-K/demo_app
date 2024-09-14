import {
    Box,
    Button,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import educationMSULogo from '../../asset/images/Education_MSU_Logo.svg';
import appConfig from '../../config/application-config.json';
import { callLoginService } from '../../services/Authen-service';
import { setAccessToken } from '../../util/Util';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const username = data.get('username') as string;
            const password = data.get('password') as string;
            let payloadData = {
                username: username,
                password: password,
            };
            const response = await callLoginService(payloadData);
            if (response && response.message === 'success') {
                setAccessToken(response.payload.token);
                sessionStorage.setItem('ROLE', response.payload.role.toUpperCase());
                sessionStorage.setItem('DATA', JSON.stringify(response.payload.data));
                navigate('/schedule');
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
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

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                {isDesktop && (
                    <>
                        <Grid
                            item
                            xs={false}
                            sm={5}
                            md={8}
                            sx={{
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: '#FD7301',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            container
                            justifyContent="center"
                            alignItems={'center'}
                        >
                            <img
                                src={educationMSULogo}
                                alt="Example"
                                style={{ width: '40%', height: '30%' }}
                            />
                        </Grid>
                    </>
                )}
                {/* <Grid
                    item
                    xs={false}
                    sm={5}
                    md={8}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#FD7301',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    container
                    justifyContent="center"
                    alignItems={'center'}
                >
                    <img
                        src={educationMSULogo}
                        alt="Example"
                        style={{ width: '40%', height: '30%' }}
                    />
                </Grid> */}
                <Grid
                    item
                    xs={12}
                    sm={isDesktop ? 7 : 12}
                    md={isDesktop ? 4 : 12}
                    component={Paper}
                    elevation={6}
                    square
                    container
                    alignItems={'center'}
                    sx={{
                        ...(!isDesktop && { backgroundColor: '#FD7301' }),
                    }}
                >
                    <Grid container item xs={12}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                ...(!isDesktop && { padding: 2, borderRadius: 2 }),
                            }}
                        >
                            {!isDesktop && (
                                <img
                                    src={educationMSULogo}
                                    alt="Example"
                                    style={{ width: '50%', height: '40%', marginBottom: '16px' }}
                                />
                            )}
                            <Typography
                                variant={isDesktop ? 'h5' : 'h6'}
                                align="center"
                                color="#223C5A"
                            >
                                ระบบเบิกเงินค่าตอนแทนการสอน
                                <br />
                                คณะศึกษาศาสตร์
                                <br />
                                มหาวิทยาลัยมหาสารคาม
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    InputLabelProps={{
                                        style: { color: '#223C5A' },
                                    }}
                                    InputProps={{
                                        sx: {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#223C5A',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#223C5A',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#223C5A',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    autoComplete="current-password"
                                    type={showPassword ? 'text' : 'password'}
                                    InputLabelProps={{
                                        style: { color: '#223C5A' },
                                    }}
                                    InputProps={{
                                        sx: {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#223C5A',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#223C5A',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#223C5A',
                                            },
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: '#223C5A',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#3A6495',
                                        },
                                    }}
                                >
                                    เข้าสู่ระบบ
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            {/* <Box
                sx={{
                    height: `${window.innerHeight}px`,
                    width: `${window.innerWidth}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Box
                    sx={{
                        width: '50%',
                        padding: '2rem',
                        backgroundColor: '#FD7301',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <img
                        src={educationMSULogo}
                        alt="Example"
                        style={{ width: '40%', height: '30%' }}
                    />
                    <br />
                    <Typography
                        component="h2"
                        variant="h5"
                        align="center"
                        color="#fff"
                    >
                        ระบบเบิกเงินค่าตอนแทนการสอน คณะศึกษาศาสตร์
                        <br />
                        มหาวิทยาลัยมหาสารคาม
                    </Typography>
                    <Typography
                        component="h2"
                        variant="h5"
                        align="center"
                        color="#fff"
                        // mt={2}
                    >
                        เข้าสู่ระบบ
                    </Typography>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ width: '50%' }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="รหัสผู้ใช้"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                InputProps={{
                                    style: { backgroundColor: '#fff' },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="รหัสผ่าน"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    style: { backgroundColor: '#fff' },
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: '#333',
                                    color: '#fff',
                                }}
                            >
                                เข้าสู่ระบบ
                            </Button>
                        </Box>
                    </div>
                </Box>
            </Box> */}
        </ThemeProvider>
    );
};

export default Login;
