export interface PropsDropdown {
  placeHolder: string,
  options: DropdownOption[],
  noOptionsMessage: string
}

export interface DropdownOption {
  value: string,
  label: string,
}