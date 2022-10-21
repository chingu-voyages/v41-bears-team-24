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
  const [login, setLogin] = useState<string>('');

  const addNewOrder = (order: order) => {
    console.log(activeOrders)
    setActiveOrders(activeOrders.concat(order));
  }

  return (
    <div>
      <Navbar login={login}/> {/* remove if on landing page */}
      <Routes>
        <Route path="/" element={<Landing setLogin={setLogin}/>}/>
        <Route path="/menu" element={<Home addNewOrder={addNewOrder}/>}/>
        <Route path="/kitchen" element={<Kitchen activeOrders={activeOrders}/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
