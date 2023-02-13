export interface PropsDropdown {
  placeHolder: string,
  options: DropdownOption[],
}

export interface DropdownOption {
  value: string,
  label: string,
}