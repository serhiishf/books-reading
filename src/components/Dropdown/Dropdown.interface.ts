export interface Props {
  placeHolder: string,
  options: DropdownOption[],
}

export interface DropdownOption {
  value: string,
  label: string,
}