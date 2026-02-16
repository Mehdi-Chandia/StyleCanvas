import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast configuration
export const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
};

// Toast Container Component
export function ToastProvider() {
    return <ToastContainer {...toastConfig} />;
}

// Success Toast
export const showSuccess = (message) => {
    toast.success(message, {
        ...toastConfig,
        icon: "✅",
    });
};

// Error Toast
export const showError = (message) => {
    toast.error(message, {
        ...toastConfig,
        autoClose: 4000,
        icon: "❌",
    });
};

// Warning Toast
export const showWarning = (message) => {
    toast.warning(message, {
        ...toastConfig,
        icon: "⚠️",
    });
};

// Info Toast
export const showInfo = (message) => {
    toast.info(message, {
        ...toastConfig,
        icon: "ℹ️",
    });
};

// Custom Toast with options
export const showToast = (message, options = {}) => {
    toast(message, {
        ...toastConfig,
        ...options,
    });
};

// Loading Toast (with manual dismiss)
export const showLoading = (message = "Loading...") => {
    return toast.loading(message, {
        ...toastConfig,
        autoClose: false,
    });
};


// Wishlist Toasts
export const wishlistToasts = {
    addedToWishlist: (productName) =>
        showSuccess(`${productName} added to wishlist!`),

    removedFromWishlist: (productName) =>
        showInfo(`${productName} removed from wishlist`),

    wishlistError: () =>
        showError("Failed to update wishlist"),
};

// Export default toast for direct access
export default {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
    custom: showToast,
    wishlist: wishlistToasts,
};