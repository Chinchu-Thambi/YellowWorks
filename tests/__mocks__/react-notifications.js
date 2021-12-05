/* globals jest */

const notifications = jest.requireActual('react-notifications');

module.exports = {
  ...notifications,
  NotificationManager: {
    error: jest.fn(),
    success: jest.fn(),
  },
};
