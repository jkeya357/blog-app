import { useRefreshMutation } from "./authApiSlice";
import { useEffect, useState, useRef } from "react";
import { useDispatch} from "react-redux";
import { setCredentials } from "./authSlice";
import LoadingComponent from "../../components/LoadingComponent";


const AuthProvider = ({children}) => {

    const [refresh] = useRefreshMutation()
    const dispatch = useDispatch()
    const hasRun = useRef(false)
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {

        if (hasRun.current) return;
        hasRun.current = true;

        const handleRefresh = async () => {
            try {
                const res = await refresh().unwrap()
                dispatch(setCredentials({token: res.token, userId: res.userId}))
            } catch (error) {
                console.log("failed retrieving refresh token", error)      
            }finally{
                setIsInitializing(false)
            }   
        }
        handleRefresh()
    },[])

    if(isInitializing) return <LoadingComponent/>

  return (
    <>{children}</>
  )
}

export default AuthProvider