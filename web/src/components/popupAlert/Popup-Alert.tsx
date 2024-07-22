import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    styled,
    Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { CancelButton } from './Popup-Alert.styled';

interface IProps {
    isOpen: boolean;
    onClose: any;
    title: any;
}

const PopupAlert = (props: IProps) => {
    const { isOpen, onClose, title } = props;

    const StyledDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialog-paper': {
            width: window.innerWidth >= 1024 ? '20%' : '80%',
        },
    }));

    const TitleConfirmModal = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    });

    return (
        <StyledDialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                <TitleConfirmModal>
                    <InfoIcon sx={{ fontSize: '200%', color: '#fe0000' }} />
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
                                <CancelButton
                                    onClick={() => onClose()}
                                    fullWidth
                                    color="inherit"
                                >
                                    OK
                                </CancelButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogActions>
        </StyledDialog>
    );
};

export default PopupAlert;
