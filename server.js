const express = require("express")
const http = require("http")
const WebSocket = require("ws")

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        // *** Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message)

                console.log(`::: Message: ${message}`)
            }
        })
    })
})

server.listen(3001, () => {
    console.log(`::: Websocket server is running on port 3001`);
})