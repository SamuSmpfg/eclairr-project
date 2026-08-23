import { useRef } from 'react'
import './style.css'
import api from '../../src/services/api'
import { Link } from 'react-router-dom'

function SignUp() {
  const inputName = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const inputChannelName = useRef<HTMLInputElement>(null)

  async function createUsers() {
    try {
      const response = await api.post('/user', {
        name: inputName.current?.value,
        email: inputEmail.current?.value,
        password: inputPassword.current?.value,
        channel: inputChannelName.current?.value,
      })

      const newUser = response.data.user

      if (!newUser || !newUser._id) {
        console.error('Usuário não foi criado corretamente:', response.data)
        return
      }

      window.location.href = `http://localhost:3000/?userId=${newUser._id}`
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  return (
    <div className='container'>
      <form>
        <h1>Sign Up</h1>
        <input placeholder='Name' name='name' type='text' ref={inputName}/>
        <input placeholder='Email' name='email' type='email' ref={inputEmail}/>
        <input placeholder='Password' name='password' type='password' ref={inputPassword}/>
        <input placeholder='Channel Name' name='channel' type='text' ref={inputChannelName}/>
        <button type='button' onClick={createUsers}>
          Sign Up
        </button>
        <p>Go back to {' '}
          <Link to='/' className='login-link'>Login!</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp