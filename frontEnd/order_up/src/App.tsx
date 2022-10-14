import Landing from "./components/Landing/Landing";
//import Navbar from "./components/Navbar/Navbar";
//import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import Kitchen from "./components/Kitchen/Kitchen";
import Admin from "./components/Admin/Admin"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App"> 
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/menu" element={<Home/>}/>
        <Route path="/kitchen" element={<Kitchen/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
// /admin/menu
// /admin/kitchen
// /admin/menu/:id 
// /admin/kitchen/:id
// /admin/users
// /admin/users/:id