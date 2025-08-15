import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectNotifications, 
  removeNotification,
  markAsRead,
  clearAllNotifications
} from '../../store/slices/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  // Auto-remove notifications after their duration
  useEffect(() => {
    const timeouts = notifications
      .filter(notification => !notification.read && notification.autoHideDuration)
      .map(notification => {
        return setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.autoHideDuration);
      });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [notifications, dispatch]);

  // Mark notifications as read when they're displayed
  useEffect(() => {
    notifications
      .filter(notification => !notification.read)
      .forEach(notification => {
        dispatch(markAsRead(notification.id));
      });
  }, [notifications, dispatch]);

  // Get appropriate icon and color based on notification type
  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          text: 'text-green-800',
          icon: (
            <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          text: 'text-red-800',
          icon: (
            <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-800',
          icon: (
            <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-800',
          icon: (
            <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };

  // Don't render if there are no notifications
  if (notifications.length === 0) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-end p-4 pointer-events-none z-50">
      <div className="w-full max-w-sm space-y-4">
        {/* Clear all button */}
        {notifications.length > 1 && (
          <div className="flex justify-end">
            <button
              onClick={() => dispatch(clearAllNotifications())}
              className="text-xs text-gray-500 hover:text-gray-700 bg-white px-2 py-1 rounded-md shadow-sm pointer-events-auto"
            >
              Limpar tudo
            </button>
          </div>
        )}
        
        {/* Notifications */}
        {[...notifications].reverse().map((notification) => {
          const styles = getNotificationStyles(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`relative ${styles.bg} rounded-lg p-4 shadow-lg pointer-events-auto`}
              onClick={() => notification.onClick && notification.onClick()}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  {notification.icon || styles.icon}
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${styles.text}`}>
                    {notification.title || notification.type.toUpperCase()}
                  </h3>
                  <div className={`mt-1 text-sm ${styles.text} break-words`}>
                    {notification.message}
                  </div>
                  {notification.actions && (
                    <div className="mt-2 space-x-3">
                      {notification.actions.map((action, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            action.handler();
                          }}
                          className={`text-sm font-medium ${
                            notification.type === 'error' 
                              ? 'text-red-700 hover:text-red-600' 
                              : notification.type === 'success'
                              ? 'text-green-700 hover:text-green-600'
                              : notification.type === 'warning'
                              ? 'text-yellow-700 hover:text-yellow-600'
                              : 'text-blue-700 hover:text-blue-600'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeNotification(notification.id));
                    }}
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Fechar</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;
