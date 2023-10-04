import React, { useState, useEffect } from 'react'
import { sendMessage } from './WebSocketClient'

function App() {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])

	useEffect(() => {
		const ws = new WebSocket('ws://localhost:3001')

		ws.onmessage = (event) => {
			const receivedMessage = event.data
			console.log(`Message received: ${receivedMessage}`)

			if (receivedMessage instanceof Blob) {
				receivedMessage.text().then((text) => {
					setMessages((prevMessages) => [...prevMessages, text])
				})
			} else {
				setMessages((prevMessages) => [...prevMessages, receivedMessage])
			}
		}


		return () => {
			ws.close()
		}
	}, [])

	const handleSendMessage = () => {
		sendMessage(message)
		setMessage('')
	}

	return (
		<div>
			<h1>WebSocket Notification App</h1>
			<input
				type="text"
				placeholder="Enter a notification message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={handleSendMessage}>Send Notification</button>

			{/* Display received messages */}
			<h2>Messages</h2>
			<ul>
				{messages.map((msg, index) => (
					<li key={index}>{msg}</li>
				))}
			</ul>
		</div>
	)
}

export default App
