import { deleteDoc, doc, getFirestore } from "firebase/firestore"
import ProjectInfo from "./ProjectInfo"
import TechList from "./TechList"
import { firebaseApp } from '../../Shared/firebaseConfig';
import { useContext } from "react";
import { SelectedProjectContext } from "../Profile/ProjectList";
import { useSession } from "next-auth/react";


const ProjectDetailModal = ({setShowModal}) => {
  const db = getFirestore(firebaseApp)
  const {project, setProject} = useContext(SelectedProjectContext)
  const {data:session} = useSession();

  const deleteProject = async () => {
    await deleteDoc(doc(db, 'Projects', project.id))
    setShowModal(false);
    window.location.reload()
  }
  
  return (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative my-6 mx-auto w-full max-w-[75%] sm:max-w-[75%] md:max-w-5xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*body*/}
              <div className="flex flex-col md:flex-row p-6">
                <div className="w-full md:w-1/2 md:pr-4 mb-6 md:mb-0">
                  <ProjectInfo />
                </div>
                <div className="w-full md:w-1/2 md:pl-4">
                  <TechList />
                </div>
              </div>
              
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                {session?.user.email==project.userEmail?
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-4 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => 
                      deleteProject()
                    }
                  >
                    Delete
                  </button>
                :null}
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  )
}

export default ProjectDetailModal
