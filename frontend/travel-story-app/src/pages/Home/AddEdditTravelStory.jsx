import React, { useState } from 'react'
import { MdAdd,MdDeleteOutline,MdUpdate,MdClose } from 'react-icons/md'
import DateSelector from '../../components/Input/DateSelector'

const AddEdditTravelStory = ({
    storyInfo,
    type,
    onClose,
    getAllTravelsStories
}) => {

    const [title,setTitle] = useState("")
    const [storyimg,setStoryimg] = useState(null)
    const [story,setStory] = useState("")
    const [visitedLocation,setVisitedLocation] = useState([])
    const [visitedDate,setVisitedDate] = useState(null)
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

        <div>
            <div className='flex-1 flex flex-col gap-2 pt-4'>
                <label className='input-label'>Title</label>
                <input 
                type='text'
                className='text-2xl text-slate-950 outline-none'
                placeholder='A day at the great wall'
                value={title}
                onChange={({target }) => setTitle(target.value) }
                />

                <div className='my-3'>
                    <DateSelector date={visitedDate} setDate={setVisitedDate} />

                </div>

            </div>
        </div>
    </div>
  )
}

export default AddEdditTravelStory
