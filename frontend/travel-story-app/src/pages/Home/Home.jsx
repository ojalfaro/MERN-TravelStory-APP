import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosIntance from '../../utils/axiosinstance'
import Modal from 'react-modal'
import TravelStoryCard from '../../components/Cards/TravelStoryCard'
import AddEdditTravelStory from '../Home/AddEdditTravelStory'
import ViewTravelStory from '../Home/ViewTravelStory'
import {MdAdd} from 'react-icons/md'


import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Home = () => {

  const navigate = useNavigate()

  const [userInfo,setUserInfo] = useState(null)
  const [allStories,setAllstories] = useState([])

  const [opennAddEditModel,setOpennAddEditModel] = useState({
    isShown: false,
    type:"add",
    data:null
  })

  const [openViewModel,setOpenViewModel] = useState({
    isShown:false,
    data:null,
  })

  //get user info
  const getUserInfo = async() => {
    try{
      const response = await axiosIntance.get("/get-user")
      if(response.data && response.data.user){
        //set user info if user exists
        setUserInfo(response.data.user)
       // console.log(response)
      }
    }
    catch(error){
      //console.log(error)
      if(error.response.status === 401){
        //clear storage if unauthorized
        localStorage.clear()
        navigate("/login")//redirect to login
      }

    }
  }

  //GET all travels stories
  const getAllTravelsStories = async() => {
    try{
      const response = await axiosIntance.get("/get-travel-stories")
      if(response.data && response.data.stories){
        //set user info if user exists
        setAllstories(response.data.stories)
       // console.log(response.data.stories)
        
      }

    }
    catch(error){
      console.log("an unexpected error ocurred. please try again.")
    }
  }

  //handle edit story click
  const handleEdit = (data) => {
    setOpennAddEditModel({isShown:true,type:"edit",data:data})
  }

  //handle travel story click
  const handleViewStory = (data) => {
    setOpenViewModel({isShown:true,data})
  }

  //handle update favourite
  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id
  try{
    const response = await axiosIntance.put(
      "/update-is-favourite/" + storyId,
      {
        isFavourite: !storyData.isFavourite,
      }
    );
    // console.log("response.data.stories1")
    // console.log(response.data)
    // console.log(response.data.stories)

      if(response.data && response.data.stories){
        toast.success('traves update successfully')
        // console.log("response.data.stories")
        getAllTravelsStories();
      }
    

  } catch(error){
    console.log("an unexpected error ocurred. please try again.")
  }


  }
  useEffect(() => {
    getAllTravelsStories()
    getUserInfo()

    return () => {}
  },[])
  return (
    <>
       <Navbar userInfo={userInfo} /> 

     {/* {JSON.stringify(userInfo)} */}
     {/* {JSON.stringify(allStories)}  */}

      <div className='container mx-auto py-10'>
        <div className='flex gap-7'>
          <div className='flex-1'>
            {allStories.length > 0 ? (
              <div className='grid grid-cols-2 gap-4'>
                {allStories.map((item) => {
                  return (
                    <TravelStoryCard
                    key={item._id}
                    imgUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    // onEdit={()=> handleEdit(item)}
                    onClick={()=> handleViewStory(item)}
                    onFavouriteClick = {() => updateIsFavourite(item)}

                    />
                  )
                })}
              </div>
            ) : (
              <>Empty Card here</>
            )}
             {/* {JSON.stringify(allStories)}  */}
          </div> 
          <div className='w-[320px]'>

          </div>

        </div>

      </div>

        {/* add & edit travel story model */}
      <Modal 
        isOpen={opennAddEditModel.isShown}
        onRequestClose={()=> {}}
        style={{
          overlay:{
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex:999,
          }
        }}
        appElement={document.getElementById('root')}
        className="model-box"
      >
      <AddEdditTravelStory 
        type={opennAddEditModel.type}
        storyInfo={opennAddEditModel.data}
        onClose={() => {
          setOpennAddEditModel({isShown:false,type:"add",data:null})
        }}
        getAllTravelsStories={getAllTravelsStories}
      />
      </Modal>
        {/* add & edit travel story model */}
        <Modal 
        isOpen={openViewModel.isShown}
        onRequestClose={()=> {}}
        style={{
          overlay:{
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex:999,
          }
        }}
        appElement={document.getElementById('root')}
        className="model-box"
      >
        <ViewTravelStory 
          storyInfo={openViewModel.data || null}
          onClose={() => {
            setOpenViewModel((prevState) => ({...prevState,isShown:false}))
          }}
          onEditClick={() => {
            setOpenViewModel((prevState) => ({...prevState,isShown:false}))
            handleEdit(openViewModel.data || null)
          }}
          onDeleteClick={() => {}}
        />
      </Modal>

      <button className='w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10' 
      onClick={() => {
        setOpennAddEditModel({isShown:true,type:"add",data:null})
      }}>
        <MdAdd className='text-[32px] text-white'/>

      </button>

      <ToastContainer />
    </>
  )
}

export default Home
