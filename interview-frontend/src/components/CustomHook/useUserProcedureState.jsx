import React , {useState,useEffect} from 'react'
import { getUserProcedure } from '../../api/api'



const useUserProcedureState = async ({setUserProcedure}) => {
    
const [procedureUsers,setprocedureUsers] = useState([])
var planUserProcedures = await getUserProcedure();
              
setprocedureUsers(planUserProcedures)
           
    return [procedureUsers,setprocedureUsers]
}

export default  useUserProcedureState