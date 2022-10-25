import { useState } from 'react';
import CategoryTab from './CategoryTab';
import SmMenuItemCard from './SmMenuItemCard';

const categories = ['Appetizers', 'Entrees', 'Sides', 'Beverages', 'Desserts'];
const menuItems = [{name: 'Deep Fried Pickles', price: 6.00, category: 0},
                    {name: 'Burger', price: 10.00, category: 1},
                    {name: 'Pad Thai', price: 12.00, category: 1},
                    {name: 'Lamb Schwarma', price: 12.00, category: 1},
                    {name: 'Salad', price: 6.00, category: 2},
                    {name: 'Soda', price: 3.00, category: 3},
                    {name: 'Beer', price: 4.00, category: 3},
                    {name: 'Key Lime Pie', price: 7.00, category: 4}];

interface MenuProps {};

const Menu = ({}: MenuProps) => {
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
      <p className="text-3xl">Menu Changes:</p>
      <div className="m-4">
{/* menu category changes*/}
        <p className="text-2xl">Edit a menu category:</p>
		    <ul className="flex flex-wrap">
          {categories.map((name, index) => {
            return <CategoryTab category={name} click={navTabClick} activeTab={activeTab} value={index}/>
          })}
          <CategoryTab category={"ADD NEW"} click={navTabClick} activeTab={activeTab} value={-1}/>
        </ul>
{/* menu item changes*/}
        <p className="text-2xl">Edit a menu item:</p>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
              className="m-2 w-96 text-gray-600 border-solid border-2 border-gray-700 rounded"/>
        <div className="flex flex-wrap">
          {menuItems.filter((item) => strIncludes(item.name, searchQuery))
                    .filter((item, index) => index < 5)
            .map((item) => {
              return <SmMenuItemCard name={item.name} price={item.price} click={() => {}}/>
            })}
          <div className="relative w-56 h-48 m-2 bg-gray-100 pb-1 border-solid border-2 border-gray-700 rounded-3xl">
            <div className="w-52 h-36 mt-2 mx-auto bg-gray-600 rounded-2xl">
              <div className="p-8 text-center text-white text-bold text-4xl">Add New</div>
            </div>
          </div>
        </div>
      </div>
{/* user changes*/}
      <p className="text-3xl">User Changes:</p>
        <div className="m-4">
          <p className="text-2xl text-center border-solid border-2 border-gray-700 rounded w-32">New User</p>
          <p className="text-2xl text-center border-solid border-2 border-gray-700 rounded w-32">Edit User</p>
        </div>
    </div>
  )
}

export default Menu;