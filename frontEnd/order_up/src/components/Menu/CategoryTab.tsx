interface CategoryTabProps {category: String,
                        click: Function,
                        value: number,
                        activeTab: number};

const liStyle = "m-2 text-white bg-blue-500 px-5 py-1 rounded-full transition duration-500 hover:scale-125 cursor-pointer"

const CategoryTab = ({category, click, value, activeTab}: CategoryTabProps) => {
    const bgColor = value === activeTab ? " bg-blue-900" : " bg-blue-500 "
    return (
        <li onClick={ () => {click(value)} } className={liStyle + bgColor}>{category}</li>
    )
}

export default CategoryTab;