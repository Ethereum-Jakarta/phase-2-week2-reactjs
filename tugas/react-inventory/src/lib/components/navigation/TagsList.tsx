import { FC, useState, useEffect } from "react";
import ApiClient from "../../api";
import LoadingIcon from "../../icons/outline/LoadingIcon";
import Tag from "../spans/Tag";

const TagsList: FC<{}> = () => {
  const [tagsList, setTagsList] = useState([] as { id: string; name: string; }[]);

  useEffect(() => {
    const apiCLient = ApiClient.initFromStorage();
    apiCLient?.fetchCategories()
      .then(x => setTagsList(x.data.datas));
  }, []);

  return <div className="flex flex-row gap-2 p-2 w-full overflow-auto">
    {tagsList.length ? tagsList.map(x => <Tag>{x.name}</Tag>) : <Tag><LoadingIcon /></Tag>}
  </div>;
}

export default TagsList;
