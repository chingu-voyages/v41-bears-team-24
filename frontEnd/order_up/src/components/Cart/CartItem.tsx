import { useState } from 'react';
import { ImCross } from 'react-icons/im'

interface CartItemProps {setModification: Function, modification: string, deleteItem: Function, id: number, name: string, price: string};

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

      <div className="inline-block cursor-pointer text-red-500" onClick={() => deleteItem(id)}><ImCross/></div>
      <span className="inline-block bg-orange-300 px-2 rounded-lg ml-4 cursor-pointer" onClick={() => setShowInput(!showInput)}>Edit</span>
      <div>
        <input type="text" maxLength={2} size={1} className="w-7 mr-1 p-1 bg-blue-100 inline-block rounded-md"/>
        <p className="my-2 inline-block">{name}</p>
        <p className="inline-block">${price}</p>

      </div>
  
      { (showInput || inputValue) && <input className="mb-1 border-2 border-solid border-grey-300 bg-blue-100" type="text" value={inputValue}
                                            onChange={(e: any) => setInputValue(e.target.value)}
                                            onBlur={setModifications}
                                            onKeyPress={enter}/>}
    </div>
  )
}

export default CartItem;