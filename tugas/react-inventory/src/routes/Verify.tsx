import { FC, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiClient from "../lib/api";

const Verify: FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying....");
  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  useEffect(() => {
    if (!token) return setMessage("No Token Provided!");
    ApiClient.verify(token)
      .then(x => {
        if (x.code === 200) return setMessage("Success verifying you can close this page!");
        return setMessage(x.message);
      });;
  }, [token]);
  return <div className="bg-slate-800 min-h-screen flex justify-center items-center">
    <span className={`border-2 p-2 rounded-md ${message.startsWith("Verify") ? "border-yellow-400 text-yellow-400" : message.startsWith("Success") ? "border-green-400 text-green-400" : "border-red-400 text-red-400"}`}>
      {message}
    </span>
  </div>
}

export default Verify;
