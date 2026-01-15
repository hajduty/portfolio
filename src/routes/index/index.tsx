import { type ProjectCardProps, ProjectCard } from "./components/ProjectCard"
import { motion } from "framer-motion"
import Bg from "../../assets/Bg.mp4"
import { usePlayOnce } from "../../hooks/usePlayOnce"
//"React", "TypeScript", "Konva.js", "Y.js", ".NET", "C#", "Redis", "SignalR", "gRPC", "Azure",
const projects: ProjectCardProps[] = [
  {
    title: "easycourse",
    year: 2025,
    href: "/projects/easycourse",
    tags: [{ color: "favorite", title: "⭐" }, { title: ".NET" },{ title: "React" },{ title: "C#" },{ title: "TypeScript" },{ title: "SQL" }, { title: "TailwindCSS" }]
  },
  {
    title: "teamsketch",
    year: 2025,
    href: "/projects/teamsketch",
    tags: [{ color: "favorite", title: "⭐" }, { title: ".NET" },{ title: "SignalR" },{ title: "AKS" },{ title: "Redis" },{ title: "gRPC" }, { title: "React" }, { title: "TypeScript" }]
  },
  {
    title: "webclicker",
    year: 2024,
    href: "/projects/webclicker",
    tags: [{ title: ".NET" }, { title: "React" }, { title: "C++" }, { title: "Tailwind" }, { title: "MySQL" }]
  },
  {
    title: "leaguereplaytool",
    year: 2024,
    href: "/projects/leaguereplaytool",
    tags: [{ title: "React" }, { title: "Electron" }, { title: "Tailwind" }]
  },
  {
    title: "prerecs",
    year: 2022,
    href: "/projects/leaguereplaytool",
    tags: [{ title: "C++" }, { title: "Dear ImGui" }]
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
    },
  },
};

export function Home() {
  const shouldAnimate = usePlayOnce("home-intro");

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
      <motion.div
        variants={containerVariants}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
      >
        <div className="flex flex-col md:flex-row">
        <motion.div
          variants={itemVariants}
          className='flex backdrop-blur-md h-screen md:w-1/2 top-0 right-0'
        >
          <div className="flex flex-col relative w-full h-full backdrop-blur-md text-white justify-between">
            <motion.div
              variants={itemVariants}
              className="m-auto md:m-20"
            >
              <motion.h1
                variants={itemVariants}
                className="text-white text-4xl"
              >
                Hajder Al-Remahy
              </motion.h1>
              <motion.h2
                variants={itemVariants}
                className="text-gray-400 text-2xl"
              >
                Mjukvaruutvecklare
              </motion.h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="m-auto md:m-20 flex flex-col gap-2 md:items-start items-center text-gray-300"
            >
              <motion.a
                variants={itemVariants}
                href="https://www.linkedin.com/in/hajderalremahy"
                className="underline hover:text-white w-fit"
              >
                LinkedIn
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="https://www.github.com/hajduty"
                className="underline hover:text-white w-fit"
              >
                GitHub
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className='bg-black/35 backdrop-blur-lg h-screen md:w-1/2 top-0 right-0'
        >
          <div className="flex flex-col relative w-full h-full text-white">
            <motion.span
              variants={itemVariants}
              className="mx-auto py-20 text-3xl text-white md:hidden block"
            >
              <p>Projects</p>
            </motion.span>
            <motion.div
              variants={containerVariants}
              className="h-fit w-fit md:m-auto mx-auto flex gap-2 flex-col"
            >
              {projects.map(project => (
                <motion.div key={project.title} variants={itemVariants}>
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        </div>
      </motion.div>
    </>
  )
}
