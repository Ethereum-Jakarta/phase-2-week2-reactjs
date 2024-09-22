import RpnLogo from "@/assets/rpn-logo.png"

export function Footer() {
  return (
    <div className="flex justify-center pb-10 pt-20 text-white flex-col text-center align-middle items-center bg-slate-950">
      <img className="w-[40px] h-[40px]" src={RpnLogo} />
      <div id="copyright">© All rights reserved</div>
      <div>
        made by <span id="rpn">RPN</span>
      </div>
    </div>
  )
}
