import { useContext, useEffect } from "react"
import { SelectedProjectContext } from "../Profile/ProjectList"
import Image from "next/image"

function ProjectInfo() {
    const {project, setProject} = useContext(SelectedProjectContext)

    useEffect(()=>{
        console.log("project", project)
    }, [project])

  return (
    <div className="h-full flex flex-col">
      <h2 className='font-bold text-2xl mb-4'>{project.title}</h2>
      <div className="relative w-full h-48 mb-4">
        <Image 
          src={project.image} 
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className='rounded-lg cursor-pointer'
          onClick={()=>window.open(project.image)}
        />
      </div>
      <h3 className='font-bold text-xl mb-2'>Description</h3>
      <p className='text-sm text-gray-600 leading-6 overflow-y-auto flex-grow'>
        {project.desc}
      </p>
    </div>
  )
}

export default ProjectInfo
