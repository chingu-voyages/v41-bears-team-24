import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { cartOrder } from '../interfaces'
import { createOrder } from '../../utils/api';

interface CartProps { order: cartOrder,
                      setOrder: Function,
                      addNewOrder: Function,
                      resetOrder: Function };

const Cart = ({order, setOrder, addNewOrder, resetOrder}: CartProps) => {
  const navigate = useNavigate();

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

  const setModification = (id: number, value: string) => {
    const newArray = order.items.map((item) => {
      if (item.id !== id) {
        return item;
      } else {
        console.log({...item, modification: value});
        return {...item, modification: value};
      }
    })
    console.log(newArray);
    setOrder({...order, items: newArray});
  }

  const deleteItem = (id: number) => {
    const newArray =  order.items.filter((item) => item.id !== id );
    setOrder({id: order.id, items: newArray}) ;
  }

  const sendOrder = async () => {
    try {
      console.log('starting post')
      const convertedItems = order.items.map((item) => {
        return {quantity: 1, modifications: item.modification, menuItemId: item.menuItemId}
      })
      const data = await createOrder({customerName:'Josh', orderItems: convertedItems});
      console.log('post complete')
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
      <input type="text" placeholder={'Customer #' + order.id}className="border-2 border-solid border-grey-300 bg-blue-100"/>

        <div onClick={cancelOrder} className="absolute top-1 right-1 p-2 bg-red-400 text-white border-solid border-2 border-red-700 rounded hover:text-gray-300">
          Cancel
        </div>
      { order.items.map((item, index) => <CartItem key={item.id}
                                                   setModification={setModification}
                                                   deleteItem={deleteItem}
                                                   id={item.id}
                                                   name={item.name}
                                                   price={item.price}
                                                   modification={item.modification}/> )}
      <p>Total: <span> ${order.items.reduce((acc, item) => acc + parseFloat(item.price) , 0.0).toFixed(2)}</span></p>
      <div  onClick={confirmOrder}
            className="m-2 text-center px-1 py-2 text-white text-md bg-green-500 border-solid border-2 border-green-700 rounded hover:text-gray-300" >Confirm
      </div>
    </div>
  )
}

export default Cart;