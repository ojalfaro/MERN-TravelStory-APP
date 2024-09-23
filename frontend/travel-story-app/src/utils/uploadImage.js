import axiosIntance from "./axiosinstance"

const uploadImage = async(imageFile) => {
    const formData = new FormData();
    //append image file to form data
    formData.append('image' ,imageFile)

    try {
        const response = await axiosIntance.post('/upload-image',formData, {
            headers: {
                'Content-Type' :'multipart/form-data',//set header for file upload
            }
        })
        return response.data //return response data

    }
    catch(error){
        console.error("error uploading the image ",error)
        throw error //retrow error for handling
    }
}

export default uploadImage