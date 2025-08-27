export default function Page() {
	return (
		<>
			{Array.from({ length: 15 }).map((_, index) => (
				<div
					key={index}
					className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
				/>
			))}
		</>
	);
}
