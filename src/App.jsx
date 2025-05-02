import { useEffect, useState } from 'react'
import supabase from './supabaseClient'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [username, setUsername] = useState('')

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
      setInput('')
      fetchMessages()
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>💬 Chat App</h1>

      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: '#fafafa'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: username === msg.username ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '70%',
              padding: '10px',
              borderRadius: '15px',
              backgroundColor: username === msg.username ? '#dcf8c6' : '#e4e6eb',
              textAlign: 'left',
              wordBreak: 'break-word',
            }}>
              <div style={{ fontSize: '0.8em', fontWeight: 'bold', marginBottom: '5px', color: 'black' }}>
                {msg.username}
              </div>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="text"
          placeholder="Tulis pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 2,
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
        />
        <button type="submit" style={{
          padding: '10px 20px',
          borderRadius: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
          Kirim
        </button>
      </form>
    </div>
  )
}

export default App
