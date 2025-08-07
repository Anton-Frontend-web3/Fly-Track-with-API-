import OriginalLogo from '@/images/CompanyLogo.svg?react'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export function CompanyLogoIcon({
	className,
	...props
}: ComponentProps<'svg'>) {
	return (
		<OriginalLogo
			className={cn('fill-foreground', className)}
			{...props}
		/>
	)
}
