import { stringify } from 'querystring';
import { useState } from 'react';
import MenuItemModal from './menuItemModal'
interface MenuItemCardProps {name: String, price: Number, imgUrl: string, click: Function, description: string, ingredients: string, menuItemId: Number};


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
      {showModal && <MenuItemModal setShowModal={setShowModal} showModal={showModal} itemName={name} ingredients={ingredients} description={description}/>}

      <div className='p-2 '>
        <div className="w-54 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl overflow-clip"><img src={imgUrl} alt="food"/></div>
        <span className='text-lg font-bold'>{truncateString(name)}</span>
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
