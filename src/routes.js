import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './views/Landing'
import Game from './views/Game'
import Lobby from './views/Lobby'

export default (
    <Switch>
        <Route path='/' exact component={Landing}/>
        <Route path='/Lobby' component={Lobby}/>
        <Route path='/Game' component={Game}/>
    </Switch>
)