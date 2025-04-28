const monthNameEl = document.getElementById("month-name");
        const daysGridEl = document.getElementById("days-grid");
        const prevMonthBtn = document.getElementById("prev-month");
        const nextMonthBtn = document.getElementById("next-month");

        let currentDate = new Date();
        let selectedDate = null; // Track the selected date

        function generateCalendar(year, month) {
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();

            daysGridEl.innerHTML = "";
            monthNameEl.textContent = new Date(year, month).toLocaleString("default", {
                month: "long",
                year: "numeric",
            });

            for (let i = 0; i < firstDay; i++) {
                daysGridEl.innerHTML += `<div class="day empty"></div>`;
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                let dayClass = "day";

                 if (date.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                    dayClass += " past";
                } else if (date.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
                    dayClass += " available"; // Today is available
                } else {
                    dayClass += " available";
                }

                if (selectedDate && date.setHours(0,0,0,0) === selectedDate.setHours(0,0,0,0)) {
                    dayClass += " selected";
                }

                const dayCell = document.createElement("div");
                dayCell.className = dayClass;
                dayCell.textContent = day;
                dayCell.addEventListener("click", () => handleDayClick(date));
                daysGridEl.appendChild(dayCell);
            }
             //hardcoded reservations.
             const reservedDates = [new Date(2025, 4, 12), new Date(2025, 4, 13), new Date(2025, 4, 19), new Date(2025,4,20)];
             const reservationDatesElements = Array.from(daysGridEl.querySelectorAll('.day'));

            reservedDates.forEach(reservedDate => {
                const dayOfMonth = reservedDate.getDate();
                const month = reservedDate.getMonth();
                const year = reservedDate.getFullYear();

                 if (month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                    // Find the corresponding day cell and apply the "reserved" class
                    const dayCell = reservationDatesElements[firstDay + dayOfMonth - 1]; //adjust for index
                    if (dayCell) {
                        dayCell.className = 'day reserved';
                    }
                }
            });

            //set your reservation
            const yourReservation = new Date(2025, 4, 8);
            if(yourReservation.getMonth() == currentDate.getMonth() && yourReservation.getFullYear() == currentDate.getFullYear()){
                 const dayCell = reservationDatesElements[firstDay + yourReservation.getDate() - 1];
                  if (dayCell) {
                     dayCell.className = 'day your-reservation';
                  }
            }
        }

        function handleDayClick(date) {
            const today = new Date();
            if (date.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                return; // Do nothing for past dates
            }

            selectedDate = date;
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth()); //regenerate
            selectedDateTextEl.textContent = date.toLocaleDateString();
            selectedDateContainerEl.style.display = "block";
        }

        prevMonthBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
            selectedDateContainerEl.style.display = "none"; //hide
            selectedDate = null;
        });

        nextMonthBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
            selectedDateContainerEl.style.display = "none"; //hide
             selectedDate = null;
        });

        // Initialize the calendar
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        selectedDateContainerEl.style.display = "none"; //hide initially

        const form = document.getElementById('student-form');
        const nameInput = document.getElementById('name');
        const studentIdInput = document.getElementById('student-id');
        const nameError = document.getElementById('name-error');
        const studentIdError = document.getElementById('student-id-error');
        const newFieldsContainer = document.getElementById('new-fields-container');

        let studentCount = 1; // Keep track of the number of students
        let existingNameValues = [];
        let existingStudentIdValues = [];

        function validateName() {
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('input-error');
                nameError.textContent = 'Please enter a name.';
                return false;
            }
            nameInput.classList.remove('input-error');
            nameError.textContent = '';
            return true;
        }

        function validateStudentId() {
            if (studentIdInput.value.trim() === '') {
                studentIdInput.classList.add('input-error');
                studentIdError.textContent = 'Please enter a student ID.';
                return false;
            }
            studentIdInput.classList.remove('input-error');
            studentIdError.textContent = '';
            return true;
        }

        nameInput.addEventListener('input', validateName);
        studentIdInput.addEventListener('input', validateStudentId);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const isNameValid = validateName();
            const isStudentIdValid = validateStudentId();

            if (isNameValid && isStudentIdValid) {
                // Simulate adding student (replace with actual logic)
                console.log('Name:', nameInput.value);
                console.log('Student ID:', studentIdInput.value);
                alert('Student added successfully!'); // Basic feedback

                // Store the current values of the input fields
                existingNameValues.push(nameInput.value);
                existingStudentIdValues.push(studentIdInput.value);

                // Add new fields for another student
                studentCount++;
                const newNameField = document.createElement('div');
                newNameField.className = 'form-group';
                newNameField.innerHTML = `
                    <label for="name${studentCount}" class="custom-label">Name ${studentCount}</label>
                    <input type="text" id="name${studentCount}" name="name${studentCount}" class="custom-input" placeholder="Enter name" value="${existingNameValues[0] || ''}">
                    <p id="name${studentCount}-error" class="error-message"></p>
                `;

                const newStudentIdField = document.createElement('div');
                newStudentIdField.className = 'form-group';
                newStudentIdField.innerHTML = `
                    <label for="student-id${studentCount}" class="custom-label">Student ID ${studentCount}</label>
                    <input type="text" id="student-id${studentCount}" name="student-id${studentCount}" class="custom-input" placeholder="Enter student ID" value="${existingStudentIdValues[0] || ''}">
                    <p id="student-id${studentCount}-error" class="error-message"></p>
                `;

                newFieldsContainer.appendChild(newNameField);
                newFieldsContainer.appendChild(newStudentIdField);

                // Clear the  form, but retain the first input values
                if (studentCount > 1) {
                    nameInput.value = existingNameValues[0] || '';
                    studentIdInput.value = existingStudentIdValues[0] || '';
                } else {
                    nameInput.value = '';
                    studentIdInput.value = '';
                }
                
                nameInput.classList.remove('input-error');
                studentIdInput.classList.remove('input-error');
                nameError.textContent = '';
                studentIdError.textContent = '';
            }
        });

        const selectWrapper = document.querySelector('.custom-select-wrapper');
        const selectTrigger = document.querySelector('.custom-select-trigger');
        const selectOptions = document.querySelector('.custom-options');
        const selectElement = document.getElementById('room-select');

        selectTrigger.addEventListener('click', () => {
            selectWrapper.classList.toggle('open');
            if (selectWrapper.classList.contains('open')) {
                selectOptions.style.display = "block";
            } else {
                selectOptions.style.display = "none";
            }
        });

        selectOptions.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const value = event.target.dataset.value;
                selectElement.value = value;
                selectTrigger.querySelector('span').textContent = event.target.textContent;
                selectWrapper.classList.remove('open');
                selectOptions.style.display = "none";
            }
        });

        document.addEventListener('click', (event) => {
            if (!selectWrapper.contains(event.target) && !selectOptions.contains(event.target)) {
                selectWrapper.classList.remove('open');
                selectOptions.style.display = "none";
            }
        });

        selectElement.addEventListener('change', (event) => {
            const selectedOptionText = selectElement.options[selectElement.selectedIndex].text;
            selectTrigger.querySelector('span').textContent = selectedOptionText;
        });

        selectWrapper.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === 'Space') {
                selectWrapper.classList.toggle('open');
                 if (selectWrapper.classList.contains('open')) {
                    selectOptions.style.display = "block";
                } else {
                    selectOptions.style.display = "none";
                }
            }
        });