import { useEffect, useState } from "react"
import { Link, redirect, useNavigate, useParams } from "react-router-dom"
import RpnLogo from "@/assets/rpn-logo.png"
import RpnMovie from "@/assets/rpn-movie.png"
import RpnLogo2 from "@/assets/rpn-logo-2.png"
import RpnLogo3 from "@/assets/rpn-logo-3.png"

export const Navbar = () => {
  const [searchKeyword, setSearchKeyword] = useState("")
  const nav = useNavigate()

  useEffect(() => {
    if (searchKeyword.length === 0) {
      setTimeout(() => {
        nav("/")
      }, 200)
    }
  }, [searchKeyword])

  const handleOnEnter = () => {
    nav(`/search/query=${searchKeyword}`)
  }

  const funcOnClickLogo = () => {
    setSearchKeyword("")
    nav("/")
  }

  const funcOnChange = (_: any) => {
    setSearchKeyword(_.target.value)
  }

  const funcKeyDown = (_: any) => {
    if (_.key === "Enter") {
      handleOnEnter()
    }
  }

  return (
    <div className="w-full border-b-[0.5px] border-b-gray-700 bg-base-color  py-3">
      <div className="mx-auto flex justify-between w-4/5 lg:max-w-[65rem] align-middle items-center">
        <div className="hover:cursor-pointer flex" onClick={funcOnClickLogo}>
          <img src={RpnLogo} className="w-[40px]" />
          <h1 className=" text-blue-rpn h-[30px] pt-2 px-2 font-bold">RPN Movie App</h1>
          {/* <img src={RpnMovie} className="w-[60px] h-30px" /> */}
        </div>
        <label className="input flex items-center gap-2 w-[170px]  sm:w-[200px] lg:w-[300px]">
          <input
            type="text"
            className="grow "
            placeholder="Search"
            value={searchKeyword}
            onChange={funcOnChange}
            onKeyDown={funcKeyDown}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
    </div>
  )
}
