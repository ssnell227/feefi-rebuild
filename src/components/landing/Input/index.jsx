import React from 'react'

const Input = ({setUsername, setDisplayPlaylists}) => (
    <div>
        <input onChange={(e) => {
            e.preventDefault()
            setUsername(e.target.value)
        }}/>
        <button>
            Join game
        </button>
        <button onClick={() => setDisplayPlaylists(true)}>
            New game
        </button>
    </div>
)

export default Input