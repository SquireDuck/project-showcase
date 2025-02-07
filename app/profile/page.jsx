"use client";

import { useSession } from "next-auth/react";
import ProjectList from "../(components)/Profile/ProjectList"
import UserInfo from "../(components)/Profile/UserInfo"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import firebaseApp from "../Shared/firebaseConfig";
import { useCallback, useEffect, useState } from "react";

const Profile = () => {
    const { data: session } = useSession();
    const db = getFirestore(firebaseApp);
    const [userProject, setUserProject] = useState([]);

    const getUserProject = useCallback(async () => {
        setUserProject([]);
        if (session) {
            const q = query(collection(db, 'Projects'), 
            where('userEmail', '==', session.user.email));

            const querySnapshot = await getDocs(q);
            const projects = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserProject(projects);
        }
    }, [db, session]);

    useEffect(() => {
        if (session) {
            getUserProject();
        }
    }, [session, getUserProject])

    return (
        <div>
            <UserInfo />
            <ProjectList userProject={userProject} />
        </div>
    );
}

export default Profile
