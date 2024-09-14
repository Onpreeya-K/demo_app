import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

interface IProps {
    isOpen: boolean;
    onClose: any;
    title: any;
    type: 'ERROR' | 'SUCCESS';
}

const PopupAlert = (props: IProps) => {
    const { isOpen, onClose, title, type } = props;

    const TitleConfirmModal = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    });

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: window.innerWidth >= 1024 ? '20%' : '80%',
                },
            }}
        >
            <DialogTitle>
                <TitleConfirmModal>
                    {type === 'ERROR' && (
                        <InfoIcon sx={{ fontSize: '200%', color: '#FE0000' }} />
                    )}
                    {type === 'SUCCESS' && (
                        <CheckCircleIcon
                            sx={{ fontSize: '200%', color: '#52C41A' }}
                        />
                    )}
                </TitleConfirmModal>
            </DialogTitle>
            <DialogContent>
                <Typography
                    variant="button"
                    textAlign={'center'}
                    style={{ whiteSpace: 'pre-line' }}
                >
                    {title}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Grid item xs={7} textAlign="center">
                                <Button
                                    onClick={() => onClose()}
                                    fullWidth
                                    color="inherit"
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

export default PopupAlert;
