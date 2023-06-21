import React, { FormEvent, useContext, useState } from 'react'
import { FormEncType } from 'react-router-dom';
import { GlobalTodoContext } from '../../ContextApi/GlobalContext/GlobalTodoContext';
import TodoList from '../TodoList/TodoList';
import { sanitizeInput } from '../../Utils/DomPurify';
export const TODO_INPUT_PATTERN= /^[a-zA-Z0-9\s]+$/;
export default function Dashboard() {
  //!todo input state
  const [todoinput,setTodoInput]=useState<string>('');
  const [errorMessage,setErrorMessage]=useState<string>('')
  const {addNewTodo,allTodos}= useContext(GlobalTodoContext);

  const todoHandler=(e:React.SyntheticEvent)=>{
    e.preventDefault();
    //!validation and empty field check 
      if((todoinput && TODO_INPUT_PATTERN.test(todoinput))){
        addNewTodo(todoinput);
     setTodoInput('')
      }else{
       setErrorMessage('This field is required.')
      }
  }
 console.log('todo input',todoinput)
  return (
    <>
    <div className='container mx-auto my-32 p-5 '>
     <form >
     <div className="flex sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mb-0 mx-auto">
      <input
        type="text"
        className="flex-grow border border-gray-300 p-2 rounded-l"
        placeholder="Enter a new todo..."
         value={todoinput}
         onChange={(e:FormEvent<HTMLInputElement>)=>{
          //! sanitization of input fields
          const sanitizedValue= sanitizeInput(e.currentTarget.value);
          setTodoInput(sanitizedValue);
          setErrorMessage('')
         }}
      />
      <button
      type='submit'
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
         onClick={todoHandler}
      >
        Add Todo
      </button>
    </div>
    <div className={`sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 h-5 mx-auto mb-5 ${errorMessage?"visible":"invisible"}`}>
      <p className='text-red-500'>{errorMessage}</p>
    </div>
    
     </form>
     {/* listing all the todos */}
    {allTodos &&  <TodoList allTodos={allTodos }/>}
    </div>
    </>
  )
}
