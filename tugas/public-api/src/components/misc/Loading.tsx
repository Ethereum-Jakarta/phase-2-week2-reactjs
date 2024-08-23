import React, { useEffect, useState } from "react";

const wait = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

const messages = async (setMessage:React.Dispatch<React.SetStateAction<string>> ) => {
  await wait(5_000);
  setMessage("This take sometimes");
  await wait(5_000);
  setMessage("Please Check Your Internet Connection");
}
export const LoadingContainer: React.FC<{}> = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    messages(setMessage);
  }, []);
  return (
    <div className="loading">
      <LoadingSpinner />
      <h1>{message}</h1>
    </div>
  );
}

export const LoadingSpinner: React.FC<{}>
= () => (
  <div className="lds-roller">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
