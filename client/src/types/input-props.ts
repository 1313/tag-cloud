import { ProfunctorProps } from "./profunctor-props";
export interface InputProps<T> extends ProfunctorProps<T> {
  label: string | JSX.Element;
  disabled?: boolean;
}
