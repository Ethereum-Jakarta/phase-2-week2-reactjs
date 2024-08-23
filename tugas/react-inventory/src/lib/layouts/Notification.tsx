import { FC, useContext } from "react";
import { NotificationToaster } from "../components/toaster/NotificationToaster";
import { NotificationContext } from "../contexes";

const Notification: FC<{}> = () => {
  const ctx = useContext(NotificationContext);

  return <div className="fixed bottom-2 right-2 w-96 flex flex-col-reverse gap-2">
    {
      ctx?.items.slice(0, 5).map(x => <NotificationToaster message={x.message} type={x.type}/>)
    }
  </div>
}

export default Notification;
