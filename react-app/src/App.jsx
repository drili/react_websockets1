import { useState } from 'react'
import { sendMessage } from './WebSocketClient'

function App() {
	const [message, setMessage] = useState("")

	const handleSendMessage = () => {
		sendMessage(message)
		setMessage("")
	}

	return (
		<>
			<h1>WebSocket Notification App</h1>
			
			<div>
				<input 
					type="text"
					placeholder='Enter a notification message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					/>

				<button onClick={handleSendMessage}></button>
			</div>
		</>
	)
}

export default App
