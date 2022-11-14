import React from 'react'

interface IkitchenCards {
  filterTab: string,
  apiOrders: any
  setCompleted: any
}

const kitchenCards = ({ filterTab, apiOrders, setCompleted }:IkitchenCards) => {
  return (
          <div className='grid grid-cols-4 gap-3'>
            {apiOrders.filter((order: any) => { //activeOrders
                return (filterTab === 'Completed' && order.status === "COMPLETED") ||
                      (filterTab === 'Active' && order.status === "UPNEXT");
              })
              .map((order: any) => {
                return (
                  <div className="w-full">
                    <div className="m-1 p-2 bg-gray-200 rounded-lg drop-shadow-xl">
                      <div className="w-12/12 h-8 bg-orange-400 text-center text-lg rounded-lg">#{order.id} <span className="font-bold"> {order.customerName}</span></div>
                      { order.OrderItem.map((item:any) => <div className="border-b-2 border-solid border-gray-300 my-1">
                                                    <span className='font-semibold'>{item.quantity} {item.menuItem.name} </span>
                                                    {item.modifications && <p>-{item.modifications}</p>}
                                                  </div>) }
                      {/* <p className='font-bold'>Total: <span> ${order.OrderItem.reduce((acc: number, item: any) => acc + parseFloat(item.menuItem.price) , 0).toFixed(2)}</span></p> */}
                      { order.status === "UPNEXT" ?
                        <div onClick={ () => {setCompleted(order.id)} } 
                        className="mx-auto mt-1 text-center text-white text-md bg-green-500 rounded-lg py-1 cursor-pointer hover:bg-green-600">
                          Complete
                        </div>
                      :
                        // <div className="mx-auto text-center text-black text-md">Completed</div>
                        ""
                      }
                    </div>
                  </div>
                )
              })}
        </div>
  )
}

export default kitchenCards