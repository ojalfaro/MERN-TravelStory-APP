import React, { useState } from 'react'
import { MdAdd,MdDeleteOutline,MdUpdate,MdClose } from 'react-icons/md'
import DateSelector from '../../components/Input/DateSelector'
import ImageSelector from '../../components/Input/ImageSelector'
import uploadImage from '../../utils/uploadImage'
import TagInput from '../../components/Input/TagInput'
import axiosIntance from '../../utils/axiosinstance'
import moment from 'moment/moment'
import { toast } from 'react-toastify'

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
    const [error,setError] = useState("")

    //add new travel story
    const addNweTravelStory = async () => {
        try {
        let imageUrl =""
        
        if(storyImg){
            const imagUpoadsRes = await uploadImage(storyImg)

            imageUrl = imagUpoadsRes.imageUrl || ""
        }
        //console.log("input data: ",{title,storyimg,story,visitedLocation,visitedDate})
        const response = await axiosIntance.post("/add-travel-story",{
            title,
            story,
            imageUrl:imageUrl || "",
            visitedLocation,
            visitedDate: visitedDate
            ? moment(visitedDate).valueOf()
            : moment().valueOf(),
        })

        if(response.data && response.data.stories){
            toast.success("story added successfully");

                getAllTravelsStories();

                onClose();
            
        }
        }
        catch(error){
            console.error("an ocurred error, try again")
        }
    }

    //update travel story
    const updateTravelStory = () => {}

    const handleAddOrUpdateClick = () => {
        console.log("input data: ",{title,storyimg,story,visitedLocation,visitedDate})

        if(!title){
            setError("Please enter the title")
            return
        }
        if(!story){
            setError("Please enter the story")
            return
        }

        setError("")

        if (type==="edit"){
            updateTravelStory()
        }
        else
        {
            addNweTravelStory()
        }
    }

    //delete story image an update the stoy
    const handleDeleteStoryImg = async () => {
        
    }

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

                {error && (
                    <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>
                )}  

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
                    <DateSelector date={visitedDate} setDate={setVisitedDate} handleDeleteImg={handleDeleteStoryImg}/>

                </div>
                
                <ImageSelector
                    image={storyimg}
                    setImage={setStoryimg}
                />

                <div className='flex flex-col gap-2 mt-4'>
                    <label className='input-label' >Story</label>
                    <textarea
                        type="text"
                        className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                        placeholder='Your story'
                        rows={10}
                        value={story}
                        onChange={({target}) => setStory(target.value)}
                    />

                </div>

                <div className='pt-3'>
                    <label className='input-label'> Visited Locations</label>
                    <TagInput tags={visitedLocation} setTags={setVisitedLocation} />

                </div>

            </div>
        </div>
    </div>
  )
}

export default AddEdditTravelStory
