import { useEffect, useState } from "react"
import { getAllPokemon } from "../../api/api"
import LoadMore from "../button/loadMore"
import BtnHeader from "./btnHeader"
import Card from "./card"
import Dialog from "../dialog/dialog"

export default function CardCollection() {
  const [limit, setLimit] = useState(25)
  const [pokeData, setPokedata] = useState([])
  const [selectedData, setSelectedData] = useState(null)
  const [visibleDialog, setVisibleDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleShowDialog = (data) => {
    setSelectedData(data)
    setVisibleDialog(true)
  }

  useEffect(() => {
    const getPokeData = async () => {
      setLoading(true)
      try {
        const data = await getAllPokemon(limit)
        setPokedata(data || [])
      } catch (error) {
        console.error("Failed to fetch Pokemon data", error)
      } finally {
        setLoading(false)
      }
    }
    getPokeData()
  }, [limit])

  return (
    <>
      <BtnHeader />
      <div id="card-container">
        <div id="card-collection">
          {pokeData.map((e) => (
            <Card key={e.id} data={e} showDialog={handleShowDialog} />
          ))}
        </div>
        <LoadMore num={limit} setLimit={setLimit} loading={loading} />
      </div>
      {visibleDialog && selectedData && (
        <Dialog
          data={selectedData}
          visible={visibleDialog}
          setVisible={setVisibleDialog}
          setSelectedData={setSelectedData}
        />
      )}
    </>
  )
}
