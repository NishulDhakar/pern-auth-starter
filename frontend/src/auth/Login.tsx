import { useState } from "react"
import { loginAPI } from "../api/auth.api"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handle = async () => {
    const res = await loginAPI({ email, password })
    login(res.data.user, res.data.token)
    navigate("/")
  }

  return (
    <div>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handle}>Login</button>
    </div>
  )
}
