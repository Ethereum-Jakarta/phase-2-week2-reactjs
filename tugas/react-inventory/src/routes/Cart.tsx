import { FC, useContext, useState } from "react";
import CartStorage from "../lib/api/cart";
import CartList from "../lib/components/bookshelft/CartList";
import { NotificationContext } from "../lib/contexes";
import { numToPrice } from "../lib/utils";

const rootItemms = [
  {
    name: "Naruto",
    discount: Math.random(),
    isFreeShip: Math.random() >= 0.5,
    isCod: Math.random() >= 0.5,
    price: 10_000 * (Math.round(Math.random() * 9) + 1),
    image: "https://cdn.myanimelist.net/images/manga/3/249658l.webp",
    category: "Owo",
    qty: 1,
  },
  {
    name: "Monster",
    discount: Math.random(),
    isFreeShip: Math.random() >= 0.5,
    isCod: Math.random() >= 0.5,
    price: 10_000 * (Math.round(Math.random() * 9) + 1),
    image: "https://cdn.myanimelist.net/images/manga/3/258224l.webp",
    category: "Owo",
    qty: 1,
  },
  {
    name: "Berserk",
    discount: Math.random(),
    isFreeShip: Math.random() >= 0.5,
    isCod: Math.random() >= 0.5,
    price: 10_000 * (Math.round(Math.random() * 9) + 1),
    image: "https://cdn.myanimelist.net/images/manga/1/157897l.webp",
    category: "Owo",
    qty: 1,
  },
  {
    name: "20th Century Boys",
    discount: Math.random(),
    isFreeShip: Math.random() >= 0.5,
    isCod: Math.random() >= 0.5,
    price: 10_000 * (Math.round(Math.random() * 9) + 1),
    image: "https://cdn.myanimelist.net/images/manga/5/260006l.webp",
    category: "Owo",
    qty: 1,
  },
  {
    name: "Koihime†Musou: Doki☆Otome darake no Sangokushi Engi",
    discount: Math.random(),
    isFreeShip: Math.random() >= 0.5,
    isCod: Math.random() >= 0.5,
    price: 1_000,
    image: "https://cdn.myanimelist.net/images/manga/1/154188l.webp",
    category: "Owo",
    qty: 1,
  },
];

const deliveryFee = 10_000;

const Cart: FC<{}> = () => {
  const [items, setItems] = useState(CartStorage.fetchList());

  const updateQty = (index: number, num: number) => {
    num = Math.max(num, 1);
    items[index].qty = num;
    CartStorage.setList(items);
    setItems([...items]);
  }

  const deleteItem = (index: number) => {
    const list = items.filter((_, i) => i !== index);
    CartStorage.setList(list);
    setItems(list);
  }

  const ctx = useContext(NotificationContext);

  const fee = items.length ? items.map(x => x.isFreeShip ? 0 : deliveryFee as number).reduce((a, b) => a + b) : 0;
  const totalItem = items.length ? items.map(x => x.price * x.qty).reduce((a, b) => a + b) : 0;
  const grandTotal = totalItem + fee;

  const checkout = () => {
    ctx?.addNotification({ message: "Thank you for shopping !", type: "success" });
    CartStorage.nukeList();
    setItems([]);
  }

  return <div className="flex flex-row g-1 min-h-screen w-full max-lg:flex-col-reverse max-lg:justify-end">
    <div className="w-3/5 flex flex-col gap-2 p-2 max-lg:w-full">
      <CartList items={items} deleteItem={deleteItem} updateQty={updateQty} />
    </div>
    <div className="w-2/5 max-lg:w-full flex p-2 max-lg:sticky max-lg:top-[3.8rem]">
      <div className="mt-auto w-full sticky bottom-1/4 h-fit transition hover:scale-105 hover:shadow-md hover:shadow-slate-50 rounded-md border-slate-50 border-4 bg-slate-800">
        <div className="p-2 flex items-center flex-col relative">
          <img className="absolute bottom-[12.7rem] left-40 max-lg:hidden" src="https://listen.moe/images/girls/kanna.gif" alt="kanna" />
          <p className="justify-between flex w-full">
            <span>Item total</span>
            <span>{numToPrice(totalItem)}</span>
          </p>
          <p className="justify-between flex w-full">
            <span>Delivery fee</span>
            <span className={fee < 1 ? "text-green-400" : ""}>{fee < 1 ? "Free" : numToPrice(fee)}</span>
          </p>
          <p className="w-full bg-slate-50 h-0.5 my-5"></p>
          <p className="justify-between flex w-full text-xl font-semibold">
            <span>Grand Total</span>
            <span className="">{numToPrice(grandTotal)}</span>
          </p>
          <p className="w-full bg-slate-50 h-0.5 my-5"></p>
          <button className="bg-green-400 w-full rounded-md" onClick={_ => checkout()}>Checkout</button>
        </div>
      </div>
    </div>
  </div>
}

export default Cart;
