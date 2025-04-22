//UNFINISHED TANGINA ANG HIRAP!!
document.addEventListener('DOMContentLoaded', function() {
    const calendarTable = document.querySelector('.calendar table tbody');
    const calendarHeader = document.querySelector('.calendar-header h2');
    const prevMonthBtn = document.querySelector('.calendar-header button:first-child');
    const nextMonthBtn = document.querySelector('.calendar-header button:last-child');
    const reservationTimeInput = document.getElementById('reservationTime');
    const durationInput = document.getElementById('duration');
    const roomAvailabilityTable = document.querySelector('.room-availability-table tbody');
    const roomSelect = document.getElementById('room');

    let currentDate = new Date();
    let selectedDate = null;
    let selectedSlots = [];
    let currentRoom = roomSelect.value;

    function renderCalendar(date) {
        calendarTable.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const dayOfWeekOfFirstDay = firstDayOfMonth.getDay(); // 0 for Sunday, 6 for Saturday

        calendarHeader.textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);

        let dayCounter = 1;
        for (let i = 0; i < 6; i++) { // Up to 6 weeks in a month
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) { // 7 days in a week
                const cell = document.createElement('td');
                if (i === 0 && j < dayOfWeekOfFirstDay) {
                    // Empty cells before the first day of the month
                } else if (dayCounter > daysInMonth) {
                    // Empty cells after the last day of the month
                } else {
                    cell.textContent = dayCounter;
                    const cellDate = new Date(year, month, dayCounter);
                    if (cellDate.toDateString() === new Date().toDateString()) {
                        cell.classList.add('today');
                    }
                    cell.addEventListener('click', () => {
                        removeSelectedClass();
                        cell.classList.add('selected');
                        selectedDate = cellDate;
                        updateReservationTimeDisplay();
                    });
                    dayCounter++;
                }
                row.appendChild(cell);
            }
            calendarTable.appendChild(row);
            if (dayCounter > daysInMonth) {
                break;
            }
        }
    }

    function removeSelectedClass() {
        document.querySelectorAll('.calendar td.selected').forEach(cell => {
            cell.classList.remove('selected');
        });
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    function updateReservationTimeDisplay() {
        if (selectedDate) {
            const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(selectedDate);
            reservationTimeInput.value = formattedDate + (selectedSlots.length > 0 ? ' at ' + selectedSlots.join(', ') : '');
            durationInput.value = selectedSlots.length > 0 ? selectedSlots.join(', ') : '';
        } else {
            reservationTimeInput.value = '';
            durationInput.value = '';
        }
    }

    function handleTimeSlotClick(event) {
        const slot = event.target;
        if (slot.classList.contains('available-slot')) {
            slot.classList.toggle('selected');
            const time = slot.dataset.time;
            if (slot.classList.contains('selected')) {
                selectedSlots.push(time);
            } else {
                selectedSlots = selectedSlots.filter(t => t !== time);
            }
            updateReservationTimeDisplay();
        }
    }

    function renderRoomAvailability(room) {
        if (!room) return;
        roomAvailabilityTable.querySelectorAll('td').forEach(td => {
            td.classList.remove('selected');
        });
        selectedSlots = [];
        updateReservationTimeDisplay();

        // In a real application, you would fetch availability data based on the selected room and date.
        // For this example, we'll keep the static availability.
        roomAvailabilityTable.querySelectorAll('td[data-room="' + room + '"]').forEach(td => {
            td.addEventListener('click', handleTimeSlotClick);
        });
    }

    roomSelect.addEventListener('change', (event) => {
        currentRoom = event.target.value;
        renderRoomAvailability(currentRoom);
    });

    // Initial calendar render
    renderCalendar(currentDate);

    // Initial room availability render (for the default selected room, if any)
    renderRoomAvailability(currentRoom);
});
