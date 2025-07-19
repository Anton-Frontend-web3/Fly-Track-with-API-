import type { TRootState } from "@/store/store";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector