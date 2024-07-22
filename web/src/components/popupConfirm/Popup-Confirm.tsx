import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography
} from '@mui/material';
import {
    CancelButton,
    ConfirmButton,
    TitleConfirmModal,
} from './PopupConfirm.styled';

interface IProps {
    isOpen: boolean;
    onClose: Function;
    onConfirm: Function;
    title: any;
}

const PopupConfirm = (props: IProps) => {
    const { isOpen, onClose, onConfirm, title } = props;
    return (
        <Dialog
            open={isOpen}
            onClose={() => onClose}
            fullWidth
        >
            <DialogTitle>
                <TitleConfirmModal>
                    <HelpOutlineIcon
                        sx={{ fontSize: '400%', color: '#87adbd' }}
                    />
                </TitleConfirmModal>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" textAlign={'center'}>
                    {title}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Grid item xs={7} textAlign="center">
                                <ConfirmButton
                                    onClick={() => onConfirm()}
                                    fullWidth
                                >
                                    ใช่
                                </ConfirmButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Grid item xs={7} textAlign="center">
                                <CancelButton
                                    onClick={() => onClose()}
                                    fullWidth
                                    color="inherit"
                                >
                                    ไม่ใช่
                                </CancelButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default PopupConfirm;
