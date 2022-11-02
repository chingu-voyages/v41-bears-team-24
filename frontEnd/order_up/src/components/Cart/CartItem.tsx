import { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { cartOrder } from '../interfaces'

interface CartItemProps {order: cartOrder,setOrder: Function, modification: string, deleteItem: Function, id: number, name: string, price: string, quantity: number};

const CartItem = ({order, setOrder, deleteItem, id, name, price, modification, quantity}: CartItemProps) => {
	const [inputValue, setInputValue] = useState(modification);
  const [quantityInput, setQuantityInput] = useState<string>(String(quantity));
  const [showInput, setShowInput] = useState(!!modification);

  const enter = (e: any) => {
    if (e.key === 'Enter') e.target.blur();
  }

  const setModifications = () => {
    const newArray = order.items.map((item) => {
      if (item.id !== id) {
        return item;
      } else {
        console.log({...item, modification: inputValue, quantity: parseInt(quantityInput,10)});
        return {...item, modification: inputValue, quantity: parseInt(quantityInput,10)};
      }
    })
    console.log(newArray);
    setOrder({...order, items: newArray});
  }

	return (
    <div className="border-b-2 border-solid border-grey-200 my-1">
      <span className="inline-block" onClick={() => deleteItem(id)}><FaTrashAlt /></span>
      <span className="inline-block ml-4" onClick={() => setShowInput(!showInput)}><FaEdit /></span>
      <div>
        <input type="text" maxLength={2} size={1} value={quantityInput}
               className="w-6 border-2 border-solid border-grey-300 bg-blue-100 text-center inline-block"
               onKeyPress={enter}
               onBlur={setModifications}
               onChange={(e: any) => {setQuantityInput(e.target.value)}}
               />
        <p className="font-bold my-2 inline-block">{name}</p>
        <p className="font-bold inline-block">${price}</p>
      </div>
  
      { (showInput || inputValue) && <input className="mb-1 border-2 border-solid border-grey-300 bg-blue-100" type="text" value={inputValue}
                                            onChange={(e: any) => setInputValue(e.target.value)}
                                            onBlur={setModifications}
                                            onKeyPress={enter}/>}
    </div>
  )
}

export default CartItem;