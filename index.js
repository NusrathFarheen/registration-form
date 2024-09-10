document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const entriesTable = document.getElementById('entries');

    // Load existing entries from localStorage when the page loads
    loadEntries();

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting traditionally

        // Retrieve form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        // Validate age between 18 and 55
        if (!isValidAge(dob)) {
            alert('Date of Birth must indicate age between 18 and 55.');
            return;
        }

        // Validate email format (additional to HTML5 validation)
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Create a new entry object
        const entry = { name, email, password, dob, terms };

        // Add the new entry to the table
        addEntryToTable(entry);

        // Save the new entry to localStorage
        saveEntry(entry);

        // Reset the form for new input
        form.reset();
    });

    // Function to validate age
    function isValidAge(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        return age >= 18 && age <= 55;
    }

    // Function to validate email using regex
    function isValidEmail(email) {
        // Simple email regex for basic validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to add an entry to the table
    function addEntryToTable(entry) {
        const row = document.createElement('tr');

        // Create and append table cells
        row.innerHTML = `
            <td>${sanitize(entry.name)}</td>
            <td>${sanitize(entry.email)}</td>
            <td>${sanitize(entry.password)}</td>
            <td>${sanitize(entry.dob)}</td>
            <td>${entry.terms ? 'true' : 'false'}</td>
        `;
        entriesTable.appendChild(row);
    }

    // Function to save an entry to localStorage
    function saveEntry(entry) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    // Function to load entries from localStorage and display them
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach(entry => addEntryToTable(entry));
    }

    // Function to sanitize input to prevent XSS attacks
    function sanitize(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
});
