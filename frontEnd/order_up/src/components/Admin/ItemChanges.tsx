import { useState } from 'react';
import { deleteMenuItem } from '../../utils/api';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';

interface ItemChangesProps {menuItems: any[], setMenuItems: Function, menuCategories: any[], showModal: string, setShowModal: Function, closeModal: Function};
interface ItemFormData {name: string, price: number, description: string, category: string, image: string};

const ItemChanges = ({menuItems, setMenuItems, menuCategories, showModal, setShowModal, closeModal}: ItemChangesProps) => {
  const emptyForm = { name: '', price: 0, description: '', category: '', image: ''};
  const [deleteItem, setDeleteItem] = useState({id: -1, name: ''});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const menuItemAdd = (data: ItemFormData): void => {
		setShowModal('menu-item');
	}

  const setMenuItemDelete = (id: number, name: string) => {
    setDeleteItem({id: id, name: name});
    setShowModal('menu-item-delete');
  }

  const postItemDelete = async () => {
    try {
      const res = await deleteMenuItem(deleteItem.id);

      //update locally
      const newItems = menuItems.filter((item) => {
        return (item.id !== deleteItem.id);
      })
      console.log(newItems)
      setMenuItems(newItems);
      console.log(res);
      console.log("Deleted");
      //console.log(res);
    } catch (err) {
      console.log(err);
    }
    closeModal();
  }

  const strIncludes = (srcString: string, testString: string) => {
    const lowCaseSrc = srcString.toLowerCase();
    return lowCaseSrc.includes(testString.toLowerCase())
  }

  return (
    <div className=''>
      <p className="text-center text-3xl">Add or Delete a menu item:</p>
      {showModal === "menu-item" ?
       <ItemForm menuCategories={menuCategories}
                 closeModal={closeModal}/>
      : showModal === "menu-item-delete" ?
      <>
        <form className="flex justify-around z-10 mx-auto my-1 w-4/12 px-2 py-4 bg-gray-200 rounded-lg">
          <fieldset>
          <legend className='text-center mb-4'>Delete item#{deleteItem.id}: {deleteItem.name}?</legend>
          <span onClick={postItemDelete} className="px-6 py-1 ml-2 bg-green-400 text-white rounded cursor-pointer hover:bg-green-600">
            Confirm
          </span>
          <span onClick={() => closeModal()} className="px-6 py-1 ml-2 bg-red-400 text-white rounded cursor-pointer hover:bg-red-600">
            Cancel
          </span>
          </fieldset>
        </form>
      </>
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
                return <ItemCard key={item.name + index} name={item.name} price={item.price} menuItemId={item.id} click={setMenuItemDelete} imageUrl={item.imageUrl}/>
              })}
            <div className="relative w-64 h-70 m-2 bg-gray-100 pb-1 rounded-2xl drop-shadow-xl cursor-pointer " onClick={() => menuItemAdd(emptyForm)}>
              <div className="w-52 h-36 mt-2 mx-auto bg-blue-500 hover:bg-blue-600 rounded-2xl">
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

