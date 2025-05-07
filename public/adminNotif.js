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
    const list = document.getElementById('notificationList'); // ✅ this matches your HTML
    list.innerHTML = '';  // Clear any previous data

    if (notifications.length === 0) {
        const noNotificationsMessage = document.createElement('li');
        noNotificationsMessage.textContent = 'No notifications available.';
        list.appendChild(noNotificationsMessage);
        return;
    }

    notifications.forEach(notification => {
        const listItem = document.createElement('li');
        listItem.classList.add('notification');  // Add class for styling

        // Format the notification data and append it
        listItem.innerHTML = `
            <strong>Message:</strong> ${notification.message} <br>
            <strong>Date:</strong> ${notification.date} <br>
            <strong>Created At:</strong> ${notification.created_at} <br>
            <strong>Full Name:</strong> ${notification.fullName}
        `;
        list.appendChild(listItem);  // Append the notification to the list
    });
}
