interface MenuItemCardProps {name: String, price: Number, click: Function};

const EditMenuItemCard = ({name, price, click}: MenuItemCardProps) => {
    return (
        <div onClick={() => click()} className="relative w-56 h-48 m-2 bg-gray-100 pb-1 border-solid border-2 border-gray-700 rounded-3xl hover:border-gray-400">
            <div className="w-52 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl"></div>
            <span className="text-xl font-bold pl-1">{name} </span>
            <span> ${String(price)}</span>
        </div>
    )
}

export default EditMenuItemCard;