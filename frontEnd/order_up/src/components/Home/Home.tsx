import { useState } from "react"
import Menu from "../Menu/Menu";
import Cart from "../Cart/Cart";
import { order } from "../interfaces"

interface HomeProps {addNewOrder: Function};


const Home = ({ addNewOrder }: HomeProps) => {
  const newId = () => Math.floor(Math.random() * 100);

  const [order, setOrder] = useState<order>({ id: newId(), items: [] });

  const resetOrder = () => {
    const orderNumber = newId();
    setOrder({ id: orderNumber, items: [] });
  }

  const addItemToOrder = (name: string, price: number) => {
    let updateOrder = {
      ...order, 
      items: order.items.concat({name: name, price: price}),
    }
    setOrder(updateOrder);
  }

  return (
  <div>
    <div className="flex justify-around">
      <div className="w-10/12">
        <Menu addItemToOrder={addItemToOrder}/>
      </div>
      <div className="w-2/12">
        <Cart order={order} addNewOrder={addNewOrder} resetOrder={resetOrder}/>
      </div>
    </div>
  </div>
  )
}

export default Home;