
const SectionHeader = ({ eyebrow, title, description, align = 'center' }) => {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <div className={`flex flex-col ${alignment} gap-3`}>
      {eyebrow && (
        <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-(--pet-orange) shadow-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-3xl font-poppins text-4xl font-extrabold text-(--pet-secondary) lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl font-poppins text-base leading-7 text-(--pet-dark) lg:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
