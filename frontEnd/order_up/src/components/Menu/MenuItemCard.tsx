interface MenuItemCardProps {name: String, price: Number, click: Function};

const formatPrice = (price: Number): String => {
    let priceString = '';
    return priceString;
}
const MenuItemCard = ({name, price, click}: MenuItemCardProps) => {
    return (
        <div className="relative w-56 h-64 m-2 bg-gray-100 pb-1 border-solid border-2 border-gray-700 rounded-3xl">
            <div className="w-52 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl"></div>
            <span className="text-xl font-bold">{name} </span>
            <span> ${String(price)}</span>
            <span className="absolute bottom-0 left-0 m-1 px-1 py-2 text-gray text-md bg-gray-100 border-solid border-2 border-gray-800 rounded-2xl hover:text-gray-300">
                Description
            </span>
            <span onClick={() => click(name, price)}
                className="absolute bottom-0 right-0 m-1 px-1 py-2 text-white text-md bg-blue-900 border-solid border-2 border-green-800 rounded-2xl hover:text-gray-300">
                Add to Order
            </span>
        </div>
    )
}

export default MenuItemCard;