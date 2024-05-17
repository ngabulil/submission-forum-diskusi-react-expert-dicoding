import { sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase/config'
import Swal from 'sweetalert2'

const ResetPassword = () => {
    const [email, setEmail] = React.useState("")

    const handleResetPassword = async(e) => {
        e.preventDefault()
        try {
            await sendPasswordResetEmail(auth, email)
            Swal.fire({
                icon: 'success',
                title: 'Reset Password Success',
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <p>reset password</p>
      <form>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button onClick={handleResetPassword}>Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword