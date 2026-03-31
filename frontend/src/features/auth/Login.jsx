import { useLoginMutation } from "./authApiSlice";
import {setCredentials} from "./authSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Login = () => {

  const userRef = useRef()
  const errRef = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, {isLoading}] = useLoginMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState()

  useEffect(() => {
    userRef.current?.focus()
  },[])

  useEffect(() => {
    setErrMsg('')
  },[email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const {token, userId} = await login({email, password}).unwrap()
      console.log("Your accessToken is", token, userId)
      dispatch(setCredentials({token, userId}))
      setEmail('')
      setPassword('')
      navigate("/dash/home")
    } catch (error) {
      setErrMsg(error?.data?.message || "Login failed... try again")
      errRef.current.focus()
    }
    
  }

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
    
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950/70 backdrop-blur p-8 shadow-2xl"
    >
      
      <h2 className="text-2xl font-semibold text-center text-white mb-6">
        Login
      </h2>

      {errMsg && (
        <p className="mb-4 text-red-500 text-sm text-center">
          {errMsg}
        </p>
      )}

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-500 transition disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

    </form>
  </div>
);
}

export default Login
