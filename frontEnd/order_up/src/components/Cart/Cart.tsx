import { useNavigate } from 'react-router-dom';
import { order } from '../interfaces'

interface CartProps { order: order,
                      addNewOrder: Function,
                      resetOrder: Function };

const Cart = ({order, addNewOrder, resetOrder}: CartProps) => {
  const navigate = useNavigate();
  const confirmOrder = () => {
    addNewOrder(order);
    resetOrder();
    //route to kitchen
    navigate('/kitchen');
  }
  return (
    <div className="">
      <p>Order Cart</p>
      { order.items.map((item) => <p><span>{item.name} </span><span> {'$' + String(item.price)}</span></p>) }
      <p>Total: <span> ${order.items.reduce((acc, item) => acc + item.price , 0)}</span></p>
      <div  onClick={confirmOrder}
            className="m-2 text-center text-white bg-blue-500 border-solid border-2 border-indigo-700 rounded hover:text-gray-300" >Confirm</div>
    </div>
  )
}

export default Cart;