import React from 'react'
import { Link } from 'react-router-dom'
import Tooltip from '../Tooltip/Tooltip'

export default function Home() {
  return (
   <>
     <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Todo App</h1>
      <p className="text-lg text-center mb-8">
        Get started by creating your first todo item!
      </p>
    <Tooltip text='Dashboard'>
    <Link
        to="/dashboard"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
      >
        Go to Dashboard
      </Link>
    </Tooltip>
  
     
     
    </div>
   </>
  )
}
