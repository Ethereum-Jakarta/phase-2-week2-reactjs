import RpnLogo from "../../assets/rpn-logo.png"

export default function Footer() {
  return (
    <div id="footer">
      <img src={RpnLogo} />
      <div id="copyright">© All rights reserved</div>
      <div>
        made by <span id="rpn">RPN</span>
      </div>
    </div>
  )
}
