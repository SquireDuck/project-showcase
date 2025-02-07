'use client';

import { useEffect, useState } from 'react';
import technologyData from '../Data/data';
const { Technology } = technologyData;
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseApp } from '../../Shared/firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Loader from '../Loader';
import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Form = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState([]);
  const [techList, setTechList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [docId, setDocId] = useState(Date.now().toString());
  const router = useRouter();

  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const { data: session } = useSession();

  useEffect(()=>{
    if(session){
        setInputs((values) => ({
            ...values, userName: session.user?.name
        }));
        setInputs((values) => ({
            ...values, userImage: session.user?.image
        }));
        setInputs((values) => ({
            ...values, userEmail: session.user?.email
        }));
        setInputs((values) => ({
            ...values, id:docId
        }));
    }
  },[session, docId])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({...values, [name]: value}));
  };

  const saveDoc = useCallback(async () => {
    await setDoc(doc(db, 'Projects', docId), inputs);
    setLoader(false);

    router.push('/profile');
  }, [inputs, db, router, docId]);

  useEffect(()=>{
    if(submit==true)
    {
        saveDoc();
    }
    },[submit, saveDoc])

  const onTechSelect = (name, isChecked) => {
    if (isChecked) {
        setTechList(techList => [...techList, name]);
    } else {
        let techListItem=techList.filter(item => item !== name);
        setTechList(techListItem);
    }
  };

  useEffect(() => {
    setInputs((values) => ({
        ...values, techList: techList
    }));
  }, [techList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const storageRef = ref(storage, `projects/` + file?.name);
    uploadBytesResumable(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    }).then(resp=>{
        getDownloadURL(storageRef).then((url)=>{
            setInputs((values) => ({
                ...values, image: url
            }));
            setSubmit(true);
        })
    })
  };

  return (
    <div className='mt-10 shadow-md mx-4 md:mx-56 lg:mx-72 p-5 rounded-md'>
      {loader && <div className='absolute'><Loader /></div>}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h2 className="text-[30px] font-extrabold text-blue-500">ADD PROJECT</h2>
        <h2 className="mb-6">Create New Project and Explore with Community</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <textarea
          name="desc"
          className="w-full mb-4 outline-blue-400 border-[1px] p-2 rounded-md"
          required
          onChange={handleChange}
          placeholder="Write Description here"
        />
        <h2 className="mb-3 font-bold">Select Technology</h2>
        <div className="grid grid-cols-2 mb-4 md:grid-cols-3 gap-x-4">
          {Technology.map((item) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input
                id={`technology-${item.name}`}
                type="checkbox"
                onChange={(e) => onTechSelect(item.name, e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor={`technology-${item.name}`}>{item.name}</label>
            </div>
          ))}
        </div>
        <input
          type="text"
          name="app-demo-url"
          placeholder="App Demo Url"
          onChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          name="ui-ux-design-url"
          onChange={handleChange}
          placeholder="UI/UX Design Url(Figma)"
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          name="yt-url"
          onChange={handleChange}
          placeholder="Youtube Tutorial Url"
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          name="github-url"
          onChange={handleChange}
          placeholder="Github Source Code Url"
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          onChange={handleChange}
          name="instagram"
          placeholder="Instagram Profile"
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <h2 className="mb-3 font-bold">Upload Photo</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full p-1 rounded-md text-white"
        >
          Submit
        </button>
        </form>
      </div>
  );
};

export default Form;