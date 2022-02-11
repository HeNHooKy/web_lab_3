from http.client import OK
import sqlite3
from pathlib import Path

from sqlite3 import Cursor
from entities import Message

# Подключение к БД
db_path = '/'.join([str(Path(__file__).parent), '..', 'db', 'identifier.sqlite'])
db = sqlite3.connect(db_path, check_same_thread=False)


class Storage:
    @staticmethod
    def get_messages() -> Cursor:
        """Получение всего списка сообщений"""
        cur = db.cursor()
        messages = cur.execute('SELECT * FROM messages ORDER BY clap DESC').fetchall()
        db.commit()
        return messages

    @staticmethod
    def get_message(message_id: int) -> Message:
        """Получение сообщения"""
        cur = db.cursor()
        messages = cur.execute('SELECT * FROM messages WHERE id = ?', (message_id,)).fetchall()
        db.commit()
        return messages[0]

    @staticmethod
    def add_message(message: Message):
        """Добавление записи о сообщении
        :param message: запись о сообщении
        :type student_attendance: Message"""
        db_cursor = db.cursor()
        db_cursor.execute('INSERT INTO messages (name, message, clap) VALUES (?,?,?)',
                          (message.name, message.message, 0))
        return db_cursor.lastrowid
    
    @staticmethod
    def add_clap(message_id: int):
        """ Добавление хлопка сообщению с id
        :param message_id: идентификатор сообщения
        """
        db.execute('UPDATE messages SET clap = clap + 1 WHERE id = ?', (message_id,))
        db.commit()

    @staticmethod
    def delete_message(message_id: int):
        """ Удаление сообщения по id
        :param message_id: идентификатор сообщения
        """
        db.execute('DELETE FROM messages WHERE id=?', (message_id,))
        db.commit()
