import { useCreateUserMutation } from "./UserApiSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCredentials } from "../auth/authSlice"

const CreateUser = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, {isSuccess, isLoading}] = useCreateUserMutation()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [errMsg, setErrMsg] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const {token} = await data({email, password, name}).unwrap()
      alert("User created successfully")
      setEmail('')
      setPassword('')
      setName('')
      dispatch(setCredentials({token}))
      navigate("/dash/home")
      
    } catch (error) {
      setErrMsg(error?.data?.message || "Login failed... try again")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign up</h2>

        {errMsg && (
          <p className="mb-4 text-red-600 text-sm text-center">{errMsg}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </div>
  )
}

export default CreateUser
