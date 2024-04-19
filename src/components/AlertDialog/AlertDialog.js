import Swal from 'sweetalert2';
const SuccessAlertDialog = (text, okCallBack = () => {}, cancelCallBack = () => {}) =>
    Swal.fire({
        title: text,
        text: text,
        icon: 'success',
    }).then((result) => {
        if (result.isConfirmed) {
            okCallBack();
        } else {
            cancelCallBack();
        }
    });

const ErrorAlertDialog = (title, text) => (
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
    })
)

export { SuccessAlertDialog, ErrorAlertDialog };
