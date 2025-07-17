

export const metadata = {
  title: 'About Me | Portfolio'
}

const skills = [
  'Python',
  'C',
  'Go',
  'Bash',
  'Git',
  'Linux',
  'Docker',
  'Kubernetes',
  'TCP/IP',
  'HTTP',
  'SSH'
]

export default function AboutPage() {
  return (
    <section>
      <h1
        className="text-3xl font-bold mb-6 text-terminal-green"
        
      >
        About Me
      </h1>
      <p
        className="mb-6 leading-relaxed text-light-muted dark:text-dark-muted"
       
       
        
      >
        I'm a Linux enthusiast with a passion for programming and networking. I follow the Unix philosophy of building small, composable tools. I love writing clean code and contributing to open-source projects.
      </p>

      <h2
        className="text-2xl font-semibold mb-4 text-terminal-blue"
       
       
        
      >
        Skills & Tools
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="px-2 py-1 text-xs bg-light-border text-light-text dark:bg-dark-border dark:text-dark-text rounded-md">
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
