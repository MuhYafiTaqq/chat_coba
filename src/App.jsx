import { useEffect, useState } from 'react'
import supabase from './supabaseClient'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [username, setUsername] = useState('')

  // Fetch data pesan
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('Pesan')
      .select('*')
      .order('time', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
    } else {
      setMessages(data)
    }
  }

  // Insert pesan baru
  const sendMessage = async (e) => {
    e.preventDefault()

    if (!input.trim() || !username.trim()) {
      alert('Username dan Pesan tidak boleh kosong!')
      return
    }

    const { error } = await supabase
      .from('Pesan')
      .insert([{ content: input, username: username }])

    if (error) {
      console.error('Error sending message:', error)
    } else {
      setInput('') // Bersihin input setelah kirim
      fetchMessages() // Refresh pesan
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>💬 Chat App</h1>

      <form onSubmit={sendMessage} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>
          Kirim
        </button>
      </form>

      <div>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: '10px' }}>
            <strong>{msg.username}</strong>: {msg.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
