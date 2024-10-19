import React, { useCallback, useEffect, useState } from 'react';
import './addpost.css';
import { useDispatch, useSelector } from 'react-redux';
import { addApostAction } from '../src/actions/postsaction';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../profile/getCropping';
import { useAlert } from 'react-alert';
import useGlobalKeyListener from '../mentionLogic/keyListener';
import MentionInput from '../mentionLogic/mentionInput';
const AddPost = () => {
const alert = useAlert();
const dispatch = useDispatch();

const {message, error, succes, loading} = useSelector(state=>state.addPost);

    const [postData, setPostData] = useState({
        Category: '',
        Caption: '',
        Links: [],
    });

  

const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);
    const [srcs, setSrcs] = useState([]); // Array of sources for images
    const [crops, setCrops] = useState([]); // Array for each crop
    const [zooms, setZooms] = useState([]); // Array for each zoom
    const [croppedImageUrls, setCroppedImageUrls] = useState([]); // Array of cropped images
    const [pixelCrops, setPixelCrops] = useState([]); // Array for pixel crop dimensions



    const [userSuggestions, setUserSuggestions] = useState([]);
    const [showMentionInput, setShowMentionInput] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleLinksChange = (e) => {
        const linksArray = e.target.value.split(',').map(link => link.trim()).filter(link => link);
        setPostData({ ...postData, Links: linksArray });
    };


const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const newSrcs = files.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise(resolve => {
            reader.onloadend = () => resolve(reader.result);
        });
    });

    Promise.all(newSrcs).then(setSrcs);
    setCrops(new Array(files.length).fill({ x: 0, y: 0 }));
    setZooms(new Array(files.length).fill(1));
    setCroppedImageUrls(new Array(files.length).fill(null));
    setPixelCrops(new Array(files.length).fill({ x: 0, y: 0, width: 0, height: 0 }));
};






    const handleVideoChange = (e) => {
        setVideoFiles(Array.from(e.target.files));
    };

  
  
  


    const getCroppedImage = useCallback(async (index) => {
        const src = srcs[index];
        const pixelCrop = pixelCrops[index];
        
        if (!src || pixelCrop.width <= 0 || pixelCrop.height <= 0) return;
        
        try {
            const croppedImg = await getCroppedImg(src, pixelCrop);
            setCroppedImageUrls(prev => {
                const updated = [...prev];
                updated[index] = croppedImg;
                return updated;
            });
        } catch (error) {
            console.error("Error cropping image:", error);
        }
    }, [srcs, pixelCrops]);

    const handleCropChange = (index) => (crop) => {
        setCrops(prev => {
            const updated = [...prev];
            updated[index] = crop;
            return updated;
        });
    };

    const handleZoomChange = (index) => (zoom) => {
        setZooms(prev => {
            const updated = [...prev];
            updated[index] = zoom;
            return updated;
        });
    };


    const handleCropComplete = (index) => (croppedArea, croppedAreaPixels) => {
        setPixelCrops(prev => {
            const updated = [...prev];
            updated[index] = croppedAreaPixels;
            return updated;
        });
        getCroppedImage(index);
    };



 







const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('Category', postData.Category);
    formData.append('Caption', postData.Caption);
    postData.Links.forEach(link => formData.append('Links', link));

    const files = [];

    // Process cropped images
    for (const croppedImageUrl of croppedImageUrls) {
        if (croppedImageUrl) {
            const response = await fetch(croppedImageUrl);
            const blob = await response.blob();
            const imageFile = new File([blob], 'croppedImage.png', { type: 'image/png' });
            files.push(imageFile);
        }
    }

    // Add video files to the files array
    videoFiles.forEach(file => files.push(file));

    console.log('files are', files);

    dispatch(addApostAction(formData, files));
    alert.show("Uploading your post please wait");
};

const handleCaptionChange = (e) => {
    const value = e.target.value;
    setPostData({ ...postData, Caption: value });

    // Show mention input when typing "/"
    if (value.endsWith('/')) {
        setShowMentionInput(true);
        // Example static user list; replace with your logic to fetch users
        setUserSuggestions(['karan43', 'user123', 'exampleUser']);
    } else if (showMentionInput && !value.endsWith('/')) {
        setShowMentionInput(false);
    }
};

const handleUserSelect = (userName) => {
    const updatedCaption = postData.Caption.substring(0, postData.Caption.lastIndexOf('/') + 1) + userName + ' ';
    setPostData({ ...postData, Caption: updatedCaption });
    setShowMentionInput(false);
};






useEffect(()=>{

if(succes){
    alert.success(message);
}

if(error){
    alert.error(error);
}

},[succes, error, loading])


useGlobalKeyListener()

    return (
        <form className='add-post-form' onSubmit={handleSubmit}>
            <h2>Create a New Post</h2>

            <div className='form-group'>
                <label htmlFor='category'>Category:</label>
                <select id='category' name='Category' required value={postData.Category} onChange={handleChange}>
                    <option value='' disabled>Select category</option>
                    <option value='Research'>Research</option>
                    <option value='Project'>Project</option>
                    <option value='Blog'>Blog</option>
                </select>
            </div>

            

            <div className='form-group'>
                <label htmlFor='caption'>Caption:</label>
                <textarea
                    id='caption'
                    name='Caption'
                    placeholder='Enter your caption'
                    value={postData.Caption}
                    required
                    onChange={handleCaptionChange}
                />
                {showMentionInput && (
                    <MentionInput onSelect={handleUserSelect} />
                )}
            </div>

            <div className='form-group'>
                <label htmlFor='links'>Links:</label>
                <input 
                    type='text' 
                    id='links' 
                    placeholder='Enter URLs separated by commas (optional)' 
                    onChange={handleLinksChange} 
                />
            </div>

            <div className='form-group'>
                <label htmlFor='image'>Upload Images:</label>
                <input type='file' accept="image/jpeg, image/png, image/gif" multiple className='file-input' onChange={handleImageChange} />


                {srcs.map((src, index) => (
                    <div key={index} style={{ position: 'relative', width: '100%', height: '400px' }}>
                        <Cropper
                            image={src}
                            crop={crops[index]}
                            zoom={zooms[index]}
                            aspect={1} // 1:1 for square
                            onCropChange={handleCropChange(index)}
                            onZoomChange={handleZoomChange(index)}
                            onCropComplete={handleCropComplete(index)}
                        />
                    </div>
                ))}


{croppedImageUrls.map((url, index) => url && (
                    <img key={index} src={url} alt="Cropped" style={{ maxWidth: '100%', height: 'auto' }} />
                ))}

            </div>

            <div className='form-group'>
                <label htmlFor='video'>Upload Videos:</label>
                <input type='file' accept="video/*" multiple className='file-input' onChange={handleVideoChange} />
            </div>

            <button type='submit' className='submit-btn'>Submit Post</button>
        </form>
    );
};

export default AddPost;
