import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import "./App.css";

// install react-router-dom.
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/neet/online/class-11" element={<Class11Program />} />
            <Route path="/neet/online/class-12" element={<Class12Program />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
function Layout() {
  return <div>
    <Header/>
    <div>
      <Outlet/>
    </div>
   footer  
  </div>
}

function Header() {
  return (
    <div>
      <Link to="/">Allen</Link>
      <Link to="/neet/online/class-11">Class 11</Link>
      <Link to="/neet/online/class-12">Class 12</Link>
    </div>
  );
}
function ErrorPage() {
  return <div>Sorry page not found.</div>;
}

function Class11Program() {
  return <div>NEET programs for class 11th.</div>;
}
function Class12Program() {
  const navigate = useNavigate();
  function redirectUser() {
    navigate("/");
  }
  return (
    <div>
      NEET programs for class 12th.
      <button onClick={redirectUser}>Go back to landing page. </button>
    </div>
  );
}
function Landing() {
  return <>Welcome to Allen !.</>;
}

export default App;
