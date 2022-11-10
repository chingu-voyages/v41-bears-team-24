import { useState } from 'react';
import CategoryTab from './CategoryTab';
import MenuItemCard from './MenuItemCard';
import Loading from '../loading'

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
    <div className="inline-block h-full w-full">
      <div className='flex justify-center'>
        {!menuCategories.length && !menuItems.length ? <Loading /> 
        : <div className='mt-6'>
            <div className='flex justify-center'>
              {/* search bar */}
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
                    className="m-2 w-96 px-3 py-3 text-black placeholder-black bg-slate-50 rounded-full shadow-lg shadow-gray-400 border-transparent focus:border-transparent focus:ring-0"/>
            </div>

              {/* menu categories */}
            <div className='flex justify-center mt-6'>
              <ul className="flex flex-wrap">
                <CategoryTab category={"All"} click={navTabClick} activeTab={activeTab} value={-1}/>
                {menuCategories.map((cat, index) => {
                  return <CategoryTab key={cat.name + index} category={cat.name} click={navTabClick} activeTab={activeTab} value={cat.id}/>
                })}
              </ul>
            {/* menu cards */}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {menuItems.filter((item) => { return (item.categoryId === activeTab || activeTab === -1) && strIncludes(item.name, searchQuery)})
                .map((item, index) => {
                  return <MenuItemCard  key={item.name + index}
                                        name={item.name}
                                        price={item.price} 
                                        description={item.description}
                                        ingredients={item.ingredients}
                                        imgUrl={item.imageUrl}
                                        menuItemId={item.id}
                                        click={addItemToOrder}/>
                })}
            </div>
          </div>
        }


{/*
    <div className="inline-block h-full w-12/12">
      <h3 className="text-xl">Menu</h3>
      <div>
		    <ul className="flex flex-wrap">
          <CategoryTab category={"All"} click={navTabClick} activeTab={activeTab} value={-1}/>
          {menuCategories.map((cat, index) => {
            return <CategoryTab key={cat.name + index} category={cat.name} click={navTabClick} activeTab={activeTab} value={cat.id}/>
          })}
        </ul>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
              className="m-2 w-96 text-gray-600 border-solid border-2 border-gray-700 rounded"/>
        <div className="flex flex-wrap">
          {menuItems.filter((item) => { return (item.categoryId === activeTab || activeTab === -1) && strIncludes(item.name, searchQuery)})
            .map((item, index) => {
              return <MenuItemCard  key={item.name + index}
                                    name={item.name}
                                    price={item.price} 
                                    description={item.description}
                                    ingredients={item.ingredients}
                                    imgUrl={item.imageUrl}
                                    menuItemId={item.id}
                                    click={addItemToOrder}/>
            })}
        </div>
*/}
      </div>
    </div>
  )
}

export default Menu;