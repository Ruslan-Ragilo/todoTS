import './App.scss'
import FormToDo from './components/FromToDo'
import ListToDo from './components/ListToDo'

function App() {
  return (
    <div className="wrepperToDo">
      <h1 className='text-center mb-5 text-primary'>ToDo</h1>
      <FormToDo />
      <ListToDo />
    </div>
  )
}

export default App
