import InfoIcon from '@mui/icons-material/Info';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    styled,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface ModalOpenEventDetail {
    message: string;
    title: string;
}

const PopupError: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');

    useEffect(() => {
        const handleModalOpen = (event: CustomEvent<ModalOpenEventDetail>) => {
            setModalMessage(event.detail.message);
            setModalOpen(true);
        };
        document.addEventListener('modal.open', handleModalOpen as EventListener);
        return () => {
            document.removeEventListener('modal.open', handleModalOpen as EventListener);
        };
    }, []);

    const handleModalClose = () => {
        setModalOpen(false);
        setModalMessage('');
    };

    const TitleConfirmModal = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    });

    return (
        <Dialog
            open={modalOpen}
            sx={{
                '& .MuiDialog-paper': {
                    width: window.innerWidth >= 1024 ? '20%' : '80%',
                },
            }}
        >
            <DialogTitle>
                <TitleConfirmModal>
                    <InfoIcon sx={{ fontSize: '200%', color: '#FE0000' }} />
                </TitleConfirmModal>
            </DialogTitle>
            <DialogContent>
                <div style={{ textAlign: 'center' }}>
                    <Typography
                        variant="button"
                        textAlign={'center'}
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        {modalMessage}
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Grid item xs={7} textAlign="center">
                                <Button
                                    onClick={handleModalClose}
                                    variant="contained"
                                    autoFocus
                                    sx={{
                                        backgroundColor: '#223C5A',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#3A6495',
                                        },
                                    }}
                                >
                                    OK
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default PopupError;
