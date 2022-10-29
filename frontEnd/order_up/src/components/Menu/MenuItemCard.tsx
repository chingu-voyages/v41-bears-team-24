import { useState } from 'react';
interface MenuItemCardProps {name: String, price: Number, imgUrl: string, click: Function, description: string, ingredients: string};

// const formatPrice = (price: Number): String => {
//     let priceString = '';
//     return priceString;
// }
const MenuItemCard = ({name, price, click, description, ingredients, imgUrl}: MenuItemCardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const textSize = (name: String) => {
    if (name.length > 30) return "text-md font-bold";
    else return "text-xl font-bold";
  }
  return (
    <div className="relative w-56 h-64 m-2 bg-gray-100 pb-1 border-solid border-2 border-gray-700 rounded-3xl">
      {showModal && <div  onClick={() => setShowModal(false)}
        className="z-20 absolute inset-x-2 top-2 p-1 bg-gray-200 border-solid border-2 border-gray-700 rounded-xl">
        <p className="text-sm">click to close</p>
        <p className="text-xl font-bold">{name}</p>
        <p>{description}</p>
        <p className="text-xl font-bold">Ingredients:</p>
        <p>{ingredients}</p>
      </div> }
      <div className="w-52 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl overflow-hidden"><img src={imgUrl} alt="food"/></div>
      <span className={textSize(name)}>{name}</span>
      <span> ${String(price)}</span>
      <span onClick={() => setShowModal(true)}
        className="absolute bottom-0 left-0 m-1 px-1 py-2 text-gray text-md bg-gray-100 border-solid border-2 border-gray-800 rounded-2xl hover:text-gray-300">
        Description
      </span>
      <span onClick={() => click(name, price)}
        className="absolute bottom-0 right-0 m-1 px-1 py-2 text-white text-md bg-blue-900 border-solid border-2 border-green-800 rounded-2xl hover:text-gray-300">
        Add to Order
      </span>
    </div>

  )
}

export default MenuItemCard;