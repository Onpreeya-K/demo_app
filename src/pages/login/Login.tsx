import {
    Box,
    Button,
    Container,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from '@mui/material';
import appConfig from '../../config/application-config.json';
import { useNavigate } from 'react-router-dom';
// import router from "next/router";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log('data :: ',data);
        const userName = (data.get('username') as string).toUpperCase();
        const password = (data.get('password') as string).toUpperCase();
        if (userName === 'ADMIN' && password === 'ADMIN') {
            // console.log('success');
            navigate('/schedule');
            sessionStorage.setItem('ROLE', 'ADMIN');
        } else if (userName === 'USER' && password === 'USER') {
            navigate('/schedule');
            sessionStorage.setItem('ROLE', 'USER');
        }
        // data.get('username') as string, data.get('password') as string
    };

    const theme = createTheme({
        typography: {
            fontFamily: appConfig.fontFamily,
            fontSize: 16,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {/* <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography component="h2" variant="h5">
                    ระบบเบิกเงินค่าตอบแทนการสอน
                </Typography>
                <Typography component="h2" variant="h5">
                    คณะศึกษาศาสตร์ มหาวิทยาลัยมหาสารคาม
                </Typography>
                <Typography component="h2" variant="h5">
                    เข้าสู่ระบบ
                </Typography>
            </Box> */}
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* <Typography component="h2" variant="h5">
                    ระบบเบิกเงินค่าตอบแทนการสอน
                </Typography>
                <Typography component="h2" variant="h5">
                    คณะศึกษาศาสตร์ มหาวิทยาลัยมหาสารคาม
                </Typography> */}
                    <Typography component="h2" variant="h5">
                        เข้าสู่ระบบ
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
