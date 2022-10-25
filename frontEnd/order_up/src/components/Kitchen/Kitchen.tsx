import { order } from "../interfaces"

interface KitchenProps { activeOrders: order[] }

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
              { order.items.map((item) => <p><span>{item.name} </span><span> {'$' + String(item.price)}</span></p>) }
              <p>Total: <span> ${order.items.reduce((acc, item) => acc + item.price , 0)}</span></p>
              <span className="text-white text-xl px-1 bg-yellow-500 border-solid border-2 border-yellow-700 rounded">Edit</span>
            </div>
          </div>
        )
      })}
      </div>
    </>
  )
}

export default Kitchen;