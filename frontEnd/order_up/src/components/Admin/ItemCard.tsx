interface MenuItemCardProps {name: String, price: Number, click: Function, imageUrl: string};

const EditMenuItemCard = ({name, price, click, imageUrl}: MenuItemCardProps) => {
    const itemData = {id: 6, name: name, price: price, description: '', category: ''};

    const truncateString = (name: String) => {
        if (name.length > 25) {
          return `${name.slice(0,20)}...`
        } else return name
      }

    return (
        <div onClick={() => click(itemData)} className="w-64 h-70 m-2 bg-gray-100 pb-1 rounded-2xl drop-shadow-xl cursor-pointer">
            <div className='p-2 '>
                <div className="w-54 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl overflow-clip"><img src={imageUrl} alt="food"/></div>
                <span className='text-lg font-bold '>{truncateString(name)}</span>
                <p className='py-4'> ${String(price)}</p>
            </div>
        </div>
    )
}

export default EditMenuItemCard;
