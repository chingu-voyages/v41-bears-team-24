import { useState } from 'react'

interface ItemFormProps {
  menuCategories: any[], 
  // itemFormData: any, 
  closeModal: Function
};

const ItemForm = ({menuCategories, closeModal}: ItemFormProps) => {
  const [itemFormData, setItemFormData] = useState({
    name: '',
    price: 0.0,
    ingredients: '',
    description: '',
    category: '',
    image: null
  })

  console.log('itemFormData: ', itemFormData)

  const updateForm = (e: any) => {
    if (e.target.name === 'image') {
      console.log('image:', e.target.files[0])
      console.log(typeof e.target.files[0])
      setItemFormData({...itemFormData, image: e.target.files[0]})
    } else {
      setItemFormData({...itemFormData, [e.target.name]: e.target.value})
    }
  }


  const handleSubmit = () => {
    // POST logic

    // CONVERT PRICE TO NUMBER SINCE IT GETS CONVERTED TO STRING FROM INPUT

    //Upload image to s3 bucket
    fetch('https://orderupbucket.s3.us-west-1.amazonaws.com/s3test?AWSAccessKeyId=AKIAYB6CVTHEVZJHL44Z&Content-Type=image%2Fjpeg&Expires=1667205986&Signature=3f7d7tW%2FjHFFPndLApI3ahccmxo%3D', {
      method: 'PUT',
      body: JSON.stringify(itemFormData.image)
    })
     .then((r) => r.json())
     .then(data => console.log('upload response: ', data))
     .catch(e => console.error(e)) 

    closeModal()
  }



    // Change divs to label element
return (
      <form className="z-10 mx-auto w-6/12 p-2 bg-gray-200">
      <fieldset>
        <legend>Item:</legend>
        <div className="w-2/12 m-2 inline-block text-right">Name</div>
        <input className="w-8/12" id="name" type="text" name='name' value={itemFormData.name} onChange={updateForm}/><br/>

        <div className="w-2/12 m-2 inline-block text-right">Price</div>
        <input className="w-8/12" id="price" type="number" min={0} name='price' value={itemFormData.price} onChange={updateForm}/><br/>

        <div className="w-2/12 m-2 inline-block text-right">Ingredients</div>
        <input className="inline-block w-8/12" id='ingredients' type="text" name='ingredients' value={itemFormData.ingredients} onChange={updateForm}/><br/>

        <div className="w-2/12 m-2 inline-block text-right">Description</div>
        <input className="inline-block w-8/12" id="description" type="text" name='description' value={itemFormData.description} onChange={updateForm}/><br/>

        <select className="w-3/12 m-2 inline-block text-right" id="category" name='category' value={itemFormData.category} onChange={updateForm}>
          {/* // value = cat.name onChange={updateForm} */}
          {menuCategories.map((cat, index) => <option key={cat.name + index} value={cat.name}>{cat.name}</option>)}
        </select>

        <div  className="w-3/12 mx-4 inline-block text-right">Image: </div>
        <input className="w-5/12" id="imgLoad" type="file" accept="image/png, image/jpeg" name='image' onChange={updateForm}/><br/>

        <div className="flex justify-around">
          <span onClick={() => handleSubmit()} className="px-6 ml-2 w-4/12 bg-green-400 text-white text-center border-solid border-2 border-green-700 rounded hover:text-gray-300">
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

