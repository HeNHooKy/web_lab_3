const API_URL = 'http://192.168.100.6:3000/';

async function removeStudent(id) {
    await fetch(`${API_URL}/attendance/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(() => {
        document.getElementById(`student__${id}`).remove();
    });
}

async function fetchStudentsAttendances() {
    const studentAttendances = await fetch(`${API_URL}/attendances`)
        .then((response) => response.json());
    const studentElements = studentAttendances.map((studentAttendance) => {
       return create_attendance_item(studentAttendance[0], studentAttendance[1], studentAttendance[2], studentAttendance[3]);
    });
    document.querySelector("#attendance_list").append(...studentElements);
}

function create_attendance_item(id, fio, date, student_group){
    const element = document.createElement("template");
    element.innerHTML = `
       <li class="list_item" id="student__${id}">
        <div class="student">
            <div class="student__date">${date}</div>
            <div class="student__name">${fio}</div>
            <div class="student__group">${student_group}</div>
            <button class="student__remove button button_danger" 
            onclick="removeStudent(${id})">❌</button>
        </div>
       </li>
       `.trim();
    return element.content.firstChild;
}

async function addStudentAttendance(formData){
    // const formData = new FormData(document.querySelector("#student_info"));

    const addStudentAttendanceResponse = await fetch(`${API_URL}/attendance`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json());

    return addStudentAttendanceResponse["added_id"];
}

document.querySelector("#student_info").addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(document.querySelector("#student_info"));

    try
    {
        const attendance_id = await addStudentAttendance(formData);
        document.querySelector("#attendance_list")
            .appendChild(create_attendance_item(attendance_id, formData.get("fio"), formData.get("date"), formData.get("student_group")));
    }
    catch{
        alert("The error occurred while adding the record");
    }
});

fetchStudentsAttendances();