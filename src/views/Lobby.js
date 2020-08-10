import React, {useEffect, useContext} from 'react'
import io from 'socket.io-client'

import {Context} from '../context/Context'

//components
import Chat from '../components/lobby/Chat'
import InfoDisplay from '../components/lobby/InfoDisplay'
import InviteLink from '../components/lobby/InviteLink'
import PlayerList from '../components/lobby/PlayerList'

let socket

const Lobby = () => {
    const {usernameValue, gameHashValue} = useContext(Context)
    const {username, setUsername} = usernameValue
    const {gameHash, setGameHash} = gameHashValue

    useEffect(() => {
        socket=io()

        console.log(gameHash.slice(11))

        socket.emit('join', {
            username: username,
            gameId: gameHash,
            spotifyId: gameHash.slice(11)
        })
    })
    return (
        <div>
            Lobby
            <InfoDisplay/>
            <PlayerList/>
            <Chat/>
            <InviteLink/>
        </div>
    )
}

export default Lobby