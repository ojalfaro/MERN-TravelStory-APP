import React from 'react'
import { MdAdd,MdDeleteOutline,MdUpdate,MdClose } from 'react-icons/md'

const AddEdditTravelStory = ({
    storyInfo,
    type,
    onClose,
    getAllTravelsStories
}) => {

    const handleAddOrUpdateClick = () => {}
  return (
    <div>
        <div className='flex items-center justify-between'>
            <h5 className='text-xl font-medium text-slate-700'>
                {type==="add" ? "add story" : "update story"}
            </h5>

            <div>
                <div className='flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg'>
                    {type ==="add" ? (
                    <button className='btn-small' onClick={handleAddOrUpdateClick}>
                        <MdAdd className='text-lg' /> Add Story
                    </button>) : 
                    (
                    <>
                    <button className='btn-small' onClick={handleAddOrUpdateClick}>
                        <MdUpdate className='text-lg' /> Update Story

                    </button>
                    <button className='btn-small btn-delete' onClick={onClose}>
                        <MdDeleteOutline className='text-lg' /> Delete
                    </button>
                    </>)}

                    <button className='' onClick={onClose}>
                        <MdClose className='text-xl text-slate-400' />

                    </button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEdditTravelStory
