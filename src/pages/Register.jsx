import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase/config'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate = useNavigate()
    
    const handleRegister = async(e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            Swal.fire({
                icon: 'success',
                title: 'Register Success',
            })
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <p>register</p>
        <form onSubmit={handleRegister}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default Register