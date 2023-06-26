import React, { FormEvent, useContext, useEffect, useState } from "react";
import { ErrorType } from "../Auth/Login";
import { sanitizeInput } from "../../Utils/DomPurify";
import { GlobalTodoContext, SubTaskInput } from "../../ContextApi/GlobalContext/GlobalTodoContext";
//! confirm modal props type
export type EditSubtaskModalBodyType = {
  subTask:SubTaskInput
  closeModalHandler: () => void;
};
export default function EditSubtaskModalBody({
  subTask,
  closeModalHandler,
}: EditSubtaskModalBodyType) {
  //!states for the component
   const [errorMessage,setErrorMessage]=useState<ErrorType>({} as ErrorType);
   const [editSubtask,setEditSubtask]=useState<string>('');
   const {editSubTaskHandler}=useContext(GlobalTodoContext);

   const updateTodo=(e:React.SyntheticEvent)=>{
      e.preventDefault();
      const { subTaskId,todoId}=subTask
       editSubTaskHandler(editSubtask,subTaskId,todoId);
       closeModalHandler()
   }
   useEffect(()=>{setEditSubtask(subTask.subtask)},[])
  return (
    <>
      <div className="p-6 ">
        {errorMessage.password ? (
          <p className=" text-sm text-red-500 mb-1">{errorMessage.password}</p>
        ) : (
          <p className=" mb-1 text-md ">Todo Title </p>
        )}
        <input
          type="text"
          name="title"
          value={editSubtask}
          onChange={(e:FormEvent<HTMLInputElement>) => {
            setEditSubtask(sanitizeInput(e.currentTarget.value))
            setErrorMessage({});
          }}
          className="px-5 mb-5 py-2  border w-full "
        />
        <button
          onClick={updateTodo}
          className="w-full p-2 mb-2 rounded font-medium text-md text-slate-900 bg-orange-300"
        >
          Submit
        </button>
        {errorMessage.invalidInfo && (
          <h5 className="text-center text-red-500 ">
            {errorMessage.invalidInfo}
          </h5>
        )}
        {errorMessage.passwordChanged && (
          <p className="text-center text-sm  text-green-500">
            {errorMessage.passwordChanged}
          </p>
        )}
      </div>
    </>
  );
}
