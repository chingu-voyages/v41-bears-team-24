interface MenuItemCardProps {name: String, price: Number, click: Function, imageUrl: string, menuItemId: number};

const EditMenuItemCard = ({name, price, click, imageUrl, menuItemId}: MenuItemCardProps) => {
    //const itemData = {menuItemId: menuItemId, name: name, price: price, description: '', category: ''};

    const truncateString = (name: String) => {
        if (name.length > 25) {
          return `${name.slice(0,20)}...`
        } else return name
      }

    return (
        <div className="w-64 h-70 m-2 bg-gray-100 pb-1 rounded-2xl drop-shadow-xl">
            <div className='p-2 '>
                <div className="w-54 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl overflow-clip"><img src={imageUrl} alt="food"/></div>
                <span className='text-lg font-bold '>{truncateString(name)}</span>
                <p className='py-4'> ${String(price)}</p>
                <span onClick={() =>{click(menuItemId, name)}}
                    className="absolute bottom-2 right-2 px-3 py-2 text-center text-gray-100 bg-red-500  cursor-pointer hover:bg-red-700 rounded-2xl hover:from-yellow-500 hover:to-orange-600">
                    Delete Item
                </span>
            </div>
        </div>
    )
}

export default EditMenuItemCard;
