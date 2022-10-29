import { useState } from 'react';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';

interface ItemChangesProps {menuItems: any[], setMenuItems: Function, menuCategories: any[], showModal: string, setShowModal: Function, closeModal: Function};
interface ItemFormData {id: number, name: string, price: number, description: string, category: string};

const ItemChanges = ({menuItems, setMenuItems, menuCategories, showModal, setShowModal, closeModal}: ItemChangesProps) => {
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
       <ItemForm menuCategories={menuCategories}
                 itemFormData={itemFormData}
                 closeModal={closeModal}/>
      :
      <>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
              className="m-2 w-96 text-gray-600 border-solid border-2 border-gray-700 rounded"/>
        <div className="flex flex-wrap">
          {menuItems.filter((item) => strIncludes(item.name, searchQuery))
                    .filter((item, index) => index < 5)
            .map((item, index) => {
              return <ItemCard key={item.name + index} name={item.name} price={item.price} click={menuItemClick}/>
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