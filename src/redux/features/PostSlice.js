import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const getPost = createAsyncThunk('post/getPosts', async({id}) =>{
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
})

export const deletePost = createAsyncThunk('post/deletePost', async({id}) =>{
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{method: 'DELETE'})
    .then(res => res.json())
})

export const createPost = createAsyncThunk('post/createPost', async({values}) =>{
    return fetch(`https://jsonplaceholder.typicode.com/posts`,{method: 'POST',
    headers:{
        Accept: 'appication/json',
        'Content-type':'application/json'
    },
    body:JSON.stringify({
        title: values.title,
        body: values.body,

    })

    }).then(res => res.json());
})

export const updatePost = createAsyncThunk('post/updatePost', async({id,title,body}) =>{
    return fetch(`https://jsonplaceholder.typicode.com/posts${id}`,{method: 'PUT',
    headers:{
        Accept: 'appication/json',
        'Content-type':'application/json'
    },
    body:JSON.stringify({
        title,
        body,

    })

    }).then(res => res.json());
})

const PostSlice = createSlice({
    name:'posts',
    initialState:{
        loading: false,
        post:[],
        error:null,
        body:"",
        edit:false,


    }, 
    reducers: {

                setEdit: (state,action) =>{
                    state.body = action.payload.body;
                    state.edit = action.payload.edit;

                }

    },
    extraReducers: (builder) => {
        builder
        .addCase(getPost.pending, (state, action) =>{
            state.loading = true;
        })
        .addCase(getPost.fulfilled, (state,action) =>{
            state.loading = false;
            state.post = [action.payload];
        })
       .addCase(getPost.rejected, (state,action) =>{
        state.loading = false;
        state.error = action.payload;
       });
                //***DeletePost***\\
    builder
        .addCase(deletePost.pending, (state, action) =>{
            state.loading = true;
        })
        .addCase(deletePost.fulfilled, (state,action) =>{
            state.loading = false;
            state.post = action.payload;
        })
       .addCase(deletePost.rejected, (state,action) =>{
        state.loading = false;
        state.error = action.payload;
       });

                    //***CreatePost***\\
       builder
       .addCase(createPost.pending, (state, action) =>{
           state.loading = true;
       })
       .addCase(createPost.fulfilled, (state,action) =>{
           state.loading = false;
           state.post = [action.payload];
       })
      .addCase(createPost.rejected, (state,action) =>{
       state.loading = false;
       state.error = action.payload;
      })

      //***EditPost***\\
      builder
      .addCase(updatePost.pending, (state, action) =>{
          state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state,action) =>{
          state.loading = false;
          state.post = [action.payload];
      })
     .addCase(updatePost.rejected, (state,action) =>{
      state.loading = false;
      state.error = action.payload;
     })
       

    }
})

export const {setEdit} = PostSlice.actions;
export default PostSlice.reducer;