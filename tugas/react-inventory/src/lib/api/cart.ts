import { cartStorageVar } from "../constants"
import { MangaItem } from "../types";

namespace CartStorage {
  export type Item = MangaItem & { qty: number };

  export function fetchList() {
    const item = localStorage.getItem(cartStorageVar);
    return JSON.parse(item ?? "[]") as Item[];
  }

  export function setList(list: Item[]) {
    return localStorage.setItem(cartStorageVar, JSON.stringify(list));
  }

  export function addItem(item: Item) {
    const list = fetchList();
    list.push(item);
    return setList(list);
  }

  export function updateItem(id: string, value: Partial<Omit<Item, "id">>) {
    const list = fetchList();
    const item = list.find(x => x.id === id);
    if (!item) return false;
    for (const key in value) Reflect.set(item, key, Reflect.get(value, key));
    setList(list);
    return true;
  }

  export function upsertAndIncreaseQty(id: string, value: Omit<Item, "qty">) {
    const list = fetchList();
    let item = list.find(x => x.id === id);
    if (!item) {
      item = {...value, qty: 1 };
      list.push(item);
    } else {
      item.qty += 1;
    }
    setList(list);
  }

  export function dosertAndDecreaseQty(id: string) {
    let list = fetchList();
    const item = list.find(x => x.id === id);
    if (!item) return;
    item.qty -= 1;
    if (item.qty < 1) list = list.filter(x => x.id !== id);
    setList(list);
  }

  export function deleteItem(id: string) {
    const list = fetchList().filter(x => x.id !== id);
    setList(list);
  }

  export function nukeList() {
    localStorage.removeItem(cartStorageVar);
  }
}

export default CartStorage; //////////////////////EXCUSE ME!!!!!!!!!!!!! WHY YOU USING UGLY NAMESPACE !!!!!
