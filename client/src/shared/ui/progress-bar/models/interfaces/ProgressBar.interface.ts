import { SpinnerProps } from '@shared/ui/spinner/models/interfaces/Spinner.interface'

export interface ProgressBarProps extends SpinnerProps {
  textColor?: string
  textValue?: number | string
}
