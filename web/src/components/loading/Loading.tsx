import { Box, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

const CustomLoading = () => {
    const [loadingOpen, setLoadingOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleOpen = () => {
            setLoadingOpen(true);
        };
        document.addEventListener('backdrop.open', handleOpen);
        return () => {
            document.removeEventListener('backdrop.open', handleOpen);
        };
    }, []);

    useEffect(() => {
        const handleClose = () => {
            setLoadingOpen(false);
        };
        document.addEventListener('backdrop.close', handleClose);
        return () => {
            document.removeEventListener('backdrop.close', handleClose);
        };
    }, []);

    return (
        <Backdrop
            sx={{
                color: '#2C517B',
                zIndex: (theme) => theme.zIndex.tooltip + 100,
                backgroundColor: '#FFFFFFAB',
            }}
            open={loadingOpen}
        >
            <Box
                component={'div'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                gap={1}
            >
                <CircularProgress color="inherit" />
                <Typography variant="subtitle1">กรุณารอสักครู่</Typography>
            </Box>
        </Backdrop>
    );
};

export default CustomLoading;
