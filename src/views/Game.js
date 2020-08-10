import React from 'react'
import Ranking from '../components/game/Ranking'
import SongCard from '../components/game/SongCard'
import Timer from '../components/game/Timer'

const Game = () => {
    return (
        <div>
            <Ranking/>
            <Timer/>
            <SongCard/>
        </div>
    )
}

export default Game