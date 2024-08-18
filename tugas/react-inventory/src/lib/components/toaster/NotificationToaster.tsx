import { FC } from "react";
import { NotificationItems } from "../../types";

type NotificationToasterProps = {
  message: string;
  type: NotificationItems["type"];
  time?: number;
}

const getClassColors = (type: NotificationToasterProps["type"]) => {
  switch(type) {
    case "danger": return "text-red-400 shadow-red-400 border-red-400";
    case "warn": return "text-yellow-400 shadow-yellow-400 border-yellow-400";
    case "success": return "text-green-400 shadow-green-400 border-green-400";
  }
}

export const NotificationToaster: FC<NotificationToasterProps>
= ({ type, message }) => {
    return <div className={`${getClassColors(type)} p-2 rounded-lg font-semibold border-4 bg-slate-800 shadow-sm animate-slidedown`}>
      <div className="flex flex-row justify-start items-center gap-2">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </span>
        <span>{message}</span>
      </div>
    </div>
}
