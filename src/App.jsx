import { BrowserRouter, Route, Routes,Link,useNavigate } from "react-router-dom";
import "./App.css";

// install react-router-dom.
function App() {
  return (
    <>
      <BrowserRouter>
      <Link  to="/">Allen</Link> 
      <Link  to="/neet/online/class-11">Class 11</Link> 
      <Link  to="/neet/online/class-12">Class 12</Link> 
        <Routes>
          <Route path="/neet/online/class-11" element={<Class11Program />} />
          <Route path="/neet/online/class-12" element={<Class12Program />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </ BrowserRouter>
    </>
  );
}

function Class11Program() {
  return <div>NEET programs for class 11th.</div>;
}
function Class12Program() {
  const navigate=useNavigate();
  function redirectUser() {
    navigate("/");
  }
  return <div>
    NEET programs for class 12th.
    <button onClick={redirectUser}>Go back to landing page. </button></div>;
}
function Landing() {
  return <>Welcome to Allen !.</>;
}

export default App;
