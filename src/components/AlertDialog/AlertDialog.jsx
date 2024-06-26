import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const SuccessAlertDialog = (title, text, okCallBack = () => {}, cancelCallBack = () => {}) =>
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
    }).then((result) => {
        if (result.isConfirmed) {
            okCallBack();
        } else {
            cancelCallBack();
        }
    });

const ConfirmDeleteAlertDialog = (title, text, okCallBack = () => {}, cancelCallBack = () => {}) =>
    Swal.fire({
        title: title,
        html: text,
        icon: 'warning',
        showDenyButton: true,
        showConfirmButton: true,
        focusDeny: true,
        confirmButtonColor: 'var(--primary)',
        denyButtonColor: 'var(--text-tab-color)',
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            okCallBack();
        } else {
            cancelCallBack();
        }
    });

const ErrorAlertDialog = (title, text) =>
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
    });

const LoginAlertDialog = () => {
    const navigation = useNavigate();
    Swal.fire({
        title: "You're not logged in",
        text: 'Please log in to continue',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Log in',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            navigation('/authentication');
        }
    });
};
export { SuccessAlertDialog, ErrorAlertDialog, ConfirmDeleteAlertDialog, LoginAlertDialog };
