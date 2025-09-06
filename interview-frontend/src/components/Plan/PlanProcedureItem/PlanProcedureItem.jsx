import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { assignUsersToProcedures, getUserProcedure } from "../../../api/api";

const PlanProcedureItem = ({ procedure,planId, users }) => {


const [selectedUsers,setselectedUsers] = useState(null)
    const handleAssignUserToProcedure = async (e) => {
        let operation = 0;
        if(e && e.length == 0){
             
                operation = 0 // remove all
            var planUserProcedures = await getUserProcedure()
            var  storeUsers = [];
            storeUsers = planUserProcedures.filter(item => item.procedureId === procedure.procedureId && item.planId === planId)
            setselectedUsers([]);  
            storeUsers.forEach(item => {
                assignUsersToProcedures(planId,procedure.procedureId,item.userId,operation)
            })
                     
        }  
         if(e && e.length > 0){  
            setselectedUsers(e);      
        
        var planUserProcedures = await getUserProcedure()
                 var  storeUsers = [];
               
       
        
        storeUsers = planUserProcedures.filter(item => item.procedureId === procedure.procedureId && item.planId === planId)
        const dbCount = storeUsers.length;      
        let notExistingUser = [];
        
        if(dbCount > e.length){
            notExistingUser = storeUsers.filter(x => !e.some(p => p.value === x.userId))
           
                operation = 2 // remove
                notExistingUser.forEach(element => {
                assignUsersToProcedures(planId,procedure.procedureId,element.userId,operation)                 
                });
        }else{
         notExistingUser = e.filter(x => !storeUsers.some(p => p.userId === x.value)) //getItem({key:storageKey})
          operation = 1 
          notExistingUser.forEach(element => {
                assignUsersToProcedures(planId,procedure.procedureId,element.value,operation)                 
                });
        }
       
           
        }
             
      
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
