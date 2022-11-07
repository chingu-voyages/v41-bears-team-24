import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import CartItem from './CartItem';
import { cartOrder } from '../interfaces'
import { createOrder } from '../../utils/api';

interface CartProps { order: cartOrder,
                      setOrder: Function,
                      addNewOrder: Function,
                      resetOrder: Function };

const Cart = ({order, setOrder, addNewOrder, resetOrder}: CartProps) => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const confirmOrder = async () => {
    const ok = await sendOrder();
    //addNewOrder(order);
    if (ok) {
      resetOrder();
      navigate('/kitchen');
    }
  }

  const cancelOrder = () => {
    resetOrder();
  }

  const deleteItem = (id: number) => {
    const newArray =  order.items.filter((item) => item.id !== id );
    setOrder({id: order.id, items: newArray}) ;
  }

  const sendOrder = async () => {
    try {
      const convertedItems = order.items.map((item) => {
        return {quantity: item.quantity, modifications: item.modification, menuItemId: item.menuItemId}
      })
      const data = await createOrder({customerName:customerName, orderItems: convertedItems});
      console.log(data);
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="relative">
      <p>Order Cart</p>
      <p>Customer Name:</p>
      <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder={'Customer #' + order.id}className="p-1 rounded-lg bg-blue-100"/>

        <div onClick={cancelOrder} className="absolute top-1 right-1 p-2 bg-red-400 text-white rounded-xl hover:bg-red-600 cursor-pointer">
          Cancel
        </div>
      { order.items.map((item, index) => <CartItem key={item.id}
                                                   setModification={setModification}
                                                   deleteItem={deleteItem}
                                                   id={item.id}
                                                   name={item.name}
                                                   price={item.price}
                                                   modification={item.modification}/> )}
      <p className='font-bold'>Total: <span> ${order.items.reduce((acc, item) => acc + parseFloat(item.price) , 0.0).toFixed(2)}</span></p>
      <div  onClick={confirmOrder}
            className="m-2 text-center px-1 py-2 text-white text-md bg-green-500 rounded-xl hover:bg-green-600 cursor-pointer" >Confirm
      </div>
    </div>
  )
}

export default Cart;