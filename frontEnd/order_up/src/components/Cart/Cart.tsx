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

  const setItemDetails = (id: number, modification: string, quantityInput: string) => {
    const newArray = order.items.map((item) => {
      if (item.id !== id) {
        return item;
      } else {
        console.log({...item, modification: modification, quantity: parseInt(quantityInput,10)});
        return {...item, modification: modification, quantity: parseInt(quantityInput,10)};
      }
    })
    console.log(newArray);
    setOrder({...order, items: newArray});
  }

  const deleteItem = (id: number) => {
    const newArray =  order.items.filter((item) => item.id !== id );
    setOrder({id: order.id, items: newArray}) ;
  }

  const calculateTotal = () => {
    return order.items.reduce((acc, item) => {
      return acc + parseFloat(item.price) * item.quantity
    }
       , 0.0).toFixed(2);
  }

  const sendOrder = async () => {
    try {
      const convertedItems = order.items.map((item) => {
        return {quantity: item.quantity, modifications: item.modification, menuItemId: item.menuItemId}
      })
      //consolidate multiple identical menu items into single item with 'quantity' count
      const shortOrder: any[] = [];
      convertedItems.forEach((item) => {
        let matchingIdx = -1;
        for (let i = 0; i < shortOrder.length; i++) {
          if (shortOrder[i].menuItemId === item.menuItemId && shortOrder[i].modifications === item.modifications) {
            matchingIdx = i;
          }
        }
        if (matchingIdx > -1) shortOrder[matchingIdx].quantity++;
        else shortOrder.push(item);
      });
      const data = await createOrder({customerName: customerName, orderItems: shortOrder});
      console.log(data);
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="relative shadow-md h-full p-2 pb-10">
      <p className='text-center text-xl mb-3'>Order Cart</p>
      <p>Customer Name:</p>
      <input type="text"  value={customerName} placeholder={'Customer #' + order.id}
             className="p-1 rounded-lg bg-blue-100 mb-4"
             onChange={(e) => setCustomerName(e.target.value)}/>

        {/* <div onClick={cancelOrder} className="absolute top-1 right-1 p-2 bg-red-500 text-white rounded-xl hover:bg-red-700 cursor-pointer">
          Cancel
        </div> */}
      { order.items.map((item, index) => <CartItem key={item.id}
                                                   setItemDetails={setItemDetails}
                                                   deleteItem={deleteItem}
                                                   id={item.id}
                                                   name={item.name}
                                                   price={item.price}
                                                   modification={item.modification}
                                                   quantity={item.quantity}/> )}
      <p className='font-bold text-xl'>Total: <span> ${calculateTotal()}</span></p>

      <div className='flex'>
        <div  onClick={confirmOrder}
              className="w-full m-2 text-center px-1 py-2 text-white text-md bg-green-500 rounded-xl hover:bg-green-600 cursor-pointer" >Confirm
        </div>
        <div onClick={cancelOrder} className="m-2 p-2 text-center bg-red-500 text-white rounded-xl hover:bg-red-700 cursor-pointer">
          Cancel
        </div>
      </div>
    </div>
  )
}

export default Cart;