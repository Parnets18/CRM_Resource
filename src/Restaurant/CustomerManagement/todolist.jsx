import React, { useState } from 'react'

const [adddata , setdata] = useState([])

const handleSubmit ={

}

const todolist = () => {
  return (
    <div>
      <h1> To do list</h1>
       <input 
        type="text"

       />
       <button onClick={handleSubmit}> Add List </button>
    </div>
  )
}

export default todolist