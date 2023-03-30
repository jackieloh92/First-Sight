import Nav from '../components/Nav'
<<<<<<< HEAD
import AuthModal from "../components/AuthModal"
=======
import AuthModal from '../components/AuthModal'
>>>>>>> e3d3e9580c77683d323eb83f33cc9fb11f512534
import { useState } from 'react'
import { useCookies } from "react-cookie"

const Home = () => {
<<<<<<< HEAD
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className="overlay">
            <Nav
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="primary-title">First Sight®</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>


                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
                )}
            </div>
        </div>
    )
}
export default Home
=======
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

  const authToken = false

  const handleClick = () => {
    console.log('clicked')
    setShowModal(true)
    setIsSignUp(true)
  }
  return (
    <div className='overlay'>
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className='home'>
        <h1 className='primary-title'>Swipe Right</h1>
        <button className='primary-button' onClick={handleClick}>
          {authToken ? 'Signout' : 'Create Account'}
        </button>

        {showModal && (
          <AuthModal
            setShowModal={setShowModal}
            setIsSignUp={setIsSignUp}
            isSignUp={isSignUp}
          />
        )}
      </div>
    </div>
  )
}

export default Home
>>>>>>> e3d3e9580c77683d323eb83f33cc9fb11f512534
