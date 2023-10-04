import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3001")

function sendMessage(message) {
    ws.send(message)
}

export { sendMessage }