import { ObjectEl } from "../../utils/element"

export default function Card({ data, showDialog }) {
  return (
    <div id="card" key={data.id} onClick={() => showDialog(data)}>
      <img
        id="card-img"
        src={data.sprites?.other?.dream_world?.front_default}
        alt={data.id}
      />
      <div id="card-name">{data.name}</div>
      <div id="element">
        {data.types.map((_, i) => (
          <img key={i} id="element-img" alt={i} src={ObjectEl[_.type.name]?.val} />
        ))}
      </div>
    </div>
  )
}
