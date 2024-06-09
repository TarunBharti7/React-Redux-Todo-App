import React from 'react'
import Navbar from './components/Navbar'
import AddTask from './components/AddTask'
import ShowTodo from './components/ShowTodo'

const App = () => {
  return (
    <div>
      <Navbar/>
      <AddTask/>
      <ShowTodo/>
    </div>
  )
}

export default App