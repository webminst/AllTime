import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    unreadCount: 0,
  },
  reducers: {
    // Add a new notification
    addNotification: (state, action) => {
      const { id, type, message, autoHideDuration = 5000, ...rest } = action.payload;
      state.notifications.push({
        id: id || Date.now(),
        type: type || 'info',
        message,
        autoHideDuration,
        ...rest,
      });
      state.unreadCount += 1;
    },
    
    // Remove a notification by ID
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      const removedNotification = state.notifications.find(n => n.id === notificationId);
      
      if (removedNotification) {
        state.notifications = state.notifications.filter(n => n.id !== notificationId);
        if (!removedNotification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
    },
    
    // Mark a notification as read
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    
    // Mark all notifications as read
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        if (!notification.read) {
          notification.read = true;
        }
      });
      state.unreadCount = 0;
    },
    
    // Clear all notifications
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    
    // Clear notifications of a specific type
    clearNotificationsByType: (state, action) => {
      const typeToClear = action.payload;
      const removedCount = state.notifications.filter(n => n.type === typeToClear).length;
      
      state.notifications = state.notifications.filter(n => n.type !== typeToClear);
      state.unreadCount = Math.max(0, state.unreadCount - removedCount);
    },
  },
});

// Export actions
export const {
  addNotification,
  removeNotification,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
  clearNotificationsByType,
} = notificationSlice.actions;

// Export selectors
export const selectNotifications = (state) => state.notification.notifications;
export const selectUnreadCount = (state) => state.notification.unreadCount;

export default notificationSlice.reducer;
