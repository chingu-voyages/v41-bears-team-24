interface MenuItemCardProps {name: String, price: Number, click: Function};

const formatPrice = (price: Number): String => {
    let priceString = '';
    return priceString;
}
const MenuItemCard = ({name, price, click}: MenuItemCardProps) => {
    return (
        <div onClick={() => click(name, price)} className="w-48 h-48 m-2 bg-green-500 px-6 pb-1 border-solid border-2 border-indigo-700 rounded">
            <p>menu-item-card</p>
            <p>{name}</p>
            <p>${String(price)}</p>
        </div>
    )
}

export default MenuItemCard;