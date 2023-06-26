import { nanoid } from "nanoid";
import { createContext, useState } from "react";

//!defining types todos 
export type SubTaskInput = {
    todoId: string;
    subtask: string;
    subTaskId:string;
    isCompleted?: boolean;
  };  
  export type TodoInputType = {
    id: string;
    title: string;
    subTasks: SubTaskInput[] | [];
  };

  //!defining types of globaltodocontext 
  export type GlobalTodoContextType={
     allTodos: TodoInputType[] | null,
     addNewTodo: (todo:string)=>void,
     addNewSubtask:(subTask:string,todo_Id:string)=>void,
     editSubTaskHandler:(newSubtask:string,subTaskId:string,todoId:string)=>void,
     updateSubtaskStatusHandler:(subTaskId:string,status:boolean)=>void
     
  }
//!GlobalTodoContext initialization 
export const GlobalTodoContext= createContext<GlobalTodoContextType>({} as GlobalTodoContextType);

//! GlobalTodoContext provider to share data 
export const GlobalTodoContextProvider= ({children}:{children:React.ReactNode})=>{
  const [todos, setTodos] = useState<TodoInputType[]>([]); // state for storing todos
  // console.log('global todo context value',todos)
  //! functiont add new todo 
   const addNewTodoHandler =(todo:string)=>{
    const allTodo= todos;
     const newTodo:TodoInputType={
        id:nanoid(),
        title:todo,
        subTasks:[]
     }
     allTodo.push(newTodo);
     setTodos(allTodo)

   }

    //! functiont add new subtask 
    const addNewSubTaskHandler =(subtask:string,todo_Id:string)=>{
      //! getting current todo from todos
      let subid=nanoid();
        const currentTodo= todos.filter((todo)=>todo.id===todo_Id);
        //!current subtask of the current todo
          const currentSubtask:SubTaskInput[]= currentTodo[0].subTasks;
          //!new subtask instance
          const newSubtask:SubTaskInput={
             todoId:todo_Id,
             subtask,
             subTaskId:subid,
             isCompleted:false
          }
           //!adding new subtask to the current subtask list
         currentSubtask.push(newSubtask);
         //! now replacing the updated subtask list with the old one for the current todo
          const updatedTodos= todos.map((currentTodo)=>{
             if(currentTodo.id===todo_Id){
              currentTodo.subTasks=currentSubtask
              return currentTodo
             }
             else {
              return currentTodo
             }
          })
          //updating the todo list 
          setTodos(updatedTodos);
        //  console.log('updated todo list',updatedTodos)
    }
    //** Edit subtask */
    const editSubTaskHandler =(newSubtask:string,subtaskId:string,todoId:string)=>{
       const updatedTodos= todos.map((currentTodo)=>{
          if(currentTodo.id===todoId && currentTodo.subTasks){
              currentTodo.subTasks= currentTodo.subTasks.map((task)=>{
                 if(task.subTaskId===subtaskId){
                  task.subtask=newSubtask;
                  return task
                 }
                 return task
              })
             

          }
          return currentTodo
       })
        //!updating todo list with updated data 
        setTodos(updatedTodos);
        
       console.log('updated todos',updatedTodos)
    }
    //** Update subtask status  */
    const updateSubtaskStatusHandler=(subTaskId:string,status:boolean)=>{
      const updatedSubtaskStatus= todos.map((currentTodo)=>{
          if(currentTodo.subTasks){
          currentTodo.subTasks.map((subtask)=>{
               if(subtask.subTaskId===subTaskId){
                  subtask.isCompleted=status;
                  return subtask
               }
               return subtask
            })
          }
          return currentTodo
      });
      // console.log('updating subtask status',updatedSubtaskStatus)
       setTodos(updatedSubtaskStatus)
    }
   //!defining  types for todo context value
    const todoContextValue:GlobalTodoContextType={
       allTodos:todos,
       addNewTodo:addNewTodoHandler,
       addNewSubtask:addNewSubTaskHandler,
       editSubTaskHandler,
       updateSubtaskStatusHandler

    }
 return (
  <GlobalTodoContext.Provider value={todoContextValue}>
 {children}
  </GlobalTodoContext.Provider>
 )
}