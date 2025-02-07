import Image from "next/image"

const ProjectCard = ({project}) => {
  return (
    <div className="cursor-pointer hover:scale-105 transition-all
    duration-300 ease-in-out bg-sky-50 p-2 
    rounded-lg hover:bg-sky-200">
      <Image src={project?.image} 
      alt="project_image" 
      width={480} 
      height={400}
      className="w-full h-auto object-cover rounded-lg"
      />

      <p className="text-[13px] mt-2 line-clamp-2">{project?.title}</p>
    </div>
  )
}

export default ProjectCard
