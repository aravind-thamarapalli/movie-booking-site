import './App.css'
import BookingWindow from './components/BookingWindow'
import Content from './components/Content'
import DashBoard from './components/DashBoard'
import Hero from './components/Hero'
import SignUp from './components/SignUp'
import { Routes, Route } from 'react-router-dom'
import AddActiveMovie from './components/AddActiveMovie'
import AddUpcomingMovie from './components/AddUpcomingMovie'

function App() {

  return (
    <>
      <Routes>
        <Route path='/Hero' element={<Hero />} />
        <Route path='/content' element={<Content />} />
        <Route path='/booking' element={<BookingWindow />} />
        <Route path='/' element={<Hero />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/dashboard' element= {<DashBoard />} />
        <Route path='/AddActiveMovie' element= {<AddActiveMovie />} />
        <Route path='/AddUpcomingMovie' element= {<AddUpcomingMovie />} />
      </Routes>
    </>
  )
}

export default App
