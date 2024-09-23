import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosIntance from '../../utils/axiosinstance'
import TravelStoryCard from '../../components/Cards/TravelStoryCard'

const Home = () => {

  const navigate = useNavigate()
  const [userInfo,setUserInfo] = useState(null)
  const [allStories,setAllstories] = useState([])

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
        console.log(response.data.stories)
        
      }

    }
    catch(error){
      console.log("an unexpected error ocurred. please try again.")
    }
  }

  //handle edit story click
  const handleEdit = (data) => {}

  //handle travel story click
  const handleViewStory = (data) => {}

  //handle update favourite
  const updateIsFavourite = async (storyData) => {}



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
                    onEdit={()=> handleEdit(item)}
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

    </>
  )
}

export default Home
