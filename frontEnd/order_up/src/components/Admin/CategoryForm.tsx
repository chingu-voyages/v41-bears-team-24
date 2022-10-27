import { useState, useEffect } from 'react';
interface CategoryFormProps {data: {categoryName: string, id: number}, closeModal: Function};

const CategoryForm = ({ data , closeModal }: CategoryFormProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [header, setHeader] = useState('');

  useEffect(() => {
    const catName = (data.categoryName === 'Add New') ? '' : data.categoryName
    const headerText = catName ? 'Edit Category:' : "New Category:";
    setCategoryName(catName);
    setHeader(headerText);
  }, [data.categoryName]);

  const inputHandler = (e: any) => {
    setCategoryName(e.target.value);
  }
  return (
    <>
      <form className="flex justify-around z-10 mx-auto my-1 w-1/3 p-2 bg-gray-200">
        <fieldset>
        <legend>{header}</legend>
        <input type="text" value={categoryName} onChange={inputHandler}/>
        <span onClick={() => closeModal()} className="px-6 ml-2 bg-green-400 text-white border-solid border-2 border-green-700 rounded hover:text-gray-300">
          Confirm
        </span>
        <span onClick={() => closeModal()} className="px-6 ml-2 bg-red-400 text-white border-solid border-2 border-red-700 rounded hover:text-gray-300">
          Cancel
        </span>
        </fieldset>
      </form>
    </>
  )
}

export default CategoryForm;