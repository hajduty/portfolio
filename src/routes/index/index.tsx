import { type ProjectCardProps, ProjectCard } from "./components/ProjectCard"
import Bg from "../../assets/Bg.mp4"

const projects: ProjectCardProps[] = [
  {
    title: "teamsketch",
    year: 2025,
    href: "/projects/teamsketch",
    tags: [{ color: "favorite", title: "⭐" }, { title: ".NET" }, { title: "React" }, { title: "TypeScript" }, { title: "Tailwind" }]
  },
  {
    title: "webclicker",
    year: 2024,
    href: "/projects/webclicker",
    tags: [{ color: "favorite", title: "⭐" }, { title: ".NET" }, { title: "React" }, { title: "C++" }, { title: "Tailwind" }, { title: "TCP" }, { title: "MySQL" }]
  },
  {
    title: "leaguereplaytool",
    year: 2024,
    href: "/projects/leaguereplaytool",
    tags: [{ title: "React" }, { title: "Electron" }, { title: "Tailwind" }]
  },
  {
    title: "Notes",
    year: 2024,
    href: "/projects/Notes",
    tags: [{ title: "C#" }, { title: "Blazor" }]
  },
  {
    title: "prerecs",
    year: 2022,
    href: "/projects/leaguereplaytool",
    tags: [{ title: "C++" }, { title: "Dear ImGui" }]
  }
]

export function Home() {
  return (
    <>
      <div
        style={{
          opacity: "10%",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <video autoPlay loop muted style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        >
          <source src={Bg} type="video/mp4" />
        </video>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className='flex bg-[#131313] h-screen md:w-1/2 top-0 right-0'>
          <div className="flex flex-col relative w-full h-full backdrop-blur-md text-white justify-between">
            <div className="m-auto md:m-20">
              <h1 className="text-white text-4xl">Hajder Al-Remahy</h1>
              <h4 className="text-gray-400 text-2xl">Mjukvaruutvecklare</h4>
            </div>
            <div className="m-auto md:m-20 flex flex-col gap-2 md:items-start items-center text-gray-300">
              <a href="https://www.linkedin.com/in/hajderalremahy" className="underline hover:text-white w-fit">LinkedIn</a>
              <a href="https://www.github.com/hajduty" className="underline hover:text-white w-fit">GitHub</a>
            </div>
          </div>
        </div>
        <div className='bg-[#0C0C0C] h-screen md:w-1/2 top-0 right-0'>
          <div className="flex flex-col relative w-full h-full backdrop-blur-xl text-white">
            <span className="mx-auto py-20 text-3xl text-white md:hidden block">
              <p>Projects</p>
            </span>
            <div className="h-fit w-fit md:m-auto mx-auto flex gap-2 flex-col">
              {projects.map(project => <ProjectCard key={project.title} {...project} />)}
            </div>
          </div>
        </div>
      </div>
    </ >
  )
}