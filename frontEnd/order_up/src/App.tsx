import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { cartOrder } from "./components/interfaces";
import { User, EmptyUser } from "./components/interfaces";
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Kitchen from "./components/Kitchen/Kitchen";
import Admin from "./components/Admin/Admin";

//const EmptyUser = {createdAt: '', firstName: '', lastName: '', id: 0, password: '', role: '', username: ''};

const getSessionValue = (key: string) => {
  let value;
  try {
    value = JSON.parse( sessionStorage[key] );
  }
  catch {
    value = null;
  }
  return value;
}

function App() {
  const [menuCategories, setMenuCategories] = useState<any[]>(getSessionValue('menuCategories') ||[]);
  const [menuItems, setMenuItems] = useState<any[]>(getSessionValue('menuItems') ||[]);
  const [activeOrders, setActiveOrders] = useState<cartOrder[]>([]);
  const [loggedIn, setLoggedIn] = useState<User>(getSessionValue('loggedIn') || EmptyUser);

  //save login data in session storage
  useEffect(() => {
    sessionStorage.loggedIn = JSON.stringify(loggedIn);
  },[loggedIn]);

  //save menu categories in session storage
  useEffect(() => {
    sessionStorage.menuCategories = JSON.stringify(menuCategories);
  },[menuCategories]);

  //save menu items in session storage
  useEffect(() => {
    sessionStorage.menuItems = JSON.stringify(menuItems);
  },[menuItems]);

  const addNewOrder = (order: cartOrder) => {
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
        <Route path="/kitchen" element={<Kitchen activeOrders={activeOrders}
                                                 setActiveOrders={setActiveOrders}/>}/>
        <Route path="/admin" element={<Admin menuCategories={menuCategories}
                                             setMenuCategories={setMenuCategories}
                                             menuItems={menuItems}
                                             setMenuItems={setMenuItems}/>}/>
      </Routes>
    </div>
  );
}

export default App;
