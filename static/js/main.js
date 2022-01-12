const API_URL = 'http://localhost:3000';

async function sendMessage(formData) {
    await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: formData
    }).then(() => {
        //--IGNORE IT
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


async function addStudentAttendance(formData){
    // const formData = new FormData(document.querySelector("#student_info"));

    const addStudentAttendanceResponse = await fetch(`${API_URL}/attendance`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json());

    return addStudentAttendanceResponse["added_id"];
}

document.querySelector("#send-message-form").addEventListener('submit', async(event) => {
    try
    {
        event.preventDefault();
        const formData = new FormData(document.querySelector("#send-message-form"));
        sendMessage(formData);
    }
    catch{
        alert("The error occurred while adding the record");
    }
});
