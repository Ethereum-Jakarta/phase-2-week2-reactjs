import { FC, useContext, useEffect, useState } from "react";
import CartIcon from "../../icons/outline/CartIcon";
import { NotificationContext } from "../../contexes";
import { MangaItem } from "../../types";

import { numToPrice, calculateDiscount } from "../../utils";
import ApiClient from "../../api";
import CartStorage from "../../api/cart";

export const createTagList = (item: MangaItem) => {
  const list = [] as JSX.Element[];
  list.push(<span className="bg-slate-800 border-2 rounded-md p-1 shadow-md shadow-slate-800">{item.category}</span>)
  if (item.discount > 0) list.push(<span className="bg-green-400 rounded-md p-1 shadow-md shadow-slate-800">{Math.round(item.discount * 100)}% OFF</span>)
  if (item.isCod) list.push(<span className="bg-blue-400 rounded-md p-1 shadow-md shadow-slate-800">BISA COD</span>);
  if (item.isFreeShip) list.push(<span className="bg-red-400 rounded-md p-1 shadow-md shadow-slate-800">GRATIS ONGKIR!</span>);
  return <>{list}</>;
}

const createMangaList = (list: MangaItem[]) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ctx = useContext(NotificationContext);
  return list.map(x =>
    <div className="overflow-hidden hover:scale-105 rounded-xl border-2 transition hover:shadow-slate-50 hover:shadow-md flex flex-col h-fit w-fit">
      <div className="relative flex items-start h-5/4 overflow-hidden">
        <div className="overflow-hidden h-80">
          <img className="object-cover" src={x.image} alt={x.name} />
        </div>
        <div className="absolute bottom-0 left-0 w-full p-2">
          <div className="bg-slate-800 text-center bg-opacity-95 shadow-md shadow-slate-800 rounded-md">
            <p className="text-lg font-bold">{x.name}</p>
            <p className="text-sm font-bold line-through text-gray-400">{numToPrice(calculateDiscount(x.price, x.discount))}</p>
            <p className="text-base font-bold">{numToPrice(x.price)}</p>
          </div>
        </div>
        <div className="absolute top-0 left-0 flex flex-row flex-wrap gap-1 p-1 content-center text-sm opacity-95 font-bold">
          {createTagList(x)}
        </div>
      </div>
      <button
        className="p-2 h-fit text-green-400 flex gap-2 justify-center flex-row-reverse mt-auto"
        onClick={
          _ => {
            CartStorage.upsertAndIncreaseQty(x.id, x);
            ctx?.addNotification({ message: `${x.name} added to cart`, type: "success" });
          }
        }>
        <span>ADD TO CART</span>
        <span><CartIcon /></span>
      </button>
    </div>
  );
}

const MangaList: FC<{}> = () => {
  const [mangaList, setMangaList] = useState([] as MangaItem[]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const apiClient = ApiClient.initFromStorage();
    apiClient?.fetchAllProducts(page, 10)
      .then(async x => {
        setMaxPage(x.data.numOfPages);
        if (x.data.index !== page) return;
        setMangaList(y => [...y, ...x.data.datas.map(z => ({
          id: z.id,
          name: z.name,
          discount: Math.random(),
          isFreeShip: Math.random() >= 0.5,
          isCod: Math.random() >= 0.5,
          price: z.price,
          image: z.description,
          category: z.category.name,
        } as MangaItem))]);
      });
  }, [page]);

  return <div className="min-h-screen h-auto grid grid-cols-5 gap-4 max-lg:grid-cols-2 content-start">
    {createMangaList(mangaList)}
    <button
      className="border-md"
      onClick={_ => setPage(page + 1)}
      style={page === maxPage ? { display: "none" } : {}}
    >See More</button>
  </div>
}

export default MangaList;
