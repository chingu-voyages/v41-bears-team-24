import { useState } from 'react';
import EditMenuItemCard from './EditMenuItemCard';

const menuItems = [{name: 'Deep Fried Pickles', price: 6.00, category: 0, description: ''},
                    {name: 'Burger', price: 10.00, category: 1, description: ''},
                    {name: 'Pad Thai', price: 12.00, category: 1, description: ''},
                    {name: 'Lamb Schwarma', price: 12.00, category: 1, description: ''},
                    {name: 'Salad', price: 6.00, category: 2, description: ''},
                    {name: 'Soda', price: 3.00, category: 3, description: ''},
                    {name: 'Beer', price: 4.00, category: 3, description: ''},
                    {name: 'Key Lime Pie', price: 7.00, category: 4, description: ''}];
const categories = ['Appetizers', 'Entrees', 'Sides', 'Beverages', 'Desserts'];


interface ItemChangesProps {showModal: string, setShowModal: Function, closeModal: Function};
interface ItemFormData {id: number, name: string, price: number, description: string, category: string};

const ItemChanges = ({showModal, setShowModal, closeModal}: ItemChangesProps) => {
  const emptyForm = {id: -1, name: '', price: 0, description: '', category: ''};
  const [itemFormData, setItemFormData] = useState(emptyForm);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const menuItemClick = (data: ItemFormData): void => {
    setItemFormData({...data});
		setShowModal('menu-item');
	}

  const strIncludes = (srcString: string, testString: string) => {
    const lowCaseSrc = srcString.toLowerCase();
    return lowCaseSrc.includes(testString.toLowerCase())
  }

  return (
    <>
      <p className="text-2xl">Edit a menu item:</p>
      {showModal === "menu-item" ?
        <form className="z-10 mx-auto w-6/12 p-2 bg-gray-200">
          <fieldset>
            <legend>Item:</legend>
            <div className="w-2/12 m-2 inline-block text-right">Name</div>
            <input className="w-8/12" id="name" type="text" value={itemFormData.name}/><br/>
            <div className="w-2/12 m-2 inline-block text-right">Price</div>
            <input className="w-8/12" id="price" type="text" value={itemFormData.price}/><br/>
            <div className="w-2/12 m-2 inline-block text-right">Ingredients</div>
            <input className="inline-block w-8/12" id="price" type="text" /><br/>
            <div className="w-2/12 m-2 inline-block text-right">Description</div>
            <input className="inline-block w-8/12" id="description" type="text"/><br/>
            <select className="w-3/12 m-2 inline-block text-right" id="category">
              {categories.map((category, index) => <option key={category + index} value={category}>{category}</option>)}
            </select>
            <div  className="w-3/12 mx-4 inline-block text-right">Image: </div>
            <input className="w-5/12" id="imgLoad" type="file" accept="image/png, image/jpeg"/><br/>
            <div className="flex justify-around">
              <span onClick={() => closeModal()} className="px-6 ml-2 w-4/12 bg-green-400 text-white text-center border-solid border-2 border-green-700 rounded hover:text-gray-300">
                Confirm
              </span>
              <span onClick={() => closeModal()} className="px-6 ml-2 w-4/12 bg-red-400 text-white text-center border-solid border-2 border-red-700 rounded hover:text-gray-300">
                Cancel
              </span>
            </div>
          </fieldset>
        </form>
      :
      <>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
              className="m-2 w-96 text-gray-600 border-solid border-2 border-gray-700 rounded"/>
        <div className="flex flex-wrap">
          {menuItems.filter((item) => strIncludes(item.name, searchQuery))
                    .filter((item, index) => index < 5)
            .map((item, index) => {
              return <EditMenuItemCard key={item.name + index} name={item.name} price={item.price} click={menuItemClick}/>
            })}
          <div className="relative w-56 h-48 m-2 bg-gray-100 pb-1 border-solid border-2 border-gray-700 rounded-3xl hover:border-gray-400">
            <div className="w-52 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl">
              <div onClick={() => menuItemClick(emptyForm)} className="p-8 text-center text-white text-bold text-4xl">Add New</div>
            </div>
          </div>
        </div>
      </>
        }
    </>
  )
}

export default ItemChanges;