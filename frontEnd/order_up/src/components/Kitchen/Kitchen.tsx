import { useState, useEffect } from 'react';
import { cartOrder } from "../interfaces";
import { listOrders } from '../../utils/api'
import Loading from '../loading'
import KitchenCards from './kitchenCards'
import { setConstantValue } from 'typescript';

interface KitchenProps { activeOrders: cartOrder[], setActiveOrders: Function }

const Kitchen = ({ activeOrders, setActiveOrders }:KitchenProps) => {
  const [filterTab, setFilterTab] = useState('Active');
  const [apiOrders, setApiOrders] = useState<any>([]);
  const [loadingState, setLoadingState] = useState(true)

  const activeFocus = filterTab === 'Active' ? "bg-blue-900" : "bg-blue-500";
  const completedFocus = filterTab === 'Completed' ? "bg-blue-900" : "bg-blue-500"

  useEffect(() => {
    let currentOrders;
    async function fetchOrders() {
      currentOrders = await listOrders();
      console.log(currentOrders)
      setApiOrders(currentOrders);
      setLoadingState(false)
    }
    fetchOrders();
  },[])

  //console.log(activeOrders);
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
      <h3 className="text-5xl text-center my-6">Orders</h3>
      <div className="flex justify-center">
        <div onClick={() => {setFilterTab('Active')}}
            className={"m-2 text-white text-2xl align-middle px-8 pb-1 cursor-pointer rounded-full " + activeFocus}>
            Active
        </div>
        <div className='text-5xl'>|</div>
        <div onClick={() => {setFilterTab('Completed')}}
            className={"m-2 text-white text-2xl align-middle px-4 pb-1 cursor-pointer rounded-full " + completedFocus}>
            Completed
        </div>
      </div>
      <div className="flex justify-center mt-6">
        {loadingState ? <Loading /> : <KitchenCards apiOrders={apiOrders} filterTab={filterTab} setCompleted={setCompleted} /> }
      </div>
    </>
  )
}

export default Kitchen;
