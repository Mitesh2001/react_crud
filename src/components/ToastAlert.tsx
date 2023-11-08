import { Zoom, toast, TypeOptions, ToastOptions, ToastPosition } from 'react-toastify';

type AlertNotification = (type?: TypeOptions, message?: string, position?: ToastPosition) => void

export const alertNotification: AlertNotification = (type, message = "Alert !", position = 'top-right'): void => {

    const toastOptions: ToastOptions = {
        position,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom
    };

    switch (type) {
        case 'success':
            toast.success(message, toastOptions);
            break;
        case 'warning':
            toast.warning(message, toastOptions);
            break;
        case 'error':
            toast.error(message, toastOptions);
            break;
        default:
            toast(message, toastOptions);
            break;
    }

}
