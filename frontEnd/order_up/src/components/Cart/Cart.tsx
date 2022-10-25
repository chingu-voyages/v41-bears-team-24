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

  const cancelOrder = () => {
    resetOrder();
  }
  return (
    <div className="relative">
      <p>Order Cart</p>
      <p>Order#{order.id}
        <div onClick={cancelOrder} className="absolute top-1 right-1 bg-red-400 text-white border-solid border-2 border-red-700 rounded hover:text-gray-300"
              >Cancel</div>
      </p>
      { order.items.map((item) => <p><span>{item.name} </span><span> {'$' + String(item.price)}</span></p>) }
      <p>Total: <span> ${order.items.reduce((acc, item) => acc + item.price , 0)}</span></p>
      <div  onClick={confirmOrder}
            className="m-2 text-center px-1 py-2 text-white text-md bg-green-500 border-solid border-2 border-green-700 rounded hover:text-gray-300" >Confirm
      </div>
    </div>
  )
}

export default Cart;