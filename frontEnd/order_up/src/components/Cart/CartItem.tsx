import { useState } from 'react';
interface CartItemProps {setModification: Function, modification: string, deleteItem: Function, id: number, name: string, price: string};

const CartItem = ({setModification, deleteItem, id, name, price, modification}: CartItemProps) => {
	const [inputValue, setInputValue] = useState(modification);
  const [showInput, setShowInput] = useState(!!modification);

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
      <span className="inline-block" onClick={() => deleteItem(id)}>Delete</span>
      <span className="inline-block ml-4" onClick={() => setShowInput(!showInput)}>Edit</span>
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