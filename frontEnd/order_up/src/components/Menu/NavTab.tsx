interface NavTabProps {category: String,
                        click: Function,
                        value: Number};
const liStyle = "m-2 text-white bg-blue-500 px-6 pb-1 border-solid border-2 border-indigo-700 rounded hover:text-gray-300"
const NavTab = ({category, click, value}: NavTabProps) => {
    return (
        <li onClick={ () => {click(value)} } className={liStyle}>{category}</li>
    )
}

export default NavTab;