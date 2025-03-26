 // Student Registration System Script

// DOM Elements
const studentForm = document.getElementById('studentForm');  //html section
const studentTableBody = document.querySelector('#studentTable tbody');  //data store her

// Helper function to save to local storage
function saveToLocalStorage(data) {
    localStorage.setItem('students', JSON.stringify(data));  //make data string
}

// Helper function to get data from local storage
function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

// Render student records
function renderStudents() {
    const students = getFromLocalStorage();
    studentTableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            deleteStudent(event.target.dataset.index);
        });
    });



// Add a new student
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contactNo').value.trim();

    // Validate inputs
    if (!name || !id || !email || !contact) {
        alert('All fields are required.');
        return;
    }

    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert('Student name must contain only letters.');
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Invalid email format!");
        return;
    }

    if (!/^[0-9]+$/.test(id)) {
        alert('Student ID must be a number.');
        return;
    }

    if (!/^[0-9]{10}$/.test(contact)) {
        alert('Contact number must be a 10-digit number.');
        return;
    }

    const students = getFromLocalStorage();
    students.push({ name, id, email, contact });
    saveToLocalStorage(students);

    studentForm.reset();
    renderStudents();
});

// Edit a student
function editStudent(index) {
    const students = getFromLocalStorage();
    const student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNo').value = student.contact;

    deleteStudent(index); // Remove the student while editing
}

// Delete a student
function deleteStudent(index) {
    const students = getFromLocalStorage();
    students.splice(index, 1);
    saveToLocalStorage(students);
    renderStudents();
}

// Initial render
renderStudents();
