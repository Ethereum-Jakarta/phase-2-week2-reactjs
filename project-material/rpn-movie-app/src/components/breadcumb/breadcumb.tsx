import { Link } from "react-router-dom"

export function Breadcumb({ pathName }: { pathName: any }) {
  return (
    <div className="breadcrumbs text-lg ml-2">
      <ul>
        <li>
          <Link to="/">
            <a className="text-xl font-bold text-[#43B2E2]">Home</a>
          </Link>
        </li>
        <li>
          <a className="text-xl font-bold text-white">{pathName}</a>
        </li>
      </ul>
    </div>
  )
}
