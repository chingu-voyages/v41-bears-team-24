import { useState } from 'react';
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
  
  const navTabClick = (tab: number): void => {
		setActiveTab(tab);
	}
 
  return (
    <div className="inline-block h-full w-12/12">
      <h3 className="text-xl">Menu</h3>
      <div>
		    <ul className="flex flex-wrap">
          <CategoryTab category={"All"} click={navTabClick} activeTab={activeTab} value={-1}/>
          {categories.map((name, index) => {
            return <CategoryTab category={name} click={navTabClick} activeTab={activeTab} value={index}/>
          })}
        </ul>
        <div className="flex flex-wrap">
          {menuItems.filter((item) => { return (item.category === activeTab) || (activeTab === -1) })
            .map((item) => {
              return <MenuItemCard name={item.name} price={item.price} click={addItemToOrder}/>
            })}
        </div>
      </div>
    </div>
  )
}

export default Menu;