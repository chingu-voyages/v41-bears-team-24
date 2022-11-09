import { useState } from 'react';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';

interface ItemChangesProps {menuItems: any[], setMenuItems: Function, menuCategories: any[], showModal: string, setShowModal: Function, closeModal: Function};
interface ItemFormData {name: string, price: number, description: string, category: string, image: string};

const ItemChanges = ({menuItems, setMenuItems, menuCategories, showModal, setShowModal, closeModal}: ItemChangesProps) => {
  const emptyForm = { name: '', price: 0, description: '', category: '', image: ''};
  // const [itemFormData, setItemFormData] = useState(emptyForm);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const menuItemClick = (data: ItemFormData): void => {
    // setItemFormData({...data});
		setShowModal('menu-item');
	}

  const strIncludes = (srcString: string, testString: string) => {
    const lowCaseSrc = srcString.toLowerCase();
    return lowCaseSrc.includes(testString.toLowerCase())
  }

  return (
    <div className=''>
      <p className="text-center text-3xl">Edit a menu item:</p>
      {showModal === "menu-item" ?
       <ItemForm menuCategories={menuCategories}
                //  itemFormData={itemFormData}
                 closeModal={closeModal}/>
      :
      <div className='flex justify-center mt-3'>
        <div>
          <div className='flex justify-center'>
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
                className="m-2 w-96 px-3 py-2 text-gray-600 rounded-full shadow-gray-400 shadow-xl "/>
          </div>

          <div className="flex flex-wrap mt-3">
            {menuItems.filter((item) => strIncludes(item.name, searchQuery))
                      .filter((item, index) => index < 4)
              .map((item, index) => {
                return <ItemCard key={item.name + index} name={item.name} price={item.price} click={menuItemClick} imageUrl={item.imageUrl}/>
              })}
            <div className="relative w-56 h-48 m-2 bg-gray-100 pb-1 rounded-3xl cursor-pointer " onClick={() => menuItemClick(emptyForm)}>
              <div className="w-52 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl">
                <div  className="p-8 text-center text-white text-bold text-4xl ">Add New</div>
              </div>
            </div>
          </div>
        </div>
      </div>
        }
    </div>
  )
}

export default ItemChanges;

