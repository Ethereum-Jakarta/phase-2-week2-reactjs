import { FC } from "react";
import XIcon from "../../icons/outline/XIcon";
import { MangaItem } from "../../types";
import { calculateDiscount, numToPrice } from "../../utils";
import { createTagList } from "./MangaList";

type CartItem = MangaItem & {
  qty: number;
};

const CartList: FC<{
  items: CartItem[],
  updateQty: (n: number, nn: number) => void,
  deleteItem: (n: number) => void
}> = ({ items, updateQty, deleteItem }) =>
    <>
      {
        !items.length
          ? <div className="w-full h-full">No items</div>
          : items.map((x, i) => {
            return <div className="bg-slate-800 h-52 flex flex-row gap-3 rounded-md overflow-hidden hover:scale-105 transition hover:shadow-slate-50 shadow-md border-slate-50 border-4">
              <div className="bg-rose-500 h-full w-36 overflow-hidden flex justify-center items-start">
                <img className="w-auto min-h-full h-auto" src={x.image} alt={x.name} />
              </div>
              <div className="h-full w-fit text-xl flex flex-col py-2 font-bold">
                <p>{x.name}</p>
                <p>{numToPrice(x.price * x.qty)} <span className="text-gray-500 line-through">{numToPrice(calculateDiscount(x.price * x.qty, x.discount))}</span></p>
                <input className="w-fit bg-slate-800 focus:outline-none border-b-2" value={x.qty} type="number" onInput={e => updateQty(i, parseInt(e.currentTarget.value.padStart(1, "1"), 10))} />
                <p className="text-xs mt-auto gap-1 flex font-normal">{createTagList(x)}</p>
              </div>
              <div className="w-fit ml-auto p-2">
                <button onClick={_ => deleteItem(i)}><XIcon /></button>
              </div>
            </div>
          })
      }
    </>

export default CartList;
