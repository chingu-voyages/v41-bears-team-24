interface ItemFormProps {menuCategories: any[], itemFormData: any, closeModal: Function};

const ItemForm = ({menuCategories, itemFormData, closeModal}: ItemFormProps) => {
    return (
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
          {menuCategories.map((cat, index) => <option key={cat.name + index} value={cat.name}>{cat.name}</option>)}
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
  )
}

export default ItemForm;