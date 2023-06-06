import Image from 'next/image'
import { useEffect, useRef } from 'react'
import BlurImage from './BlurImage'

export default function Card({
	creditUrl,
	imgAlt = 'placeholder',
	imgSrc = '/placeholder.jpg',
	color,
	tags,
	shotBy,
	newLimit,
	isLast,
}) {
	/**
	 * Select the Card component with useRef
	 */
	const cardRef = useRef()

	/**
	 * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
	 */
	useEffect(() => {
		if (!cardRef?.current) return

		const observer = new IntersectionObserver(([entry]) => {
			if (isLast && entry.isIntersecting) {
				newLimit()
				observer.unobserve(entry.target)
			}
		})

		observer.observe(cardRef.current)
	}, [isLast])

	return (
		<div className="shadow-lg rounded-xl p-2 w-full bg-white" ref={cardRef}>
			<a
				className="grid gap-5 md:grid-cols-5"
				href={creditUrl}
				target="_blank"
			>
				<div className="w-full h-96 relative overflow-hidden rounded-xl">
					<Image
						src={imgSrc}
						fill
						sizes=""
						style={{ objectFit: 'cover' }}
						alt={imgAlt}
						lazy="true"
						placeholder="blur"
						blurDataURL={BlurImage}
					/>
				</div>
				<div className="p-2">
					{imgAlt}
				</div>
				<div className="p-2">{color}</div>
				<div className="p-2">
					{
						tags.map((tag, index) => (
							<span className='p-1' key={tag.title}>#{tag.title}</span>
						))
					}
				</div>
				<div className="rounded-b-xl p-2">
					Credit:<span className="font-semibold"> {shotBy}</span>
				</div>
			</a>
		</div>
	)
}
