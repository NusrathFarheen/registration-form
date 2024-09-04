document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const entries = document.getElementById('entries');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        // Validate date of birth for age between 18 and 55
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const month = today.getMonth() - dobDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            alert('Date of Birth must be between 18 and 55 years old.');
            return;
        }

        // Create a new row in the table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${password}</td>
            <td>${dob}</td>
            <td>${terms ? 'Yes' : 'No'}</td>
        `;

        // Append the new row to the table
        entries.appendChild(newRow);

        // Save data to local storage
        saveDataToLocalStorage({ name, email, password, dob, terms });
    });

    // Load saved data from local storage
    loadSavedData();
});

function saveDataToLocalStorage(data) {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    savedEntries.push(data);
    localStorage.setItem('entries', JSON.stringify(savedEntries));
}

function loadSavedData() {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    const entries = document.getElementById('entries');

    savedEntries.forEach(entry => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.terms ? 'Yes' : 'No'}</td>
        `;
        entries.appendChild(newRow);
    });
}
