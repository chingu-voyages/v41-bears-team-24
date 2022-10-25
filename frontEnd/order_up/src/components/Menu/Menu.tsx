import { useState, useEffect } from 'react';
import CategoryTab from './CategoryTab';
import MenuItemCard from './MenuItemCard';

const categories = ['Appetizers', 'Entrees', 'Sides', 'Beverages', 'Desserts'];
const menuItems = [{name: 'Deep Fried Pickles', price: 6.00, category: 0},
                    {name: 'Burger', price: 10.00, category: 1},
                    {name: 'Pad Thai', price: 12.00, category: 1},
                    {name: 'Lamb Schwarma', price: 12.00, category: 1},
                    {name: 'Salad', price: 6.00, category: 2},
                    {name: 'Soda', price: 3.00, category: 3},
                    {name: 'Beer', price: 4.00, category: 3},
                    {name: 'Key Lime Pie', price: 7.00, category: 4}];

interface MenuProps { addItemToOrder: Function};

const Menu = ({ addItemToOrder }: MenuProps) => {
  const [activeTab, setActiveTab] = useState<number>(-1);
  const [apiCategories, setApiCategories] = useState<any[]>([]);
  const [apiMenuItems, setApiMenuItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const navTabClick = (tab: number): void => {
		setActiveTab(tab);
	}

  const strIncludes = (srcString: string, testString: string) => {
    const lowCaseSrc = srcString.toLowerCase();
    return lowCaseSrc.includes(testString.toLowerCase())
  }

  const getMenuCategories = () => {
    fetch("https://v41-bears-team-24-production.up.railway.app/api/menucategory")
  .then((res) => res.json())
  .then((json) => setApiCategories(json.data))
  .catch((err) => console.log(err))
  }

  const getMenuItems = () => {
    fetch("https://v41-bears-team-24-production.up.railway.app/api/menuitem")
  .then((res) => res.json())
  .then((json) => setApiMenuItems(json.data))
  .catch((err) => console.log(err))

  }

  useEffect(() => {
    //getMenuCategories();
    //getMenuItems();
  },[])

  console.log(apiMenuItems);
  console.log(apiCategories);
  
 
  return (
    <div className="inline-block h-full w-12/12">
      <h3 className="text-xl">Menu</h3>
      <div>
{/* menu categories */}
		    <ul className="flex flex-wrap">
          <CategoryTab category={"All"} click={navTabClick} activeTab={activeTab} value={-1}/>
          {categories.map((name, idx) => { //(cat)  category={cat.name} value={cat.id}
            return <CategoryTab category={name} click={navTabClick} activeTab={activeTab} value={idx}/>
          })}
        </ul>
{/* search bar */}
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
              className="m-2 w-96 text-gray-600 border-solid border-2 border-gray-700 rounded"/>
{/* menu cards */}
        <div className="flex flex-wrap">
          {menuItems.filter((item) => { return (item.category === activeTab || activeTab === -1) && strIncludes(item.name, searchQuery)})
            .map((item) => {
              return <MenuItemCard name={item.name} price={item.price} click={addItemToOrder}/>
            })}
        </div>
      </div>
    </div>
  )
}

export default Menu;