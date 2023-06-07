import axios from 'axios';
import { useState } from 'react';

/**
 * This component is used in ViewProblemPage in order to upload a screenshot 
 * for proof of completion for a problem.
 * @param param0 
 * The ID of the problem selected.
 * @returns 
 * Returns a component that allows the user to upload an image and mark the problem as completed.
 */
const ImageUpload = ({ problemId } : { problemId: string }) => {
    const FormData = require('form-data');

      /**
       * A method that uploads the image to the database (which is later encoded in base64) and 
       * marks the problem as completed.
       * @param event 
       * Event that is passed when the user submits an image
       */
      const imageHandler = (event: any) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file, file.filename);
        
        // upload the image to the db
        try {
          var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
        const res = axios.post(`http://${process.env.REACT_APP_DOMAIN!}/api/image/${loggedInUser.id}/` + problemId, formData,{
          headers:{ "Content-Type": 'multipart/form-data' }
        } );
        }
        catch (ex) {
          console.log(ex);
        }

        // mark the problem as completed
        axios.post(`http://${process.env.REACT_APP_DOMAIN!}/completedProblems/${loggedInUser.id}/` + problemId)
		    .then(response => console.log(response.data));
      }
 
      return (
        <div className="App">
          <input className='image-input' type="file" name="image" accept="image/*" multiple={false} onChange={imageHandler} />
        </div>
      );
}
 
export default ImageUpload;
