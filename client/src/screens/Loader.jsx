import {FadeLoader} from 'react-spinners'

const Loader = () => {
  return (
    <div>
        <div className='bg-zinc-900 w-screen flex justify-center'><FadeLoader color='white'/></div>
    </div>
  )
}

export default Loader