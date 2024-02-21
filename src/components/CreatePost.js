import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { createPost } from '../redux/features/PostSlice';
import Spinner from './Spinner';

const CreatePost = () => {
  
  const [values,setValues] = useState({title:"", body:""});
  const [posting, setPosting] = useState(false);
  const { title, body} = values;
  const {loading, post } = useSelector(state => ({...state.app}))
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //***Handle-Post-Function***/
  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(createPost({values}))
    setValues({titile:'', body:''})
    setPosting(true);
  }

    //***Show-Created-Post-Function***/

    const showCreatedPost = () =>{
      return(
        <>
        {loading ? <Spinner/> : (
          <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{post[0].title}</h5>
            <p className="card-text">{post[0].body}</p>
          </div>
        </div>
        )}
        
        </>
      )
    }

  return (
    
      <div>
        <h1 className='text-center bg-dark text-white p-2'>Create Post</h1>
    <form action=''>
          <div className="mb-3 mt-4">
            <input 
            value={title}
            onChange={(e) => setValues({...values, title: e.target.value})}
            type="text"
             className="form-control"
            />
          </div>
          
          <div className="form-floating mb-3">
              <textarea
               className="form-control"
               defaultValue={""}
               value={body} 
               onChange={ (e) => setValues({...values, body: e.target.value})}
               id="floatingTextarea"
              />
              <label htmlFor="floatingTextarea">Add Post Description</label>
            </div>
            <div className='d-flex align-items-end justify-content-end'>    
              <button className="btn btn-success" onClick={()=> navigate('/')}>Go Home</button>
              <button className="btn btn-danger ms-2" type='submit' onClick={handleSubmit}>Submit</button>
            </div>
    </form>
            <div className='mt-4'>

                {posting && <div>{showCreatedPost()}</div> }

            </div>




      </div>

    
  )
}

export default CreatePost
