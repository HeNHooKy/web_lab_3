const API_URL = 'http://localhost:3000';

async function getMessage(message_id) {
    return await fetch(`${API_URL}/message_info/${message_id}`)
    .then((res) => res.json());
}

async function sendMessage(formData) {
    return await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }).then((res) => res.json());
}

async function addClap(url) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

document.querySelectorAll(".clap").forEach((element) => element.addEventListener('submit', async(event) => {
    try
    {
        event.preventDefault();
        let messageId = element.attributes["message_id"].value;
        await addClap(element.action);
        let message = await getMessage(messageId);
        element.querySelector("span").textContent = message[3];
    }
    catch (error) {
        console.log(error);
        alert("The error occurred while adding the record");
    }
}));



document.querySelector("#send-message-form").addEventListener('submit', async(event) => {
    try
    {
        event.preventDefault();

        const data = new FormData(event.target);

        const values = Object.fromEntries(data.entries());

        let message = await sendMessage(values);

        let messages = document.querySelector("#messages");

        
    }
    catch(error){
        console.log(error);
        alert("The error occurred while adding the record");
    }
});

function createMessage() {

}

