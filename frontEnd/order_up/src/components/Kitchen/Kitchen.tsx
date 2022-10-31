import { useState } from 'react';
import { cartOrder } from "../interfaces";

interface KitchenProps { activeOrders: cartOrder[], setActiveOrders: Function }

const Kitchen = ({ activeOrders, setActiveOrders }:KitchenProps) => {
  const [filterTab, setFilterTab] = useState('Active');
  const activeFocus = filterTab === 'Active' ? "bg-blue-900" : "bg-blue-500";
  const completedFocus = filterTab === 'Completed' ? "bg-blue-900" : "bg-blue-500"
  console.log(activeOrders);
  const setCompleted = (id: number) => {
    //await: send to API here
    //if confirmed...
    const newOrders = activeOrders.map((order) => {
      if (order.id !== id) {
        return order;
      } else {
        console.log({...order, completed: true})
        return {...order, completed: true};
      }
    })
    setActiveOrders(newOrders);
  }
  return (
    <>
      <h3 className="text-3xl text-center">{filterTab} orders</h3>
      <div className="flex justify-center">
        <div onClick={() => {setFilterTab('Active')}}
            className={"m-2 text-white text-2xl align-middle px-8 pb-1 border-solid border-2 border-blue-700 rounded " + activeFocus}>
            Active
        </div>
        <div onClick={() => {setFilterTab('Completed')}}
            className={"m-2 text-white text-2xl align-middle px-4 pb-1 border-solid border-2 border-blue-700 rounded " + completedFocus}>
            Completed
        </div>
      </div>
      <div className="flex flex-wrap justify-right">
      {activeOrders.filter((order) => {
                      return (filterTab === 'Completed' && order.completed === true) ||
                             (filterTab === 'Active' && order.completed === false);
                    })
                    .map((order) => {
                      return (
                        <div className="relative w-2/12">
                          <div className="m-1 p-1 bg-gray-200 border-solid border-2 border-gray-700 rounded">
                            <div className="w-12/12 h-8 bg-red-500 text-center text-lg">Order# <span className="font-bold"> {order.id}</span></div>
                            { order.items.map((item) => <p className="border-b-2 border-solid border-gray-300 my-1">
                                                          <span>{item.name} </span><span> {'$' + String(item.price)}</span>
                                                          {item.modification && <p>-{item.modification}</p>}
                                                        </p>) }
                            <p>Total: <span> ${order.items.reduce((acc, item) => acc + parseFloat(item.price) , 0).toFixed(2)}</span></p>
                            { order.completed === false ?
                              <div onClick={ () => {setCompleted(order.id)} } 
                              className="mx-auto text-center text-white text-md bg-green-500 border-solid border-2 border-green-700 rounded hover:text-gray-300">
                                Complete
                              </div>
                            :
                              <div className="mx-auto text-center text-black text-md">Completed</div>
                            }
                          </div>
                        </div>
                      )
                    })}
      </div>
    </>
  )
}

export default Kitchen;