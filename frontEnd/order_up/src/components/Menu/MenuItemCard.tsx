import { stringify } from 'querystring';
import { useState } from 'react';
interface MenuItemCardProps {name: String, price: Number, imgUrl: string, click: Function, description: string, ingredients: string, menuItemId: Number};

// const formatPrice = (price: Number): String => {
//     let priceString = '';
//     return priceString;
// }
const MenuItemCard = ({name, price, click, description, ingredients, imgUrl, menuItemId}: MenuItemCardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const truncateString = (name: String) => {
    if (name.length > 25) {
      return `${name.slice(0,23)}...`
    } else return name
  }
  // shadow-md shadow-blue-200
  return (
    <div className="w-64 h-70 m-2 bg-gray-100 pb-1 rounded-2xl drop-shadow-xl">
      {showModal && <div  onClick={() => setShowModal(false)}
        className="z-20 absolute inset-x-2 top-2 p-1 bg-gray-200 border-solid border-2 border-gray-700 rounded-xl">
        <p className="text-sm">click to close</p>
        <p className="text-xl font-bold ">{name}</p>
        <p>{description}</p>
        <p className="text-xl font-bold">Ingredients:</p>
        <p>{ingredients}</p>
      </div> }

      <div className='p-2 '>
        <div className="w-54 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl overflow-clip"><img src={imgUrl} alt="food"/></div>
        <span className='text-lg font-bold '>{truncateString(name)}</span>
        <p className='py-4'> ${String(price)}</p>

        <div className='flex justify-between w-full'>
          <span onClick={() => setShowModal(true)}
            className="px-3 py-2 text-black bg-cyan-400 rounded-2xl hover:bg-cyan-600 cursor-pointer">
            Description
          </span>
          <span onClick={() => click(name, price, menuItemId)}
            className="px-3 py-2 text-center text-gray-800 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl hover:from-yellow-500 hover:to-orange-600 cursor-pointer">
            Add to Order
          </span>
        </div>
      </div>
    </div>

  )
}

export default MenuItemCard;
