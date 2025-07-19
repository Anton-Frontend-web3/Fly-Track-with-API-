import { Heart } from '@/components/animate-ui/icons/heart'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { addFavorite, removeFavorite } from '@/store/favorites/favorites.slice'
import { useCallback } from 'react'

interface Props {
	aircraftReg: string
}

export function FavoriteCardAction({ aircraftReg }: Props) {
	const dispatch = useAppDispatch()
	const favorites = useAppSelector(state => state.favorites)
	const isFavorite = favorites.includes(aircraftReg)

	const handleToggleFavorites = useCallback( () => {
		if (isFavorite) {
			dispatch(removeFavorite(aircraftReg))
		} else {
			dispatch(addFavorite(aircraftReg))
		}
	}, [isFavorite,aircraftReg,dispatch])
	return (
		<button onClick={handleToggleFavorites}>
			<Heart fill={isFavorite ? 'var(--foreground)' : 'none'}
				animateOnHover
				animateOnTap
			></Heart>
		</button>
	)
}
