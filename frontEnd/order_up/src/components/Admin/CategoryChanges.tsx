import { useState } from 'react';
import CategoryForms from './CategoryForm';
import CategoryTab from './CategoryTab';

interface CategoryChangesProps {showModal: string, setShowModal: Function, closeModal: Function};

const categories = ['Appetizers', 'Entrees', 'Sides', 'Beverages', 'Desserts'];

const CategoryChanges = ({ showModal, setShowModal, closeModal}: CategoryChangesProps) => {
  const [categoryFormData, setCategoryFormData] = useState({id: -1, categoryName: ""});

  const categoryTabClick = (label: string, id: number): void => {
    setCategoryFormData({id: id, categoryName: label});
      setShowModal('category');
    }

    return (
      <>
        <p className="text-2xl">Edit a menu category:</p>
        {showModal === 'category'  ?
          <CategoryForms data={categoryFormData} closeModal={closeModal} />
        :
          <ul className="flex flex-wrap">
            {categories.map((name, index) => {
              return <CategoryTab key={name + index} category={name} click={categoryTabClick} id={index}/>
            })}
            <CategoryTab category={"Add New"} click={categoryTabClick} id={-1}/>
          </ul>
        }
      </>
    )
}

export default CategoryChanges;