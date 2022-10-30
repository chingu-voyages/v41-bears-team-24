import { useState, useRef } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
interface CartItemProps {setModification: Function, modification: string, deleteItem: Function, id: number, name: string, price: string};

const CartItem = ({setModification, deleteItem, id, name, price, modification}: CartItemProps) => {
	const [inputValue, setInputValue] = useState(modification);
  const [showInput, setShowInput] = useState(!!modification);
  const inputRef = useRef<HTMLInputElement>(null);

	const inputChange = (e: any) => {
		setInputValue(e.target.value);
	}

  const saveChange = () => {
    setModification(id, inputValue);
  }

  const enter = (e: any) => {
    if (e.key === 'Enter') e.target.blur();
  }

	return (
    <div className="border-b-2 border-solid border-grey-200 my-1">
      <span className="inline-block" onClick={() => deleteItem(id)}><FaTrashAlt className="text-xl"/></span>
      <span className="inline-block" onClick={() => setShowInput(!showInput)}><FaEdit className="text-xl"/></span>
      <p className="font-bold">{name}</p>
      <p>${price}</p>
      { (showInput || inputValue) && <input className="bg-blue-100" type="text" value={inputValue}
                                            onChange={inputChange}
                                            onBlur={saveChange}
                                            onKeyPress={enter}/>}
    </div>
  )
}

export default CartItem;