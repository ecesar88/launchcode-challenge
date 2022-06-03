/* eslint-disable @typescript-eslint/no-explicit-any */
interface ISideBarItemProps {
  onClick: () => void
  selected: boolean
  label: string
  icon:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined
}

export default ISideBarItemProps
