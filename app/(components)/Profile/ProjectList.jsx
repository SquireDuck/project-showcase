import { useState, createContext } from "react"
import ProjectCard from "../ProjectCard"
import ProjectDetailModal from "../ProjectDetails/ProjectDetailModal"

export const SelectedProjectContext = createContext()

const ProjectList = ({userProject}) => {
    const [showModal, setShowModal] = useState(false)
    const [project, setProject] = useState([])
    //console.log("userProject", userProject)

    const onProjectClick = (project) => {
        setProject(project)
        setShowModal(true)
    };
        
    return (
    <div className="mt-10 mb-10">
        {userProject?
        <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userProject.map((project) => (
                <div key={project.id} onClick={()=>onProjectClick(project)}>
                    <ProjectCard project={project}/>
                </div>
            ))}
        </div>:null}

        <SelectedProjectContext.Provider value={{project, setProject}}>
            {showModal?<ProjectDetailModal 
            setShowModal={(value)=>setShowModal(value)}
            />:null}
        </SelectedProjectContext.Provider>
    </div>
  )
}

export default ProjectList
