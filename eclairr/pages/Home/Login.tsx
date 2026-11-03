import { useEffect, useState } from 'react'
import './style.css'
import api from '../../src/services/api'
import { FaRegTrashAlt } from 'react-icons/fa'

interface User {
  _id: string
  name: string
  email: string
  channel: string
}

function Login() {
  const [users, setUsers] = useState<User[]>([])
  const [loginLink, setLoginLink] = useState('')

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/user')
      setUsers(usersFromApi.data.users)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  async function getLoginLink() {
    try {
      const res = await api.get('/auth/login-link')
      setLoginLink(res.data.loginLink)
    } catch (error) {
      console.error('Erro ao buscar link de login:', error)
    }
  }

  function loginAs(_id: string) {
    window.location.href = `http://localhost:3000/?userId=${_id}`
  }

  async function deleteUsers(_id: string) {
    await api.delete(`/user/${_id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
    getLoginLink()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Log in</h1>
       <a href={loginLink} rel='noopener noreferrer' className='youtube-login-link'>
  Log in with Youtube
</a>
      </form>

      {users.map((user) => (
        <div key={user._id} className='card'>
          <div onClick={() => loginAs(user._id)} style={{ cursor: 'pointer' }}>
            <p>Name: <span>{user.name}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Channel: <span>{user.channel}</span></p>
          </div>
          <button onClick={() => deleteUsers(user._id)}>
            <FaRegTrashAlt color='#fff' size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login