import { ObjectEl } from "../../utils/element"
import { useEffect, useState } from "react"
import PokeballBlue from "../../assets/pokeball-blue.png"
import PokeballRed from "../../assets/pokeball-red.png"
import { getDetailChain } from "../../api/api"
import RpnLogo from "../../assets/rpn-logo.png"

export default function Dialog({ data, setVisible, setSelectedData }) {
  const [image, setImg] = useState('')
  const [chainData, setChainData] = useState([])
  const [version, setVersion] = useState("new")

  const handleCloseDialog = () => {
    setVisible(false)
    setSelectedData([])
  }

  const handleChangeVersion = (e) => {
    if (e.target.id === "vs-new") {
      setImg(data.sprites?.other?.dream_world?.front_default)
      setVersion("new")
    } else {
      setImg(data.sprites?.other["official-artwork"]?.front_default)
      setVersion("old")
    }
  }

  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await getDetailChain(data.species.url)
        setChainData(res)
        setImg(data.sprites?.other?.dream_world?.front_default)
      } catch (error) {
        console.error("Failed to fetch Pokemon data", error)
      } finally {
      }
    }
    
    getDetail()
  }, [data])

  return (
    <div id="dialog">
      {console.log(data, "ini data")}
      <div id="dialog-container">
        <button id="btn-x-dialog" onClick={handleCloseDialog}>
          ╳
        </button>
        <div id="detail-container">
          <div id="detail-1">
            <div id="detail-div-img">
              <img id="detail-img" src={image} alt="detail-img" />
              <div id="version">
                Version:
                <img
                  id="vs-new"
                  src={PokeballBlue}
                  className={version === "new" ? "version-new" : ""}
                  onClick={handleChangeVersion}
                  alt="vs-new"
                />
                <img
                  id="vs-old"
                  src={PokeballRed}
                  className={version === "old" ? "version-old" : ""}
                  onClick={handleChangeVersion}
                  alt="vs-old"
                />
              </div>
            </div>

            <div id="detail-stats">
              Stats
              {data.stats.map((_, i) => (
                <div id="detail-stat" key={i}>
                  <span id="stat-name">
                    {_.stat.name}
                    <span>:</span>
                  </span>
                  <span id="base-stat" className={_.stat.name}>
                    {_.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div id="detail-2">
            {/* SUB STAT  */}
            <div id="sub-stat">
              <div id="sub-stat-1">
                <div id="height">
                  <div>Height</div>
                  <div id="sub-second-stat">{data.height}</div>
                </div>
                <div id="weight">
                  <div>Weight</div>
                  <div id="sub-second-stat">{data.weight}</div>
                </div>
              </div>
              <div id="sub-stat-2">
                <div id="abilities">
                  <div>Abilities</div>
                  <div id="sub-second-stat">
                    {data.abilities[0].ability.name}
                  </div>
                </div>
                <div id="type">
                  <div>Type</div>
                  <div id="type-div">
                    {data.types.map((e) => (
                      <img src={ObjectEl[e.type.name].val} alt={e.type.name} />
                    ))}
                  </div>
                </div>
              </div>
              <div id="sub-stat-3">
                <div id="height">
                  <div>Species</div>
                  <div id="sub-second-stat">{data.species.name}</div>
                </div>
              </div>
            </div>

            {/* EVO  */}
            <div id="evo">Evolution</div>
            <div id="evolution">
              {chainData.map((e, i) => (
                <div id="evo-div">
                  <div id="evo-detail">
                    <img src={e.url} alt={e.name} />
                    <span id="evo-name">{e.name}</span>
                  </div>
                  {i + 1 !== chainData.length && <span id="next-evo">❯</span>}
                </div>
              ))}
            </div>

            {/* RPN LOGO  */}
            <div id="rpn-detail">
              <img src={RpnLogo} alt="rpn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
