import { FC, useContext, useEffect, useState } from "react";
import ApiClient from "../lib/api";
import { NotificationContext } from "../lib/contexes";
import LoadingIcon from "../lib/icons/outline/LoadingIcon";
import PencilIcon from "../lib/icons/outline/Pencil";
import XIcon from "../lib/icons/outline/XIcon";
import { numToPrice } from "../lib/utils";

const products = [
  {
    id: "",
    name: "Naruto",
    price: 10_000 * (Math.round(Math.random() * 9) + 1),
    image: "https://cdn.myanimelist.net/images/manga/3/249658l.webp",
    qty: 11,
  },
];

type ProductType = typeof products extends (infer U)[] ? U : never;

const Product: FC<{
  product: ProductType;
  change: <K extends keyof ProductType>(key: K, value: ProductType[K]) => unknown;
  remove: () => Promise<unknown>;
  update: () => Promise<unknown>;
}>
  = ({ product, change, update, remove }) => {
    const [isEditDisable, setIsEditDisable] = useState(false);
    const [isDeleteDisable, setIsDeleteDisable] = useState(false);

    return <div className="flex flex-row gap-2 border-2 p-2 rounded-md hover:scale-105 transition hover:shadow-slate-50 shadow-md bg-slate-800">
      <div className="flex h-32 w-32 justify-center items-center overflow-hidden relative group">
        <label className="absolute inset-0 w-full h-full bg-slate-800 text-center hidden group-hover:flex bg-opacity-50 justify-center items-center">
          <span>Change Picture</span>
          <input
            type="file"
            className="hidden"
            onChange={
              async e => {
                e.preventDefault();
                setIsEditDisable(true);
                const apiClient = ApiClient.initFromStorage();
                const image = await apiClient?.uploadImage(e.target.files![0]);
                if (image) change("image", image);
                setIsEditDisable(false);
              }
            } />
        </label>
        <img className="flex-shrink-0 h-32 w-auto rounded-md min-h-full" src={product.image} alt={product.name} />
      </div>
      <form
        className="w-full"
        onSubmit={
          async e => {
            e.preventDefault();
            setIsEditDisable(true);
            await update();
            setIsEditDisable(false);
          }
        }>
        <div className="flex flex-col justify-start h-full gap-3">
          <span className="flex gap-1">
            <label className="min-w-11">Name</label>
            <span>:</span>
            <input
              value={product.name}
              className="bg-transparent outline-none border-b-2 w-full"
              type="text"
              onChange={e => change("name", e.target.value)} />
          </span>
          <span className="flex gap-1">
            <label className="min-w-11">Price</label>
            <span>:</span>
            <input
              value={numToPrice(product.price).replace(",00", "")}
              className="bg-transparent outline-none border-b-2 w-full"
              type="text"
              onChange={e => {
                const value = e
                  .target
                  .value
                  .slice(3)
                  .replaceAll(/\./g, "");
                let parsedValue = parseInt(value, 10);
                if (isNaN(parsedValue)) parsedValue = 0;
                change("price", parsedValue);
              }} />
          </span>
          <span className="flex gap-1">
            <label className="min-w-11">Qty</label>
            <span>:</span>
            <input
              value={product.qty}
              className="bg-transparent outline-none border-b-2 w-full"
              type="number"
              onChange={e => change("qty", parseInt(e.target.value, 10))} />
          </span>
          <div className="flex flex-row justify-center gap-2">
            <button
              type="submit"
              className="text-yellow-400 border-2 rounded-lg border-yellow-400 px-2 w-1/2 hover:bg-slate-700"
              onClick={_ => setIsEditDisable(!isEditDisable)}>{
                isEditDisable
                  ? <LoadingIcon />
                  : <div className="flex flex-row gap-2 items-center">
                    <PencilIcon />
                    <span>Edit</span>
                  </div>
              }</button>
            <button
              className="text-red-400 border-2 rounded-lg border-red-400 px-2 w-1/2 hover:bg-slate-700"
              onClick={async e => {
                e.preventDefault();
                setIsDeleteDisable(true);
                await remove();
              }}>{
                isDeleteDisable
                  ? <LoadingIcon />
                  : <div className="flex flex-row gap-2 items-center">
                    <XIcon />
                    <span>Delete</span>
                  </div>
              }</button>
          </div>
        </div>
      </form>
    </div>
  }

const CreateProduct: FC<{ refreshProduct: () => void }> = ({ refreshProduct }) => {
  const notifCtx = useContext(NotificationContext);
  const [categories, setCategories] = useState([] as { id: string; name: string; }[]);
  const isDisable = useState(false);
  const formSubmit = useState({
    name: "",
    price: 0,
    quantityInStock: 0,
    description: "",
    categoryId: "",
  });

  useEffect(() => {
    isDisable[1](true);
    const apiCLient = ApiClient.initFromStorage();
    apiCLient?.fetchCategories()
      .then(x => setCategories(x.data.datas))
      .then(_ => isDisable[1](false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>
    <form onSubmit={async e => {
      e.preventDefault();
      notifCtx?.addNotification({ message: "Creating Product...", type: "warn" });
      isDisable[1](true);
      const apiClient = ApiClient.initFromStorage();
      try {
        await apiClient?.fetch("products", "POST", formSubmit[0]);
        notifCtx?.addNotification({ message: "Success Creating Product!", type: "success" });
        formSubmit[1]({
          name: "",
          price: 0,
          quantityInStock: 0,
          description: "",
          categoryId: "",
        });
      } catch (e) {
        notifCtx?.addNotification({ message: (e as Error).message, type: "danger" });
      }
      isDisable[1](false);
      refreshProduct();
    }} className="flex flex-row gap-2">
      <div className="w-2/5 h-[19.4rem] overflow-hidden flex justify-center items-center rounded-md border-2 bg-red-400 relative group">
        <label className="inset-0 w-full h-full bg-slate-800 bg-opacity-50 absolute group-hover:flex hidden justify-center items-center">
          <span>Add Image</span>
          <input
            type="file"
            hidden
            required
            onChange={async e => {
              isDisable[1](true);
              const apiClient = ApiClient.initFromStorage();
              const url = await apiClient?.uploadImage(e.target.files![0]);
              if (url) formSubmit[1](x => ({ ...x, description: url }));
              isDisable[1](false);
            }}
            disabled={isDisable[0]} />
        </label>
        {
          formSubmit[0].description.length
            ? <img
              src={formSubmit[0].description}
              alt={formSubmit[0].name}
              className="min-w-full min-h-full flex-grow-0 flex-shrink-0" />
            : <span>Add Image</span>
        }
      </div>
      <div className="flex flex-col gap-2 w-3/5">
        <div className="p-2 border-2 flex flex-col rounded-md gap-2 bg-slate-800">
          <label>Name</label>
          <input
            type="text"
            value={formSubmit[0].name}
            disabled={isDisable[0]}
            onChange={e => formSubmit[1](x => ({ ...x, name: e.target.value }))}
            className="bg-transparent outline-none border-b-2"
            required
          />
          <label>Price</label>
          <input
            type="text"
            value={numToPrice(formSubmit[0].price).replace(",00", "")}
            disabled={isDisable[0]}
            onChange={e => {
              const value = e.target.value.slice(3).replaceAll(".", "");
              let converted = parseInt(value, 10);
              if (isNaN(converted)) converted = 0;
              formSubmit[1](x => ({ ...x, price: converted }));
            }}
            className="bg-transparent outline-none border-b-2"
            required
          />
          <label>QTY</label>
          <input
            type="number"
            value={formSubmit[0].quantityInStock}
            disabled={isDisable[0]}
            onChange={e => formSubmit[1](x => ({ ...x, quantityInStock: parseInt(e.target.value, 0) }))}
            className="bg-transparent outline-none border-b-2"
            required
          />
          <label>Chose Category</label>
          <select
            required
            className="bg-transparent appearance-none border-b-2 focus:outline-none"
            disabled={isDisable[0]}
            onChange={e => formSubmit[1](x => ({ ...x, categoryId: e.target.value }))}>
            {categories.map(x => <option className="bg-slate-800 outline-none border-none hover:bg-red-400" value={x.id}>{x.name}</option>)}
          </select>
        </div>
        <button
          type="submit"
          disabled={isDisable[0]}
          className="rounded-md border-2 flex justify-center active:scale-95 transition-transform bg-green-500"
        >
          {
            isDisable[0]
              ? <span><LoadingIcon /></span>
              : <span>Create</span>
          }
        </button>
      </div>
    </form>
  </div>
}

const Products: FC<{}>
  = () => {
    const notifCtx = useContext(NotificationContext);
    const [productList, setProductList] = useState([] as ProductType[]);
    const changeProduct = (index: number) => {
      return <K extends keyof ProductType>(key: K, value: ProductType[K]) => {
        productList[index][key] = value;
        setProductList([...productList]);
      }
    }

    const updateProduct = (index: number) => {
      const product = productList[index];
      return async () => {
        notifCtx?.addNotification({ message: "Updating...", type: "warn" });
        const apiClient = ApiClient.initFromStorage();
        try {
          await apiClient?.fetch("products/" + product.id, "PUT", {
            name: product.name,
            description: product.image,
            quantityInStock: product.qty,
            price: product.price
          });
          notifCtx?.addNotification({ message: "Success Updating", type: "success" });
        } catch (e) {
          notifCtx?.addNotification({ message: (e as Error).message, type: "danger" });
        }
      }
    }

    const deleteProduct = (index: number) => {
      const product = productList[index];
      return async () => {
        notifCtx?.addNotification({ message: "Deleting...", type: "warn" });
        const apiClient = ApiClient.initFromStorage();
        try {
          await apiClient?.fetch("products/" + product.id, "DELETE");
          setProductList(x => x.filter(y => y.id !== product.id));
          notifCtx?.addNotification({ message: "Success Deleting", type: "success" });
        } catch (e) {
          notifCtx?.addNotification({ message: (e as Error).message, type: "danger" });
        }
      }
    }

    const refreshProduct = () => {
      const apiClient = ApiClient.initFromStorage();
      apiClient?.fetchMyProducts(1, 100).then(x => {
        setProductList(x.data.datas.map(x => ({
          id: x.id,
          qty: x.quantityInStock,
          name: x.name,
          image: x.description,
          price: x.price
        }) as ProductType));
      })
    }

    useEffect(() => {
      refreshProduct();
    }, []);

    return <div className="flex flex-row gap-4 max-lg:flex-col-reverse max-lg:items-end p-2 min-h-[calc(100vh_-_61.6px)]">
      <div className="flex-col flex gap-2 w-1/2 max-lg:w-full min-h-screen">
        {productList.map((x, i) => <Product
          product={x}
          change={changeProduct(i)}
          remove={deleteProduct(i)}
          update={updateProduct(i)} />)}
      </div>
      <div className="w-1/2 max-lg:w-full sticky top-20">
        <div className="sticky top-20 bottom-0 overflow-hidden flex gap-2 flex-col">
          <label htmlFor="pop-button" className="rounded-md border-2 px-2 hover:cursor-pointer text-center bg-slate-800 lg:hidden">Show Create</label>
          <input type="checkbox" id="pop-button" hidden />
          <div className="pop-modal lg:block">
            <CreateProduct refreshProduct={refreshProduct} />
          </div>
        </div>
      </div>
    </div>;
  };

export default Products;
