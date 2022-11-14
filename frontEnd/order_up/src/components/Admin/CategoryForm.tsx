import { useState, useEffect } from 'react';
import { editMenuCategory } from '../../utils/api';
interface CategoryFormProps {data: {categoryName: string, id: number}, closeModal: Function, menuCategories: any[], setMenuCategories: Function};

const CategoryForm = ({ data , closeModal, setMenuCategories, menuCategories }: CategoryFormProps) => {
  const [categoryName, setCategoryName] = useState('');
  //const [header, setHeader] = useState('');

  useEffect(() => {
    const catName = (data.categoryName === 'Add New') ? '' : data.categoryName
    //const headerText = catName ? "Edit" : "New";
    setCategoryName(catName);
    //setHeader(headerText);
  }, [data.categoryName]);

  const inputHandler = (e: any) => {
    setCategoryName(e.target.value);
  }

  const sendEdit = async () => {
    try {
      let res = await editMenuCategory(data.id, categoryName);

      //update locally
      const newCategories = menuCategories.map((cat: {id: number, name: string}) => {
        return cat.id !== data.id ? cat : {id: data.id, name: categoryName};
      })
      console.log(newCategories)
      setMenuCategories(newCategories);

      console.log(res);
      closeModal();
    }
    catch (error){
      console.log(error);
    }
  }

  return (
    <>
      <form className="flex justify-around z-10 mx-auto my-1 w-full px-2 py-4 bg-gray-200 rounded-lg">
        <fieldset>
        <legend className='text-center mb-4'>Edit Category Name:</legend>
        <input className='rounded-lg px-2' type="text" value={categoryName} onChange={inputHandler}/>
        <span onClick={sendEdit} className="px-6 py-1 ml-2 bg-green-400 text-white rounded cursor-pointer hover:bg-green-600">
          Confirm
        </span>
        <span onClick={() => closeModal()} className="px-6 py-1 ml-2 bg-red-400 text-white rounded cursor-pointer hover:bg-red-600">
          Cancel
        </span>
        </fieldset>
      </form>
    </>
  )
}

export default CategoryForm;