import React, { useContext, useState } from 'react'
import createHash from 'hash-generator'
import { Redirect } from 'react-router-dom'

//utilities
import { Context } from '../context/Context'
import playlistData from '../playlistData/playlistData' //replace with API call from server

//components
import Banner from '../components/landing/Banner'
import InfoButton from '../components/landing/InfoButton'
import Input from '../components/landing/Input'
import PlaylistCard from '../components/landing/PlaylistCard'

const Landing = () => {
    const { usernameValue, gameHashValue } = useContext(Context)
    const { username, setUsername } = usernameValue
    const { gameHash, setGameHash } = gameHashValue

    const [displayPlaylists, setDisplayPlaylists] = useState(true)

    const handleChoosePlaylist = (spotifyId) => {
        const newHash = createHash(10) + '$' + spotifyId
        setGameHash(newHash)
        //redirect to game using gameHash
    }


    const playlistMap = playlistData.map(item => (
        <PlaylistCard
            key={item.spotify_id}
            name={item.playlist_name}
            imgURL={item.img_url}
            spotifyId={item.spotify_id}
            className='playlist-card'
            handleChoosePlaylist={handleChoosePlaylist}
        />))

    return (
        <div>
            <Banner username={username} />
            <Input setUsername={setUsername} setDisplayPlaylists={setDisplayPlaylists} />
            {gameHash && <Redirect to='/lobby'/>}
            <InfoButton title='How to Play'>This is the how to play description</InfoButton>
            <InfoButton title='About'>This is the about description</InfoButton>
            {displayPlaylists && playlistMap}
        </div>
    )
}

export default Landing