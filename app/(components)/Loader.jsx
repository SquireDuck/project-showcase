import Image from 'next/image'
import loader from '../images/load.png'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <Image
        src={loader}
        width={120}
        height={120}
        alt="Loading spinner"
        className="animate-spin z-10"
      />
    </div>
  )
}

export default Loader