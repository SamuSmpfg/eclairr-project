import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/user')
      setUsers(usersFromApi.data.users)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
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
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Log in</h1>
        <p>Don't have an Account?{' '}
          <Link to='/sign-up' className='signup-link' >Sign Up!</Link>
        </p>
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