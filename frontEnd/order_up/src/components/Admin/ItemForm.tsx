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
      console.log('image:', e.target.files[0])
      console.log(typeof e.target.files[0])
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
      <form className="z-10 mx-auto w-6/12 p-2 bg-gray-200">
      <fieldset>
        <legend>Item:</legend>
        <div className="w-2/12 m-2 inline-block text-right">Name</div>
        <input className="w-8/12" id="name" type="text" name='name' value={itemFormData.name} onChange={updateForm}/><br/>

        <div className="w-2/12 m-2 inline-block text-right">Price</div>
        <input className="w-8/12" id="price" type="text" min={0} name='price' value={itemFormData.price} onChange={updateForm}/><br/>

        <div className="w-2/12 m-2 inline-block text-right">Ingredients</div>
        <input className="inline-block w-8/12" id='ingredients' type="text" name='ingredients' value={itemFormData.ingredients} onChange={updateForm}/><br/>

        <div className="w-2/12 m-2 inline-block text-right">Description</div>
        <input className="inline-block w-8/12" id="description" type="text" name='description' value={itemFormData.description} onChange={updateForm}/><br/>

        <label>Calories: </label>
        <input className='w-8/12' type='text' name='calorieCount' value={itemFormData.calorieCount} onChange={updateForm}></input>

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