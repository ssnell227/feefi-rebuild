import React, { useState, useMemo } from 'react';
import Routes from './routes'
import './sass/App.scss'
import { Context } from './context/Context'

function App() {
  const [username, setUsername] = useState(null)
  const [gameHash, setGameHash] = useState(null)
  const usernameValue = useMemo(() => ({username, setUsername} ), [username, setUsername])
  const gameHashValue = useMemo(() => ({gameHash, setGameHash} ), [gameHash, setGameHash])

  return (
    <div className="App">
      <Context.Provider value={{usernameValue, gameHashValue}}>
        {Routes}
      </Context.Provider>
    </div>
  );
}

export default App;
