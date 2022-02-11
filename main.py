from logging import NullHandler
from flask import Flask, request, render_template, url_for, redirect, jsonify
from flask_cors import CORS
from entities.Message import Message
from storage import Storage
from entities import Message
import json

# Создаём приложение
app = Flask(__name__)
CORS(app)

# Главная страница
@app.route('/')
def home():
    messages = Storage.get_messages()
    return render_template("index.html", messages = messages)

@app.route('/message_page/<int:message_id>', methods=['GET'])
def show_message(message_id: int):
    (id, name, message, clap) = Storage.get_message(message_id)
    return render_template("message.html", id = id, name = name, message = message, clap = clap)


# Получение списка записей о сообщении
@app.route('/messages', methods=['GET'])
def get_messages():
    messages = Storage.get_messages()
    return render_template("index.html", messages = messages)

@app.route('/message_info/<int:message_id>', methods=['GET'])
def get_message(message_id: int):
    message = Storage.get_message(message_id)
    return jsonify(message)


# Добавление записи о сообщении
@app.route('/messages', methods=['POST'])
def add_message():
    body = request.get_json()
    print(body)
    name :str = body["sender"]
    message :str = body["message"]
    error = None

    if not name or len(name) < 1 or len(name) > 30:
        error = "Имя должно иметь длину 1 до 30 символов"
    elif not message or len(message) < 1 or len(message) > 1000:
        error = "Многострочное поле ввода текста сообщения должно иметь длину от 1 до 1000 символов"
    
    if not error:
        message_id = Storage.add_message(Message(id = None, name=name, message=message, clap = 0))
        result = Storage.get_message(message_id)
        return jsonify(result)
    return error

# Увеличение количества хлопков
@app.route('/messages/clap/<int:message_id>', methods=['POST'])
def add_clap(message_id: int):
    Storage.add_clap(message_id)
    return redirect(request.referrer or url_for('some_view'))


# Удаление записи о сообщении
@app.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id: int):
    Storage.delete_message(message_id)
    messages = Storage.get_messages()
    return render_template("index.html", messages = messages)


if __name__ == '__main__':
    # Включаем режим разработки
    app.env = 'development'
    app.run(port=3000, host='0.0.0.0', debug=True)
