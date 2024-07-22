import { Button, styled } from '@mui/material';

export const TitleConfirmModal = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ConfirmButton = styled(Button)`
    color: #52c41a !important;
    &:hover,
    &:focus {
        color: #409914 !important;
        background-color: rgba(201, 251, 188, 0.63) !important;
    }
`;
export const CancelButton = styled(Button)``;
