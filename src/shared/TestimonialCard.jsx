import { FaQuoteLeft, FaStar } from 'react-icons/fa'

const TestimonialCard = ({ story }) => {
  return (
    <article className="flex h-full flex-col justify-between rounded-[24px] bg-white p-6 shadow-xl outline outline-1 outline-(--pet-accent)/35 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-(--pet-light) text-(--pet-orange)">
            <FaQuoteLeft />
          </span>
          <div className="flex gap-1 text-(--pet-accent)" aria-label={`${story.rating} star rating`}>
            {Array.from({ length: story.rating }).map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>
        </div>

        <p className="mt-6 font-poppins text-base leading-7 text-(--pet-dark)">
          {story.quote}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4 border-t border-(--pet-light) pt-5">
        <img src={story.image} alt={story.name} className="h-14 w-14 rounded-2xl object-cover" />
        <div>
          <h3 className="font-poppins text-lg font-extrabold text-(--pet-secondary)">
            {story.name}
          </h3>
          <p className="font-poppins text-sm font-semibold text-(--pet-orange)">
            {story.meta}
          </p>
        </div>
      </div>
    </article>
  )
}

export default TestimonialCard
