import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/neet/online/class-11" element={<Class11Program/>}/>  
      <Route path="/neet/online/class-12" element={<Class12Program/>}/>
      <Route path="/" element={<Landing/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

function Class11Program() {
  return <div>
    NEET programs for class 11th.
  </div>
}
function Class12Program() {
  return <div>
    NEET programs for class 12th.
  </div>
}
  function Landing() {
    return <>
    Welcome to Allen !.
    </>
  }

export default App
