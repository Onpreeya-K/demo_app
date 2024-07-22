import {
    Box,
    Button,
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

const Login = () => {
    const navigate = useNavigate();

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
                sessionStorage.setItem(
                    'ROLE',
                    response.payload.role.toUpperCase()
                );
                sessionStorage.setItem(
                    'DATA',
                    JSON.stringify(response.payload.data)
                );
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

    return (
        <ThemeProvider theme={theme}>
            <Box
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
            </Box>
        </ThemeProvider>
    );
};

export default Login;
