import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'


const Dashboard = () => {
    const characters = [
        {
            name: 'Jackie',
            url: './img/jackie.jpg'
        }
    ]
    const [lastDirection, setLastDirection] = useState()



    const swiped = (direction, swipedUserId) => {

        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }



    return (
        <>
            <div className="dashboard">
                <ChatContainer />
                <div className="swipe-container">
                    <div className="card-container">

                        {characters.map((character) =>
                            <TinderCard
                                className="swipe"
                                key={character.name}
                                onSwipe={(dir) => swiped(dir, character.name)}
                                onCardLeftScreen={() => outOfFrame(character.nam)}>
                                <div
                                    style={{ backgroundImage: "url(" + character.url + ")" }}
                                    className="card">
                                    <h3>{character.name}</h3>
                                </div>
                            </TinderCard>
                        )}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard