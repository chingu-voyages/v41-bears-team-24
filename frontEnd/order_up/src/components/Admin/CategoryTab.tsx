interface CategoryTabProps {category: String,
                        click: Function,
                        id: number};

const liStyle = "m-2 text-white px-6 pb-1 border-solid border-2 border-indigo-700 rounded "
const CategoryTab = ({category, click, id}: CategoryTabProps) => {
    const bgColor = category === 'Add New' ? " text-gray-900 bg-gray-200 border-gray-700 hover:text-gray-400" : " bg-blue-500 hover:text-gray-300"
    return (
        <li onClick={ () => {click(category, id)} } className={liStyle + bgColor}>{category}</li>
    )
}

export default CategoryTab;