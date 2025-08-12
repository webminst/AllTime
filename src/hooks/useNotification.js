import { useDispatch } from 'react-redux';
import { addNotification } from '../store/slices/notificationSlice';

const useNotification = () => {
  const dispatch = useDispatch();

  const showNotification = (options) => {
    const {
      type = 'info',
      message,
      title,
      autoHideDuration = 5000,
      actions = [],
      onClick,
      ...rest
    } = options;

    if (!message) {
      console.warn('Notification message is required');
      return;
    }

    dispatch(
      addNotification({
        type,
        message,
        title,
        autoHideDuration,
        actions,
        onClick,
        ...rest,
      })
    );
  };

  const success = (message, options = {}) => {
    showNotification({
      type: 'success',
      message,
      ...options,
    });
  };

  const error = (message, options = {}) => {
    showNotification({
      type: 'error',
      message,
      ...options,
    });
  };

  const warning = (message, options = {}) => {
    showNotification({
      type: 'warning',
      message,
      ...options,
    });
  };

  const info = (message, options = {}) => {
    showNotification({
      type: 'info',
      message,
      ...options,
    });
  };

  return {
    show: showNotification,
    success,
    error,
    warning,
    info,
  };
};

export default useNotification;
