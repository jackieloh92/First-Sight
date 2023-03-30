import { useCookies } from 'react-cookie'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const ChatHeader = ({ user }) => {
    let navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
    }

    const editProfile = () => {
        navigate('/edit')
    }



    const deleteProfile = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.delete('http://localhost:8000/user', {
                params: { userId }
            })
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/')
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"photo of " + user.first_name} />
                </div>
                <h3>{user.first_name}</h3>
                <div className="edit-icon" onClick={editProfile}>
                    <EditIcon />
                </div>
                <div className="delete-icon" onClick={deleteProfile}>
                    <DeleteIcon />
                </div>
            </div>
            <i className="log-out-icon" onClick={logout}>⇦</i>
        </div>
    )
}

export default ChatHeader