const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');
// получаем элементы интерфейса
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const locationButton = document.getElementById('location-button');
const chatWindow = document.getElementById('chat-window');
// обработчик нажатия на кнопку "Отправить"
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        // отправляем сообщение на сервер
        socket.send(message);
        // выводим сообщение в чат
        chatWindow.innerHTML += `Вы: ${message}<br>`;
        messageInput.value = '';
    }
});
// обработчик нажатия на кнопку "Геолокация"
locationButton.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        // запрашиваем геолокацию
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            // формируем ссылку на карту с указанием координат
            const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            // выводим ссылку в чат
            chatWindow.innerHTML += `Вы отправили геолокацию: <a href="${mapLink}" target="_blank">${mapLink}</a><br>`;
            // отправляем данные на сервер (координаты)
            socket.send(`Геолокация: ${latitude}, ${longitude}`);
        });
    } else {
        alert('Ваш браузер не поддерживает геолокацию');
    }
});
// обработчик получения сообщения от сервера
socket.addEventListener('message', event => {
    const message = event.data;
    // выводим сообщение в чат
    chatWindow.innerHTML += `Сервер: ${message}<br>`;
});