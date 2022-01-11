class Message:
    """Класс сообщений на борде
    :param id: идентификатор
    :type id: int
    :param name: имя отправителя
    :type name: str
    :param message: текст сообщения
    :type message: str
    :param clap: количество хлопков
    :type clap: int
    """

    def __init__(self, id: int, name: str, message: str, clap: int):
        self.id = id
        self.name = name
        self.message = message
        self.clap = clap
