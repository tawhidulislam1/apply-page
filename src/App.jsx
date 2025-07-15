
import './App.css'
import DreamHomeHeader from './components/DreamHomeHeader'
import From from './components/from'
import Navbar from './components/Navbar'
import Particle from './components/particles'

function App() {

  return (
    <>
      {/* <Particle></Particle> */}
      <Navbar className='z-[999]'></Navbar>
      <DreamHomeHeader></DreamHomeHeader>
      <From className='z-[999]'></From>
      <div className="w-11/12 mx-auto max-w-7xl">
      </div>
    </>
  )
}

export default App
