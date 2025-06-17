import { useNavigate } from "react-router-dom"

type TagProps = {
  color?: keyof typeof colors
  title: string
}

const colors = {
  favorite: "bg-indigo-600 text-white",
  default: "bg-neutral-700/50 text-gray-300"
}

const getColor = (color: TagProps["color"]) => {
  if (!color) {
    return colors.default;
  }

  const c = colors[color];

  return c;
}

const Tag = ({ color, title }: TagProps) => {
  const colorClass = getColor(color)
  return <span className={`inline-flex gap-2 rounded p-1 text-xs font-bold select-none ${colorClass}`}>{title}</span>
}

export type ProjectCardProps = {
  href: string
  title: string
  year: number
  tags: TagProps[]
}

export const ProjectCard = ({ title, year, tags }: ProjectCardProps) => {
  const navigate = useNavigate();

  return (
    <button type="button" className="flex flex-col gap-2 items-start w-full hover:bg-neutral-800 p-4 px-8 rounded duration-150 transform cursor-pointer" onClick={() => navigate(`projects/${title}`)}>
      <a className="flex items-baseline gap-4">
        <p className="text-gray-400">{year}</p>
        <h2 className="text-white text-3xl font-light">{title}</h2>
      </a>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => <Tag key={tag.title} {...tag} />)}
      </div>
    </button>
  )
}
