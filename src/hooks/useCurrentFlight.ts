import { QUERY_PARAM_FLIGHT } from "@/components/flight-list/flight.constants";
import { useSearchParams } from "react-router-dom";
import AviationService from '@/services/aviantion.serves'
import { useQuery } from "@tanstack/react-query";
import type { IFlight } from "@/services/aviation.types";
export const useCurrentFlight = () => {
    const [searchParams] = useSearchParams();
    const selectedFlightId = searchParams.get(QUERY_PARAM_FLIGHT);

    // ----> ДОБАВЬТЕ ЭТУ СТРОКУ ДЛЯ ДИАГНОСТИКИ <----
    console.log('ID из URL:', selectedFlightId); 

    const { data: flight, isLoading, isError } = useQuery<IFlight, Error>({
        queryKey: ['flight', selectedFlightId],
        queryFn: () => AviationService.getFlight(selectedFlightId!),
        enabled: !!selectedFlightId, 
    });

    // ----> И ЭТИ СТРОКИ ТОЖЕ <----
    console.log('Статус загрузки (isLoading):', isLoading);
    console.log('Есть ли ошибка (isError):', isError);
    console.log('Полученные данные (flight):', flight);

    return { flight, isLoading };
};