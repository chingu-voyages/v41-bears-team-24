interface CategoryTabProps {category: String, click: Function, id: number};

const liStyle = "mr-2 mt-3 text-white px-4 py-1 rounded-full cursor-pointer"

const CategoryTab = ({category, click, id}: CategoryTabProps) => {
    const bgColor = category === 'Add New' ? " text-gray-900 bg-gray-200 border-gray-700 hover:bg-gray-400" : " bg-blue-500 hover:bg-blue-600"
    return (
        <li onClick={ () => {click(category, id)} } className={liStyle + bgColor}>{category}</li>
    )
}

export default CategoryTab;