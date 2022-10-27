import { useState } from 'react';
import EditMenuItemCard from './EditMenuItemCard';
import CategoryChanges from './CategoryChanges';
import ItemChanges from './ItemChanges';

interface MenuProps {};

const Menu = ({}: MenuProps) => {
  const [showModal, setShowModal] = useState<string>('');

  const closeModal = (): void => {
    setShowModal('');
  }
 
  return (
    <div className="relative inline-block w-screen">
      <p className="text-3xl">Menu Changes:</p>
      <div className="m-4 w-12/12">
{/* menu category changes*/}
        <CategoryChanges showModal={showModal} setShowModal={setShowModal} closeModal={closeModal}/>

{/* menu item changes*/}
        <ItemChanges showModal={showModal} setShowModal={setShowModal} closeModal={closeModal}/>

{/* user changes*/}
        <p className="text-3xl">User Changes:</p>
        <div className="m-4">
          <p className="text-2xl text-center border-solid border-2 border-gray-700 rounded w-32">New User</p>
          <p className="text-2xl text-center border-solid border-2 border-gray-700 rounded w-32">Edit User</p>
        </div>
      </div>
    </div>
  )
}

export default Menu;