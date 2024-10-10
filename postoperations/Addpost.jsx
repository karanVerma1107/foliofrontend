import React, { useEffect, useState } from 'react';
import './addpost.css';
import { useDispatch, useSelector } from 'react-redux';
import { addApostAction } from '../src/actions/postsaction';
import { useAlert } from 'react-alert';
import Loading from '../src/loading';

const Addpost = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { success, loading, error, message } = useSelector(state => state.addPost);

    const [postData, setPostData] = useState({
        Category: '',
        Caption: '',
        Links: []
    });

    const [fileImage, setFileImage] = useState([]);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setPostData({ 
            ...postData, 
            Category: category 
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const handleLinksChange = (e) => {
        const linksInput = e.target.value.split(','); // Split by comma
        const linksArray = linksInput.map(link => link.trim()).filter(link => link); // Clean up and filter out empty links
        setPostData({
            ...postData,
            Links: linksArray // Update Links as an array
        });
    };

    const handleFileChange = (e) => {
        const files = e.target.files; // Get the FileList
        const filesArray = Array.from(files); // Convert FileList to an array
        setFileImage(filesArray);
    };

    const handleVideoChange = (e) => {
        const files = e.target.files;
        const filesArray = Array.from(files);
        setFileImage(prevVideos => [...prevVideos, ...filesArray]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('Category', postData.Category);
        formData.append('Caption', postData.Caption);
        postData.Links.forEach(link => formData.append('Links', link)); // Append each link
        fileImage.forEach(file => formData.append('Files', file)); // Append each file

        dispatch(addApostAction(formData));

        alert.show('posting video may take some time');
    };

    useEffect(()=>{
       if(success){
        alert.success(message);
       }

       if(error){
        alert.error(error);
       }

if(loading){
    return<>
    <div className='contant'>
        <Loading/>
    </div>
    </>
}


    },[success, error])



    return (
        <div className='contant'>
            <form className='post-form' onSubmit={handleSubmit}>
                <h2>Create a New Post</h2>

                <div className='form-group'>
                    <label htmlFor='category'>Category:</label>
                    <select id='category' name='Category' required value={postData.Category} onChange={handleCategoryChange}>
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
                    <input type='text' id='links' placeholder='Enter URLs separated by commas (optional)' onChange={handleLinksChange} />
                </div>

                <div className='form-group'>
                    <label htmlFor='image'>Upload Images:</label>
                    <input type='file' id='image' name='Files' accept='image/*' multiple  onChange={handleFileChange} />
                </div>


                <div className='form-group'>
                    <label htmlFor='video'>Upload Videos:</label>
                    <input type='file' id='video' name='Videos' accept='video/*' multiple onChange={handleVideoChange} />
                    
                </div>

                <button type='submit' className='submit-btn'>Submit Post</button>
            </form>
        </div>
    );
}

export default Addpost;
