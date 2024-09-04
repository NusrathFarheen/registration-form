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
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            alert('Date of Birth must be between 18 and 55 years old.');
            return;
        }

        // Create an entry object
        const entry = { name, email, password, dob, terms };

        // Add entry to the table
        addEntryToTable(entry);

        // Save data to local storage
        saveDataToLocalStorage(entry);

        // Clear form inputs
        form.reset();
    });

    // Load saved data from local storage when the page loads
    loadSavedData();
});

function addEntryToTable(entry) {
    const entries = document.getElementById('entries');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.terms ? 'Yes' : 'No'}</td>
    `;
    entries.appendChild(newRow);
}

function saveDataToLocalStorage(entry) {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    savedEntries.push(entry);
    localStorage.setItem('entries', JSON.stringify(savedEntries));
}

function loadSavedData() {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    savedEntries.forEach(entry => {
        addEntryToTable(entry);
    });
}
