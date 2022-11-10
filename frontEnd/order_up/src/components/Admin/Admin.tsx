import { useState } from 'react';
import CategoryChanges from './CategoryChanges';
import ItemChanges from './ItemChanges';

interface AdminProps {menuCategories : any[], setMenuCategories: Function, menuItems: any[], setMenuItems: Function};

const Admin = ({menuCategories, setMenuCategories, menuItems, setMenuItems}: AdminProps) => {
    const [showModal, setShowModal] = useState<string>('');
  
    const closeModal = (): void => {
      setShowModal('');
    }
   
    return (
      <div className="relative inline-block w-screen">
        {/* <p className="text-3xl">Menu Changes:</p> */}
        <div className="m-4 mt-12 w-12/12">
  {/* menu category changes*/}
          <CategoryChanges menuCategories={menuCategories}
                           setMenuCategories={setMenuCategories}
                           showModal={showModal} 
                           setShowModal={setShowModal} 
                           closeModal={closeModal}/>
        <div className="w-9/12 mx-auto border-b-2 border-solid border-gray-300 my-8"></div>
  {/* menu item changes*/}
          <ItemChanges  menuItems={menuItems} 
                        setMenuItems={setMenuItems}
                        menuCategories={menuCategories}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        closeModal={closeModal}/>
        <div className="w-9/12 mx-auto border-b-2 border-solid border-gray-300 my-8"></div>
  {/* user changes*/}
          <p className="text-center text-3xl">User Changes:</p>
        </div>
      </div>
    )
  }


export default Admin;