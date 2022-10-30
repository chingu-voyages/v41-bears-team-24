import { useState } from 'react';
import CategoryTab from './CategoryTab';
import MenuItemCard from './MenuItemCard';

interface MenuProps { addItemToOrder: Function, menuCategories: any[], menuItems: any[]};

const Menu = ({ addItemToOrder, menuCategories, menuItems}: MenuProps) => {
  const [activeTab, setActiveTab] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const navTabClick = (tab: number): void => {
		setActiveTab(tab);
	}

  const strIncludes = (srcString: string, testString: string) => {
    const lowCaseSrc = srcString.toLowerCase();
    return lowCaseSrc.includes(testString.toLowerCase())
  }
 
  return (
    <div className="inline-block h-full w-12/12">
      <h3 className="text-xl">Menu</h3>
      <div>
{/* menu categories */}
		    <ul className="flex flex-wrap">
          <CategoryTab category={"All"} click={navTabClick} activeTab={activeTab} value={-1}/>
          {menuCategories.map((cat, index) => {
            return <CategoryTab key={cat.name + index} category={cat.name} click={navTabClick} activeTab={activeTab} value={cat.id}/>
          })}
        </ul>
{/* search bar */}
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
              className="m-2 w-96 text-gray-600 border-solid border-2 border-gray-700 rounded"/>
{/* menu cards */}
        <div className="flex flex-wrap">
          {menuItems.filter((item) => { return (item.categoryId === activeTab || activeTab === -1) && strIncludes(item.name, searchQuery)})
            .map((item, index) => {
              return <MenuItemCard key={item.name + index} name={item.name}
                                    price={item.price} click={addItemToOrder}
                                    description={item.description} ingredients={item.ingredients}
                                    imgUrl={item.imageUrl}/>
            })}
        </div>
      </div>
    </div>
  )
}

export default Menu;