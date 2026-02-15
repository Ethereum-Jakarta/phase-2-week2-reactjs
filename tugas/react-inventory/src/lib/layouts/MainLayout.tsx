import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ApiClient from "../api";
import Footer from "../components/footers/Footer";
import Navbar from "../components/navigation/Navbar";
import { LoginInformationContext, NotificationContext } from "../contexes";
import { NotificationItems } from "../types";
import Notification from "./Notification";
import { LoginStatus } from "../constants";

const MainLayout: FC<{}> = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([] as NotificationItems[]);
  const [loginStatus, setLoginStatus] = useState(LoginStatus.Fetching as LoginStatus);
  const [self, setSelf] = useState(null as Awaited<ReturnType<ApiClient["fetchProfile"]>>["data"] | null);

  const fetchSelft = async () => {
    const apiClient = ApiClient.initFromStorage();
    if (!apiClient) return navigate("/login");
    try {
      const response = await apiClient?.fetchProfile()
      if (!response) return setLoginStatus(LoginStatus.NotLogged);
      setLoginStatus(LoginStatus.Login);
      setSelf(response.data);
    } catch (e) {
      if ((e as Error).message === "must login") return navigate("/login");
      throw e;
    }
  }

  useEffect(() => {
    fetchSelft();
  }, []);

  const addNotification = (item: Omit<NotificationItems, "timestamp">) => {
    const now = Date.now();
    setNotifications([{ ...item, timestamp: now }, ...notifications]);
    setTimeout(() => setNotifications(x => x.filter(y => y.timestamp !== now)), 3_000);
  }

  return <>
    <LoginInformationContext.Provider value={{ fetchSelft, loginStatus, self, setSelf, setLoginStatus }}>
      <NotificationContext.Provider value={{ addNotification, items: notifications }}>

        <div className="min-h-screen h-auto flex flex-col gap-2 bg-slate-800 text-slate-50 font-mono px-20 max-sm:px-2">
          <header className="sticky top-0 z-10 bg-slate-800 bg-opacity-95">
            <Navbar />
          </header>
          <main className="min-h-screen">
            <Outlet />
          </main>
          <footer className="mt-auto">
            <Footer />
          </footer>
        </div>

        <Notification />

      </NotificationContext.Provider>
    </LoginInformationContext.Provider>
  </>
}

export default MainLayout;
