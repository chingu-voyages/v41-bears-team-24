import React from 'react'
import ReactPortal from '../reactPortal'

interface ImenuItemModal {
    setShowModal: Function,
    showModal: boolean
    itemName: String,
    description: String,
    ingredients: String
}

const menuItemModal = ({setShowModal, itemName, ingredients, showModal, description}: ImenuItemModal) => {

    if (!showModal) return null;


  return (
    <ReactPortal wrapperId="react-portal-modal-container" >
        <div className="fixed inset-0 bg-slate-600 bg-opacity-70 flex flex-col items-center justify-center overflow-hidden z-40 p-4 transition-transform ease-in-out delay-150 overscroll-contain" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="w-4/6 h-4/6 flex items-center justify-center">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="z-50 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-2xl font-medium leading-6 text-gray-900" id="modal-title">{itemName}</h3>
                        <div className="mt-8">
                            <p className=" text-gray-500">{description}</p>
                        </div>

                        <div className='mt-4'>
                            <p className='text-gray-500'><span className='text-black underline underline-offset-2'>Ingredients</span>: {ingredients}</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" onClick={() => setShowModal(false)} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
                </div>
            </div>
            </div>
        </div>
        </div>
     </ReactPortal>
  )
}

export default menuItemModal