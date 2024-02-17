import { BeatLoader } from 'react-spinners';

const FullLoader = ({ loading }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 ${
        loading ? 'visible' : 'invisible'
      }`}
    >
      <BeatLoader color="#ffffff" loading={loading} size={15} />
    </div>
  );
};

export default FullLoader;