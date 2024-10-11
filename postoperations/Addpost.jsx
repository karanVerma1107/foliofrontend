import React, { useCallback, useState } from 'react';
import './addpost.css';
import { useDispatch } from 'react-redux';
import { addApostAction } from '../src/actions/postsaction';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../profile/getCropping';

const AddPost = () => {

const dispatch = useDispatch();



    const [postData, setPostData] = useState({
        Category: '',
        Caption: '',
        Links: [],
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleLinksChange = (e) => {
        const linksArray = e.target.value.split(',').map(link => link.trim()).filter(link => link);
        setPostData({ ...postData, Links: linksArray });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleVideoChange = (e) => {
        setVideoFiles(Array.from(e.target.files));
    };

    const getCroppedImage = useCallback(async () => {
        if (!src) return;
        try {
            const croppedImg = await getCroppedImg(src, { width: 800, height: 800 }); // Adjust size as needed
            setCroppedImageUrl(croppedImg);
        } catch (error) {
            console.error("Error cropping image:", error);
        }
    }, [src]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('Category', postData.Category);
        formData.append('Caption', postData.Caption);
        postData.Links.forEach(link => formData.append('Links', link));
        
        if (croppedImageUrl) {
            formData.append('Files', croppedImageUrl); // Append the cropped image
        }
        videoFiles.forEach(file => formData.append('Files', file));

        dispatch(addApostAction(formData));
    };


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
                <textarea id='caption' name='Caption' placeholder='Enter your caption' value={postData.Caption} required onChange={handleChange}></textarea>
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
                <input type='file' accept="image/*" multiple className='file-input' onChange={handleImageChange} />

                {src && (
                    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                        <Cropper
                            image={src}
                            crop={crop}
                            zoom={zoom}
                            aspect={1} // 1:1 for square
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={getCroppedImage}
                        />
                    </div>
                )}
                {croppedImageUrl && (
                    <img src={croppedImageUrl} alt="Cropped" style={{ maxWidth: '100%', height: 'auto' }} />
                )}


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
