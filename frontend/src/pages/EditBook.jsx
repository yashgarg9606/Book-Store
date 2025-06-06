import React,{useState,useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [image, setImage] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const {enqueueSnackbar}=useSnackbar()
  const {id}=useParams()
  useEffect(() => {
    setLoading(true);
    axios.get(`https://mern-stack-project-bnty.onrender.com/books/${id}`)
    .then((response)=>{
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear)
      setImage(response.data.image);
      setContext(response.data.context);
      setLoading(false);
    })
    .catch((error)=>{
        setLoading(false);
        alert('An error happened.Please check console');
        console.log(error);
    })
    
  }, [])
  
  const handleEditBook=()=>{
    const data={
      title,
      author,
      publishYear,
      image,
      context
    };
    setLoading(true);
    axios
      .put(`http://localhost:5554/books/${id}`,data)
      .then(()=>{
        setLoading(false);
        navigate('/');
        enqueueSnackbar('Edited Successfully',{variant:'success'})
      })
      .catch((error)=>{
        setLoading(false);
        // alert('An error happened.Please check console');
        console.log(error);
        enqueueSnackbar('Error',{variant:'error'})
      })
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/>:''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type='text'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type='text'
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type='number'
            value={publishYear}
            onChange={(e)=>setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Image Link</label>
          <input type='text'
            value={image}
            onChange={(e)=>setImage(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Book Link</label>
          <input type='text'
            value={context}
            onChange={(e)=>setContext(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  );
}

export default EditBook
