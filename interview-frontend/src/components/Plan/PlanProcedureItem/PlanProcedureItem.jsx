import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { getItem, setItem } from "../../localStorage/localStorage";
import { assignUsersToProcedures, getUserProcedure } from "../../../api/api";
import useUserProcedureState from "../../CustomHook/useUserProcedureState";

const PlanProcedureItem = ({ procedure,planId, users }) => {
    
//const storageKey = 'procedureId-'+procedure.procedureId


const [selectedUsers,setselectedUsers] = useState(null)
//const [procedureUsers,setProcedureUsers] = useState([])
    const handleAssignUserToProcedure = async (e) => {  
         if(e && e.length > 0){  
            setselectedUsers(e);      
        let operation = 0;
        var planUserProcedures = await getUserProcedure()
                 var  storeUsers = [];
                //  planUserProcedures.forEach(item => {
                //     storeUsers.push( e.filter(x => x.value === item.userId && item.procedureId === procedure.procedureId && item.planId === planId))
                //  }) 
       
        // planUserProcedures.forEach(item => {
        //     const matched = e.filter(
        //         x => x.value === item.userId &&
        //             item.procedureId === procedure.procedureId &&
        //             item.planId === planId
        //     );

        //     if (matched.length > 0) {
        //         storeUsers.push(...matched); 
                
        //     }
        // });
        //dbCount = storeUsers.length;
        storeUsers = planUserProcedures.filter(item => item.procedureId === procedure.procedureId && item.planId === planId)
        const dbCount = storeUsers.length;      
        let notExistingUser = [];
         if(e.length == 0 ){
                operation = 0 // remove all
                notExistingUser.push([{'value':0}])
            }
        else if(dbCount > e.length){
            notExistingUser = storeUsers.filter(x => !e.some(p => p.value === x.userId))
            //notExistingUser =  newuser?.filter(eItem => !e.some(nuItem => nuItem.value === eItem.value))
                operation = 2 // remove
                notExistingUser.forEach(element => {
                assignUsersToProcedures(planId,procedure.procedureId,element.userId,operation)                 
                });
        }else{
        //storeUsers = storeUsers.flat();
         notExistingUser = e.filter(x => !storeUsers.some(p => p.userId === x.value)) //getItem({key:storageKey})
          operation = 1 
          notExistingUser.forEach(element => {
                assignUsersToProcedures(planId,procedure.procedureId,element.value,operation)                 
                });
        }
        const newuser = storeUsers ?? [] ;
       
            // if(e.length == 0 ){
            //     operation = 0 // remove all
            //     notExistingUser.push([{'value':0}])
            // }
            // } else if (e.length > newuser?.length) {
            //     operation = 1 // add
            //     notExistingUser =  e.filter(eItem => !newuser.some(nuItem => nuItem.value === eItem.value))
            // }else {
            //     notExistingUser =  newuser?.filter(eItem => !e.some(nuItem => nuItem.value === eItem.value))
            //     operation = 2 // remove
            // }
            
            
            // if(notExistingUser.length > 0 && e.length !== newuser.length){
            //     notExistingUser.forEach(element => {
        

            //     assignUsersToProcedures(planId,procedure.procedureId,element.value,operation) 
                
            //     });
            // }
        }
             
        //setItem({key:storageKey,value:e})
    //     
    //   //userprocedure
    //   planUserProcedures.procedure = procedures.filter(x => planUserProcedures.some((p) => x.procedureId === p.procedureId))
         
    };
        useEffect( () => {(async () => {
                var planUserProcedures = await getUserProcedure()
                                //var  getUser = [];
                                let matchedUserForPlan = [];
                                planUserProcedures.forEach(item => {
                                const matched =   ( users.filter(x => x.value === item.userId && item.procedureId == procedure.procedureId &&  item.planId === planId))
                                if (matched.length > 0) {
                    matchedUserForPlan.push(...matched); // Push individual users (flattened)
                }
                }) 

                 if(matchedUserForPlan?.length > 0){
                   // matchedUserForPlan = matchedUserForPlan.filter(x => x.length > 0)
                   // getUser = (matchedUserForPlan);
                 setselectedUsers(matchedUserForPlan)
                  handleAssignUserToProcedure(matchedUserForPlan)
                 }
      })();}
               
           ,[])
  

    return (
        <div className="py-2">
            <div>
                {procedure.procedureTitle}
            </div>

            <ReactSelect
                className="mt-2"
                placeholder="Select User to Assign"
                isMulti={true}
                options={users}
                value={selectedUsers}
                isClearable = {true}
                onChange={(e) => handleAssignUserToProcedure(e)}
            />
        </div>
    );
};

export default PlanProcedureItem;
