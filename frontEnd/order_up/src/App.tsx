import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { order } from "./components/interfaces";
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Kitchen from "./components/Kitchen/Kitchen";
import Admin from "./components/Admin/Admin";


function App() {
  const [activeOrders, setActiveOrders] = useState<order[]>([]);

  const addNewOrder = (order: order) => {
    console.log(activeOrders)
    setActiveOrders(activeOrders.concat(order));
  }

  return (
    <div>
      <Navbar/> {/* remove if on landing page */}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/menu" element={<Home addNewOrder={addNewOrder}/>}/>
        <Route path="/kitchen" element={<Kitchen activeOrders={activeOrders}/>}/>
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