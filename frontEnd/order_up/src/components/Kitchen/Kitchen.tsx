import { order } from "../interfaces"

interface KitchenProps { activeOrders: order[] }

const Kitchen = ({ activeOrders }:KitchenProps) => {
  return (
    <>
      <h3>Kitchen</h3>
      <div className="flex flex-wrap flex-right">
      {activeOrders.map((order) => {
        return (
          <div className="w-2/12 m-1">
            <div className="border-solid border-2 border-indigo-700 rounded">
              <p>Order#{order.id}</p>
              { order.items.map((item) => <p><span>{item.name} </span><span> {'$' + String(item.price)}</span></p>) }
              <p>Total: <span> ${order.items.reduce((acc, item) => acc + item.price , 0)}</span></p>
              </div>
          </div>
        )
      })}
      </div>
    </>
  )
}

export default Kitchen;