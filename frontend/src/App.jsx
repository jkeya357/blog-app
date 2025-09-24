import Layout from "./components/Layout"
import Public from "./components/Public"
import Login from "./features/auth/Login"
import HomePage from "./features/auth/HomePage"
import WelcomeLayout from "./components/WelcomeLayout"
import { Routes, Route } from "react-router-dom"
import CreateUser from "./features/user/CreateUser"
import RequireAuth from "./features/auth/RequireAuth"
import CategoryList from "./features/category/CategoryList"
import TagsList from "./features/tags/TagsList"
import GetDrafts from "./features/drafts/GetDrafts"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="createUser" element={<CreateUser/>}/>

        {/*Protected Routes*/}
        <Route element={<RequireAuth/>}>
          <Route path="dash" element={<WelcomeLayout/>}>
            <Route path="home" element={<HomePage/>}/>
            <Route path="category" element={<CategoryList/>}/>
            <Route path="tags" element={<TagsList/>}/>
            <Route path="drafts" element={<GetDrafts/>}/>
          </Route>
        </Route>

      </Route>
    </Routes>
  )
}

export default App

