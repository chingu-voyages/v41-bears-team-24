import { cartOrder } from "../interfaces" //these cartOrders should probably be a different type...

interface KitchenProps { activeOrders: cartOrder[] } //...should be based on DB order schema

const Kitchen = ({ activeOrders }:KitchenProps) => {
  return (
    <>
      <h3 className="text-xl">Kitchen</h3>
      <div className="flex flex-wrap justify-right">
      {activeOrders.map((order) => {
        return (
          <div className="relative w-2/12">
            <div className="m-1 p-1 bg-gray-200 border-solid border-2 border-gray-700 rounded">
              <div className="w-12/12 h-8 bg-red-500 text-center text-lg">Order# <span className="font-bold"> {order.id}</span></div>
              { order.items.map((item) => <p className="border-b-2 border-solid border-gray-300 my-1">
                                            <span>{item.name} </span><span> {'$' + String(item.price)}</span>
                                            {item.modification && <p>-{item.modification}</p>}
                                          </p>) }
              <p>Total: <span> ${order.items.reduce((acc, item) => acc + parseFloat(item.price) , 0).toFixed(2)}</span></p>
              <div className="mx-auto text-center text-white text-md bg-green-500 border-solid border-2 border-green-700 rounded hover:text-gray-300">Complete</div>
            </div>
          </div>
        )
      })}
      </div>
    </>
  )
}

export default Kitchen;