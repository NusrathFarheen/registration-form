document.addEventListener('DOMContentLoaded', () => {
    loadEntriesFromLocalStorage();

    document.getElementById('registration-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            addEntryToTable();
            saveEntriesToLocalStorage();
            this.reset(); // Reset the form after submission
        }
    });
});

function addEntryToTable() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const accepted = document.getElementById('accepted').checked;

    const tableBody = document.getElementById('table-body');
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = email;
    row.insertCell(2).textContent = password;
    row.insertCell(3).textContent = dob;
    row.insertCell(4).textContent = accepted ? 'Yes' : 'No';
}

function saveEntriesToLocalStorage() {
    const tableBody = document.getElementById('table-body');
    const rows = tableBody.getElementsByTagName('tr');
    const entries = Array.from(rows).map(row => {
        return Array.from(row.cells).map(cell => cell.textContent);
    });
    localStorage.setItem('entries', JSON.stringify(entries));
}

function loadEntriesFromLocalStorage() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const tableBody = document.getElementById('table-body');
    entries.forEach(entry => {
        const row = tableBody.insertRow();
        entry.forEach(cellData => row.insertCell().textContent = cellData);
    });
}

function validateForm() {
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    return validateEmail(email) && validateAge(dob);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}
