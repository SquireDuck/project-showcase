import { useContext } from "react"
import { SelectedProjectContext } from "../Profile/ProjectList"
import Image from "next/image"

const TechList = () => {
    const { project } = useContext(SelectedProjectContext)

    return (
        <div className='h-full flex flex-col'>
            <h2 className='font-bold text-2xl mb-4'>Technology</h2>
            <div className='flex flex-wrap gap-2 mb-6'>
                {project?.techList.map((tech, index) => (
                    <span key={index} className='bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm'>
                        {tech}
                    </span>
                ))}
            </div>

            <h2 className='font-bold text-xl mb-4'>Source/Links</h2>
            <div className='space-y-3 flex-grow'>
                {project['app-demo-url'] && (
                    <LinkItem 
                        icon="/Images/play.png" 
                        url={project['app-demo-url']} 
                        text="App Demo"
                    />
                )}
                {project['yt-url'] && (
                    <LinkItem 
                        icon="/Images/youtube.png" 
                        url={project['yt-url']} 
                        text="YouTube"
                    />
                )}
                {project['ui-ux-design-url'] && (
                    <LinkItem 
                        icon="/Images/figma.png" 
                        url={project['ui-ux-design-url']} 
                        text="UI/UX Design"
                    />
                )}
                {project['github-url'] && (
                    <LinkItem 
                        icon="/Images/github.png" 
                        url={project['github-url']} 
                        text="GitHub"
                    />
                )}
            </div>
        </div>
    )
}

const LinkItem = ({ icon, url, text }) => (
    <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className='flex items-center gap-2 text-blue-600 hover:underline'
    >
        <Image src={icon} width={20} height={20} alt='icon' className='w-5 h-5' />
        {text}
    </a>
)

export default TechList

