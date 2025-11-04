import { useState } from 'react'

export default function FriendsPanel({ friends: propsFriends = [], loading }) {
  // Estado local para amigos añadidos manualmente
  const [localFriends, setLocalFriends] = useState([])
  const [requests, setRequests] = useState([
    { id: 'r1', name: 'Martina' },
    { id: 'r2', name: 'Lucas' },
  ])
  const [newFriendName, setNewFriendName] = useState('')
  const [sentRequests, setSentRequests] = useState([])

  // Combinar amigos de props con amigos locales
  const allFriends = [...propsFriends, ...localFriends]

  function acceptRequest(id) {
    const req = requests.find((r) => r.id === id)
    if (!req) return
    setLocalFriends((prev) => [
      ...prev,
      { id: 'f-' + req.id, name: req.name, avatar: '', watchedMovies: [] },
    ])
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  function sendFriendRequest(e) {
    e.preventDefault()
    if (!newFriendName.trim()) return
    
    const newRequest = {
      id: 'sent-' + Date.now(),
      name: newFriendName.trim()
    }
    
    setSentRequests((prev) => [...prev, newRequest])
    setNewFriendName('')
    
    // Simulate auto-acceptance after 3 seconds
    setTimeout(() => {
      setSentRequests((prev) => prev.filter(r => r.id !== newRequest.id))
      setLocalFriends((prev) => [
        ...prev,
        { 
          id: 'f-' + newRequest.id, 
          name: newRequest.name, 
          avatar: '', 
          watchedMovies: [
            { 
              id: 'm-' + Date.now(), 
              title: 'Nueva película', 
              rating: Math.floor(Math.random() * 2) + 4, 
              isWatching: Math.random() > 0.7, 
              poster: 'https://via.placeholder.com/150x220?text=Nueva' 
            }
          ] 
        },
      ])
    }, 3000)
  }

  return (
    <div className="friends-panel">
      <div className="add-friend-section">
        <h4>Añadir Amigo</h4>
        <form className="add-friend-form" onSubmit={sendFriendRequest}>
          <input
            type="text"
            className="friend-input"
            placeholder="Buscar usuario..."
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
          />
          <button type="submit" className="btn">
            Enviar
          </button>
        </form>
        {sentRequests.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            {sentRequests.map((req) => (
              <p key={req.id} className="muted" style={{ fontSize: '12px' }}>
                Solicitud enviada a {req.name}...
              </p>
            ))}
          </div>
        )}
      </div>

      <h3>Mis Amigos ({allFriends.length})</h3>
      {loading ? (
        <div className="loading">
          <p className="muted">Cargando amigos...</p>
        </div>
      ) : (
        <ul className="friend-list">
          {allFriends.map((f) => (
            <li key={f.id} className="friend-item">
              <div className="avatar">{f.name.charAt(0)}</div>
              <div className="name">{f.name}</div>
            </li>
          ))}
        </ul>
      )}

      <h4>Solicitudes Pendientes</h4>
      {requests.length ? (
        <ul className="requests">
          {requests.map((r) => (
            <li key={r.id} className="request-item">
              <div>{r.name}</div>
              <button className="btn" onClick={() => acceptRequest(r.id)}>
                Aceptar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">Sin solicitudes pendientes</p>
      )}
    </div>
  )
}
