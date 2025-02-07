'use client'

import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { firebaseApp } from './/Shared/firebaseConfig';
import Image from "next/image";
import { useState, useEffect } from "react";
import ProjectList from "./(components)/Profile/ProjectList";

export default function Home() {
  const db=getFirestore(firebaseApp);
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      const q = query(collection(db, 'Projects'),
        orderBy("id", 'desc')
      );

      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => doc.data());
      setProjects(projectsData);
    };

    getProjects();
  }, [db]);

  return (
    <div className="p-5">
      <h2 className="text-[25px] mb-[-15px]">All Latest Projects</h2>
      {projects?
      <ProjectList userProject={projects}/>:null}
    </div>
  );
}
