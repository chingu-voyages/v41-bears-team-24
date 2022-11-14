import { useState } from 'react';
import { ImCross } from 'react-icons/im'

interface CartItemProps {quantity: number, setItemDetails: Function, modification: string, deleteItem: Function, id: number, name: string, price: string};

const CartItem = ({setItemDetails, deleteItem, id, name, price, modification, quantity}: CartItemProps) => {
	const [modificationInput, setModificationInput] = useState(modification);
  const [showInput, setShowInput] = useState(!!modification);
  const [quantityInput, setQuantityInput] = useState<string>(String(quantity));


	const modificationInputChange = (e: any) => {
		setModificationInput(e.target.value);
	}

  const quantityInputChange = (e: any) => {
		setQuantityInput(e.target.value.replace(/[^0-9]/g, ''))
	}

  const saveChanges = () => {
    setItemDetails(id, modificationInput, quantityInput);
  }

  const checkEnter = (e: any) => {
    if (e.key === 'Enter') e.target.blur();
  }

  const truncateString = (name: String) => {
    if (name.length > 25) {
      return `${name.slice(0,20)}...`
    } else return name
  }

	return (
    <div className="border-b-2 border-solid border-grey-200 my-1">
      <div className="inline-block cursor-pointer text-red-500" onClick={() => deleteItem(id)}><ImCross/></div>
      <span className="inline-block bg-orange-300 px-2 rounded-lg ml-4 cursor-pointer" onClick={() => setShowInput(!showInput)}>Edit</span>
      <div>
        <input type="text" maxLength={2} size={1}  value={quantityInput}
               className="w-7 mr-1 p-1 bg-blue-100 inline-block rounded-md"
               onKeyPress={checkEnter}
               onBlur={saveChanges}
               onChange={quantityInputChange}/>
        <p className="my-2 inline-block mr-3">{truncateString(name)}</p>
        <p className="inline-block">${price}</p>
      </div>
  
      { (showInput || modificationInput) && <input className="my-1 px-1 rounded-lg bg-blue-100" type="text" value={modificationInput}
                                            onChange={modificationInputChange}
                                            onBlur={saveChanges}
                                            onKeyPress={checkEnter}/>}
    </div>
  )
}

export default CartItem;