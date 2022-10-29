import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { order } from "./components/interfaces";
import { User } from "./components/interfaces";
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Kitchen from "./components/Kitchen/Kitchen";
import Admin from "./components/Admin/Admin";



function App() {
  const [menuCategories, setMenuCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [activeOrders, setActiveOrders] = useState<order[]>([]);
  const [loggedIn, setLoggedIn] = useState<User>({createdAt: '', firstName: '', lastName: '', id: 0,
    password: '', role: '', username: ''});

  const addNewOrder = (order: order) => {
    console.log(activeOrders)
    setActiveOrders(activeOrders.concat(order));
  }

  return (
    <div>
      <Navbar loggedIn={loggedIn}/>
      <Routes>
        <Route path="/" element={<Landing setLoggedIn={setLoggedIn}
                                          setMenuCategories={setMenuCategories}
                                          setMenuItems={setMenuItems}/>}/>
        <Route path="/menu" element={<Home addNewOrder={addNewOrder}
                                      menuCategories={menuCategories}
                                      menuItems={menuItems}/>}/>
        <Route path="/kitchen" element={<Kitchen activeOrders={activeOrders}/>}/>
        <Route path="/admin" element={<Admin menuCategories={menuCategories}
                                             setMenuCategories={setMenuCategories}
                                             menuItems={menuItems}
                                             setMenuItems={setMenuItems}/>}/>
      </Routes>
    </div>
  );
}

export default App;
