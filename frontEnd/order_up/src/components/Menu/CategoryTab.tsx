interface CategoryTabProps {category: String,
                        click: Function,
                        value: number,
                        activeTab: number};
const liStyle = "m-2 text-white bg-blue-500 px-6 pb-1 border-solid border-2 border-indigo-700 rounded"
const CategoryTab = ({category, click, value, activeTab}: CategoryTabProps) => {
    const bgColor = value === activeTab ? " bg-blue-900" : " bg-blue-500 hover:text-gray-300"
    return (
        <li onClick={ () => {click(value)} } className={liStyle + bgColor}>{category}</li>
    )
}

export default CategoryTab;