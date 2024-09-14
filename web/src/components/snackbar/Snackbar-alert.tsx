import { Snackbar, SnackbarContent, styled } from '@mui/material';
import { AiFillCheckCircle } from 'react-icons/ai';

const StyledSnackbarContent = styled(SnackbarContent)`
    && {
        /* width: 50%; */
        display: inline-block;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
            0 3px 6px -4px rgba(0, 0, 0, 0.12),
            0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }
    .MuiSnackbarContent-message {
        color: #000000;
    }
`;

interface IProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const SnackBarAlert = (props: IProps) => {
    const { open, onClose, message } = props;
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={onClose}
            autoHideDuration={2000}
        >
            <StyledSnackbarContent
                message={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <AiFillCheckCircle
                            fontSize={'18px'}
                            color={'#52c41a'}
                        />
                        <span>{message}</span>
                    </div>
                }
            />
        </Snackbar>
    );
};

export default SnackBarAlert;
