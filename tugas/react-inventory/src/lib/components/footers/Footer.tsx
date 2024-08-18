import HeartIcon from "../../icons/filled/HeartIcon";
import { FC } from "react";

const Footer: FC<{}> = () =>
<div className="flex flex-col gap-2 p-1 items-center">
  <div className="bg-white h-0.5 w-4/5"></div>
  <p className="flex flex-row items-center gap-2">
    <span>Made with</span>
    <span className="text-rose-500"><HeartIcon /></span>
    <span>by <strong>Rakemoon</strong></span>
  </p>
</div>

export default Footer;
