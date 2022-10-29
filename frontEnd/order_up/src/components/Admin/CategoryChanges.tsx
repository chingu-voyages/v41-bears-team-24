import { useState } from 'react';
import CategoryForm from './CategoryForm';
import CategoryTab from './CategoryTab';

interface CategoryChangesProps {menuCategories : any[], setMenuCategories: Function, showModal: string, setShowModal: Function, closeModal: Function};

const categories = ['Appetizers', 'Entrees', 'Sides', 'Beverages', 'Desserts'];

const CategoryChanges = ({ showModal, setShowModal, closeModal, menuCategories, setMenuCategories}: CategoryChangesProps) => {
  const [categoryFormData, setCategoryFormData] = useState({id: -1, categoryName: ""});

  const categoryTabClick = (label: string, id: number): void => {
    setCategoryFormData({id: id, categoryName: label});
      setShowModal('category');
    }

    return (
      <>
        <p className="text-2xl">Edit a menu category:</p>
        {showModal === 'category'  ?
          <CategoryForm data={categoryFormData} closeModal={closeModal} />
        :
          <ul className="flex flex-wrap">
            {menuCategories.map((cat, index) => {
              return <CategoryTab key={cat.name + index} category={cat.name} click={categoryTabClick} id={cat.id}/>
            })}
            <CategoryTab category={"Add New"} click={categoryTabClick} id={-1}/>
          </ul>
        }
      </>
    )
}

export default CategoryChanges;