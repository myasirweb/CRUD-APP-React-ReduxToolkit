import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, getPost, setEdit, updatePost } from '../redux/features/PostSlice';
import Spinner from './Spinner';
const Posts = () => {

  const [id, setId] = useState();
  const [txtBody, setTxtBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {post, loading, body, edit} = useSelector(state =>({...state.app}))


useEffect(()=>{

  if(body){
    setTxtBody(body)
  }

},[body]);

  //***Function***/
const handleFetchData = (e) =>{
  e.preventDefault();
 if(!id){
  window.alert('Please Provide Post ID')
 }else{
  dispatch(getPost({id}))
  setId('');
 }
}

//***Delete-Function***/
const handleDelete = (id) =>{

  dispatch(deletePost({id:post[0].id}))
  window.location.reload();
  window.alert('Post Deleted !')

}

  return (
    <> 
      
      <div className='row mt-4 d-flex align-items-center justify-content-center'>
      <div className='col-md-8'>
        <form action=''>
      
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">Search By ID</label>
          <input type="number" className="form-control"  value={id} onChange={ e => setId(e.target.value) } />
      </div>

      <button onClick={handleFetchData} type="submit" className="btn btn-secondary">Fech Post</button>
      <button onClick={() => navigate('/createpost')} type="button" className="btn btn-primary ms-4">Create Post</button>
        
        </form>
      </div>
    </div>
    
  
  <div className='contaner'>
    {
      loading ? <Spinner /> :  (
        <>
            {post.length > 0 && (
              <>
                  <div className="card mt-4">
                    <div className="card-body">
                      <h5 className="card-title">{post[0].title}</h5>
                      {edit ? 
                      <>
                      <textarea
                               className="form-control"
                               id="floatingTextarea"
                               value={txtBody}
                               onChange={(e) => setTxtBody(e.target.value)}

                      />
                       <div className='d-flex align-items-end justify-content-end'>
                      <button className="btn btn-success"
                      onClick={() =>{
                        dispatch(updatePost({id:post[0].id, title:post[0].title, body:txtBody}))
                        dispatch(setEdit({edit:false, body:""}))
                      }}
                      >Save</button>
                      <button className="btn btn-danger ms-2"
                      onClick={() => dispatch(setEdit({edit:false, body:""}))}
                      >Cancle</button>
                      </div>
                      </> : (
                        <>
                          <p className="card-text">{post[0].body}</p>
                        </>
                      )}

                      {!edit && (
                              <div className='d-flex align-items-end justify-content-end'>
                              <button
                              className="btn btn-success"
                              onClick={() => dispatch(setEdit({edit:true, body: post[0].body}))}
                              >EDIT</button>

                              <button className="btn btn-danger ms-2" onClick={handleDelete}>DELETE</button>
                              </div>
                      )}
                    
                     
                      
                    </div>
                  </div>

              </>

            )}
        </>
      )
    }
  </div>
    </>

  )
}

export default Posts
