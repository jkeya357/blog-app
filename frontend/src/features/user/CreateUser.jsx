import { useSignupMutation } from "../auth/authApiSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCredentials } from "../auth/authSlice"

const CreateUser = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [signup, {isSuccess, isLoading}] = useSignupMutation()
  console.log("SIGN UP MUTATION: ",useSignupMutation())

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [errMsg, setErrMsg] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await signup({email, password, name}).unwrap()
      console.log("RESPONSE FROM CREATE REQUEST: ", res)
      alert("User created successfully")
      setEmail('')
      setPassword('')
      setName('')
      dispatch(setCredentials({token: res.token, userId: res.userId}))
      navigate("/dash/home")
      
    } catch (error) {
      setErrMsg(error?.data?.message || "Login failed... try again")
    }
  }

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
    
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950/70 backdrop-blur p-8 shadow-2xl"
    >
      
      <h2 className="text-2xl font-semibold text-center text-white mb-6">
        Sign up
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-500 transition disabled:opacity-50"
      >
        {isLoading ? "Creating account..." : "Sign up"}
      </button>

    </form>
  </div>
);
}

export default CreateUser
