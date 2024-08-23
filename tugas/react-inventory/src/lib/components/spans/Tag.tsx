import { FC } from "react"

type TagProp = {
  children: JSX.Element | string
}

const Tag: FC<TagProp> = ({ children }) =>
  <button className="w-fit h-fit rounded-md p-2 text-center border-2 active:scale-95 transition-transform text-nowrap">{children}</button>

export default Tag;
