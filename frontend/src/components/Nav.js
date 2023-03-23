import whiteLogo from '../images/tinder_logo_white.png'
import colorLogo from '../images/color-logo-tinder.png'

const Nav = ({ minimal, authToken, setShowModal, setIsSignUp }) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? colorLogo : whiteLogo} />
            </div>
            {!authToken && !minimal && <button
                className="nav-button"
                onClick={handleClick}
            >Log in</button>}
        </nav>
    )
}

export default Nav