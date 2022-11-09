import { useEffect, useState } from 'react'

interface ItemFormProps {
  menuCategories: any[], 
  // itemFormData: any, 
  closeModal: Function
};

const ItemForm = ({menuCategories, closeModal}: ItemFormProps) => {
  const [itemFormData, setItemFormData] = useState({
    name: '',
    price: '',
    ingredients: '',
    description: '',
    calorieCount: '',
    category: '',
    image: ''
  })
  const [s3Url, setS3Url] = useState('')

// FIX TS ERROR, image state is null so it can never have property type on it.
  useEffect(() => {
      fetch('https://v41-bears-team-24-production.up.railway.app/api/s3url', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        // @ts-ignore
        body: JSON.stringify({ fileType: itemFormData.image!.type })
      })
      .then(r => r.json())
      .then(data => {
        setS3Url(data.data)
      })
  }, [itemFormData.image])


  const updateForm = (e: any) => {
    if (e.target.name === 'image') {
      setItemFormData({...itemFormData, image: e.target.files[0]})
    } else {
      setItemFormData({...itemFormData, [e.target.name]: e.target.value})
    }
  }


  const handleSubmit = async () => {

    // FIX TS ERROR
    await fetch(s3Url, {
      method: 'PUT',
      headers: {
        // @ts-ignore
        "Content-Type": itemFormData.image!.type
      },
      body: itemFormData.image
    })

    const imageUrl = s3Url.split('?')[0]

    try {
      const newItem = await fetch('https://v41-bears-team-24-production.up.railway.app/api/menuitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: itemFormData.name,
          // Change parsing. '3.50' becomes 3.5
          price: parseFloat(itemFormData.price),
          ingredients: itemFormData.ingredients,
          description: itemFormData.description,
          calorieCount: parseFloat(itemFormData.calorieCount),
          image: imageUrl,
          category: itemFormData.category
        })
      })

      const response = await newItem.json()

    } catch (error) {
      console.error(error)
    }

    closeModal()
  }




    // Change divs to label element
return (
      <form className="z-10 mx-auto w-6/12 p-4 bg-gray-200 rounded-lg">
      <fieldset>
        <label className="w-2/12 m-2 inline-block text-right">Name:</label>
        <input className="w-8/12 rounded-lg px-2" id="name" type="text" name='name' value={itemFormData.name} onChange={updateForm}/><br/>

        <label className="w-2/12 m-2 inline-block text-right">Price:</label>
        <input className="w-8/12 rounded-lg px-2" id="price" type="text" min={0} name='price' value={itemFormData.price} onChange={updateForm}/><br/>

        <label className="w-2/12 m-2 inline-block text-right">Ingredients:</label>
        <input className="inline-block w-8/12 rounded-lg px-2" id='ingredients' type="text" name='ingredients' value={itemFormData.ingredients} onChange={updateForm}/><br/>

        <label className="w-2/12 m-2 inline-block text-right">Description:</label>
        <input className="inline-block w-8/12 rounded-lg px-2" id="description" type="text" name='description' value={itemFormData.description} onChange={updateForm}/><br/>

        <label className="w-2/12 m-2 inline-block text-right">Calories: </label>
        <input className='w-8/12 rounded-lg px-2' type='text' name='calorieCount' value={itemFormData.calorieCount} onChange={updateForm}></input>

        <div className='flex justify-around'>
          {/* <div > */}
            <div className=''>
              <label className='mr-2'>Category:</label>
              <select className='rounded-lg'  id="category" name='category' value={itemFormData.category} onChange={updateForm}>
              {/* // value = cat.name onChange={updateForm} */}
              {menuCategories.map((cat, index) => <option key={cat.name + index} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>

            <div>
              <label  className="">Image: </label>
              <input className="" id="imgLoad" type="file" accept="image/png, image/jpeg" name='image' onChange={updateForm}/><br/>
            </div>
          {/* </div> */}
        </div>
        
        <div className="flex justify-around mt-2">
          <span onClick={() => handleSubmit()} className="px-6 py-1 ml-2 w-4/12 bg-green-400 text-white text-center rounded cursor-pointer hover:bg-green-600">
            Confirm
          </span>
          <span onClick={() => closeModal()} className="px-6 py-1 ml-2 w-4/12 bg-red-400 text-white text-center rounded cursor-pointer hover:bg-red-600">
            Cancel
          </span>
        </div>
      </fieldset>
    </form>
  )
}

export default ItemForm;