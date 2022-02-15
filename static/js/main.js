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

document.querySelectorAll(".clap").forEach((element) => element.addEventListener('submit', (event) => clapEvent(event)));


async function clapEvent(event) {
    try
    {
        event.preventDefault();
        let element = event.target;
        let messageId = element.attributes["message_id"].value;
        await addClap(element.action);
        let message = await getMessage(messageId);
        element.querySelector("span").textContent = message[3];
    }
    catch (error) {
        console.log(error);
        //alert("The error occurred while adding the record");
    }
}


document.querySelectorAll("#send-message-form").forEach(element => {
    element.addEventListener('submit', async(event) => {
        try
        {
            event.preventDefault();
            let element = event.target;
    
            messageLoading();
    
            const data = new FormData(element);
    
            const values = Object.fromEntries(data.entries());
    
            let message = await sendMessage(values);
            
            if(message.status == "ok") {
                createMessage(message);
                element.querySelector("#sender").value = "";
                element.querySelector("#message").value = "";
                messageSended();
            }
            else if(message.status == "error") {
                let error_message = message["message"];
                messageError(error_message);
            }
        }
        catch(error){
            console.log(error);
            //alert("The error occurred while adding the record");
        }
    })
});

function createMessage(message) {
    let id = message["id"];
    let sender = message["sender"];
    let message_body = message["message"];
    let clap = message["clap"];

    let li_mb_3 = createElementWithClass("li", "mb-3");
    let article_card = createElementWithClassAndDataTest("article", "card", "message");
    let div_card_body = createElementWithClass("div", "card-body");
    let header_card_title = createElementWithClass("header", "card-title d-flex");
    let div_message_author = createElementWithClassAndDataTest("div", "text_muted", "message-author");
    let a_card_link = createElementWithClassAndDataTest("a", "card-link ms-auto", "message-open");
    let p_card_text = createElementWithClassAndDataTest("p", "card-text", "message-text");
    let div_d_flex = createElementWithClass("div", "d-flex");
    let form_clap = createElementWithClassAndDataTest("form", "ms-auto clap", "message-clap-form");
    let button_btn = createElementWithClass("button", "btn");
    let span_clap_count = document.createElement("span");
    
    a_card_link.setAttribute("href", "/message_page/" + id);
    form_clap.setAttribute("message_id", id + "");
    form_clap.setAttribute("action", "/messages/clap/" + id);
    form_clap.setAttribute("method", "POST");
    span_clap_count.setAttribute("data-test", "clap-count");

    div_message_author.innerText = sender;
    a_card_link.innerText = "Открыть ↗️";
    p_card_text.innerText = message_body;
    button_btn.innerText = "👏🏻 ";
    span_clap_count.innerText = clap + "";

    li_mb_3.appendChild(article_card);
    article_card.appendChild(div_card_body);
    div_card_body.appendChild(header_card_title);
    div_card_body.appendChild(p_card_text);
    div_card_body.appendChild(div_d_flex);
    header_card_title.appendChild(div_message_author);
    header_card_title.appendChild(a_card_link);
    div_d_flex.appendChild(form_clap);
    form_clap.appendChild(button_btn);
    button_btn.appendChild(span_clap_count);

    form_clap.addEventListener("submit", clapEvent);

    let messages = document.getElementById("messages");
    messages.appendChild(li_mb_3);
}


function messageSended() {
    let space = document.getElementById("alert");
    space.innerHTML = "";

    let body = createElementWithClassAndDataTest("div", "mb-3", "send-alert");
    let alert = createElementWithClass("div", "alert alert-success");
    
    alert.innerText = "Сообщение отправлено";

    body.appendChild(alert);
    space.appendChild(body);
}

function messageError(message) {
    let space = document.getElementById("alert");
    space.innerHTML = "";

    let body = createElementWithClassAndDataTest("div", "mb-3", "send-alert");
    let alert = createElementWithClass("div", "alert alert-danger");
    
    alert.innerText = message;

    body.appendChild(alert);
    space.appendChild(body);

    /*<div class="mb-3" data-test="send-alert">
                <div class="alert alert-danger">{{ error }} </div>
              </div>*/
              
}

function messageLoading() {
    let space = document.getElementById("alert");
    space.innerHTML = "";

    let body = createElementWithClassAndDataTest("div", "mb-3", "send-alert");
    let alert = createElementWithClass("div", "alert alert-warning");
    
    alert.innerText = "Загрузка...";

    body.appendChild(alert);
    space.appendChild(body);

    /*<div class="mb-3" data-test="send-alert">
                <div class="alert alert-warning">Загрузка...</div>
              </div>*/
}

function createElementWithClass(type, className) {
    const element = document.createElement(type);
    element.setAttribute( "class", className );
    return element;
}

function createElementWithClassAndDataTest(type, className, dataTest) {
    const element = document.createElement(type);
    element.setAttribute( "class", className );
    element.setAttribute( "data-test", dataTest);
    return element;
}