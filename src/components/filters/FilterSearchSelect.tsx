import { cn } from '@/utils/cn'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface IFilterSearchSelectProps {
	value: string | null
	onChange: (value: string | null) => void
	data: string[]
	entityTitle: string
}

export function FilterSearchSelect({
	value,
	onChange,
	data,
	entityTitle
}: IFilterSearchSelectProps) {
	const [isOpen, setOpen] = useState(false)
	const handleSelect = (currentValue: string) => {
		onChange(
			currentValue === value || currentValue === 'all' ? '' : currentValue
		)
		setOpen(false)
	}

	return (
		<Popover
			open={isOpen}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={isOpen}
					className='w-[180px] sm:w-[145px] md:w-[145px] justify-between gap-1'
				>
					{value ? data.find(item => item === value) : `Select ${entityTitle}...`}
					<ChevronsUpDown className='opacity-50 h-4 w-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[180px] sm:w-[145px] md:w-[145px] p-0'>
				<Command>
					<CommandInput
						placeholder={`Search ${entityTitle}...`}
						className='h-9'
					/>
					<CommandList>
						<CommandEmpty>No {entityTitle} found.</CommandEmpty>
						<CommandGroup>
							<CommandItem
								value='all'
								onSelect={handleSelect}
							>
								{'All'}
								<Check
									className={cn(
										'ml-auto',
										value === '' || value === null ? 'opacity-100' : 'opacity-0'
									)}
								/>
							</CommandItem>
							{data.map(item => (
								<CommandItem
									key={item}
									value={item}
									onSelect={handleSelect}
								>
									{item}
									<Check
										className={cn(
											'ml-auto',
											value === item ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
