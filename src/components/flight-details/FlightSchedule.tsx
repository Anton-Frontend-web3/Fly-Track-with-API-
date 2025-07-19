export function FlightSchedule() {
	return (
		<section className="grid grid-cols-2 gap-1 w-full bg-secondary overflow-hidden rounded-2xl ">
			<div className="bg-background p-3 flex justify-between items-center hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]">
				<span>Scheduled</span>
				<span className="font-bold">08:15</span>
			</div>
			<div className="bg-background p-3 flex justify-between items-center hover:bg-[var(--background-hover)] active:bg-[var(--background-active)] "> 
				<span>Actual</span>
				<span className="font-bold">08:24</span>
			</div>
			<div className="bg-background p-3 flex justify-between items-center hover:bg-[var(--background-hover)] active:bg-[var(--background-active)] ">
				<span>Scheduled</span>
				<span className="font-bold">13:25</span>
			</div>
			<div className="bg-background p-3 flex justify-between items-center hover:bg-[var(--background-hover)] active:bg-[var(--background-active)] ">
				<span>Estimated</span>
				<span className="font-bold">13:23</span>
			</div>
		</section>
	)
}
