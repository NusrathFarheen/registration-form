document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const acceptTerms = document.getElementById('acceptTerms').checked;

    // Validate the date of birth
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const isBirthdayPassed = monthDifference > 0 || (monthDifference === 0 && today.getDate() >= dob.getDate());

    if (age < 18 || (age > 55 || (age === 55 && !isBirthdayPassed))) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

    // Validate terms acceptance
    if (!acceptTerms) {
        alert('You must accept the terms.');
        return;
    }

    // Add data to the table
    const tableBody = document.querySelector('#entriesTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob.toISOString().split('T')[0]}</td>
        <td>${acceptTerms ? 'Yes' : 'No'}</td>
    `;
    tableBody.appendChild(row);

    // Save data to local storage (optional)
    saveData();
});

function saveData() {
    // Add your logic to save form data to local storage here
}

function loadData() {
    // Add your logic to load form data from local storage here
}

// Load saved data on page load (optional)
window.onload = loadData;
