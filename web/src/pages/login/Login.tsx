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
import { callLoginService } from '../../services/Authen-service';
import { setAccessToken } from '../../util/Util';
// import router from "next/router";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const userName = (data.get('username') as string)
            const password = (data.get('password') as string)
            let payloadData = {
                username: userName,
                password: password
            }
            const response = await callLoginService(payloadData);
            if (response && response.message === 'success') {
                console.log('response :: ', response);
                setAccessToken(response.payload.token);
                sessionStorage.setItem('ROLE', response.payload.role.toUpperCase());
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
    });

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
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
