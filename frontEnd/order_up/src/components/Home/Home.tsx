import { useState } from "react"
import Menu from "../Menu/Menu";
import Cart from "../Cart/Cart";
import { cartOrder } from "../interfaces"

interface HomeProps {addNewOrder: Function, menuCategories: any[], menuItems: any[]};


const Home = ({ addNewOrder, menuCategories, menuItems }: HomeProps) => {
  const newId = () => Math.floor(Math.random() * 100);

  const [order, setOrder] = useState<cartOrder>({ id: newId(), completed: false, items: [] });

  const resetOrder = () => {
    const orderNumber = newId();
    setOrder({ id: orderNumber,completed: false, items: [] });
  }

  const addItemToOrder = (name: string, price: string, menuItemId: number) => {
    let id = Math.floor(Math.random() * 10000);
    console.log(order);
    let updateOrder = {
      ...order, 
      items: order.items.concat({name: name, price: price, modification: '', menuItemId: menuItemId, id: id, quantity: 1}),
    }
    setOrder(updateOrder);
  }

  return (
  <div>
    <div className="flex justify-around">
      <div className="w-10/12">
        <Menu addItemToOrder={addItemToOrder}
              menuCategories={menuCategories}
              menuItems={menuItems}/>
      </div>
      <div className="w-2/12">
        <Cart order={order}
              setOrder={setOrder}
              addNewOrder={addNewOrder}
              resetOrder={resetOrder}/>
      </div>
    </div>
  </div>
  )
}

export default Home;