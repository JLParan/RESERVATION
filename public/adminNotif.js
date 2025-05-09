// adminNotif.js

document.addEventListener('DOMContentLoaded', () => {
    fetchNotifications();
});

async function fetchNotifications() {
    try {
        const response = await fetch('http://localhost:3000/api/notifications');
        const data = await response.json();  // Parse the response as JSON
        displayNotifications(data);  // Call function to display notifications
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
}

function displayNotifications(notifications) {
    const list = document.getElementById('notificationList');
    list.innerHTML = '';

    if (notifications.length === 0) {
        const noNotificationsMessage = document.createElement('li');
        noNotificationsMessage.textContent = 'No notifications available.';
        list.appendChild(noNotificationsMessage);
        return;
    }

    notifications.forEach(notification => {
        const listItem = document.createElement('li');
        listItem.classList.add('notification');

        listItem.innerHTML = `
            <strong>Name:</strong> ${notification.fullName} <br>
            <strong>Date:</strong> ${notification.date} <br>
            <strong>Start Time:</strong> ${notification.start_time} <br>
            <strong>End Time:</strong> ${notification.end_time} <br>
            <strong>Created At:</strong> ${notification.created_at}
        `;
        list.appendChild(listItem);
    });
}
