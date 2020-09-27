import React from 'react'

import Header from '../components/Header'
import AddPark from '../components/AddPark'
import ParkList from '../components/ParkList'





function Home() {
    return (
        <div>
            <Header />
            <AddPark/>
            <ParkList/>
        </div>
    )
}

export default Home
