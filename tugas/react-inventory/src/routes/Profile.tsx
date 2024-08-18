import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiClient from "../lib/api";
import PencilIcon from "../lib/icons/outline/Pencil";
import XIcon from "../lib/icons/outline/XIcon";
import LogoutIcon from "../lib/icons/outline/LogoutIcon";
import LoadingIcon from "../lib/icons/outline/LoadingIcon";
import { pickBgColorBasedOnString } from "../lib/utils";
import { LoginInformationContext, NotificationContext } from "../lib/contexes";
import { cdn } from "../lib/constants";

const VerifyButton: FC<{
  verified: boolean;
  onClick: () => unknown;
}>
  = ({ verified, onClick }) =>
    verified
      ? <button className="text-xs rounded-md border-green-400 border-2 text-green-400 px-1" disabled>Verified</button>
      : <button
        className="text-xs rounded-md border-red-400 border-2 text-red-400 px-1 active:scale-95 transition"
        onClick={_ => onClick()}
      >Verify now!</button>;

const ProfileImage: FC<{ children: JSX.Element, isAdmin: boolean }>
  = ({ children, isAdmin }) =>
    isAdmin
      ? <div className="relative">
        <div className="absolute bottom-[-1rem] right-0 left-0 flex justify-center animate-slideup [animation-duration:4s]">
          <span className="text-xs p-1 text-red-400 rounded-lg text-center bg-slate-800 shadow-slate-800 shadow-md border-2 border-red-400 z-10">im superuser!</span>
        </div>
        <div className="rounded-lg overflow-hidden shadow-slate-800 shadow-lg border-4 border-red-400">{children}</div>
      </div>
      : <div className="rounded-lg overflow-hidden shadow-slate-800 shadow-lg flex justify-center items-center border-4 border-slate-800">{children}</div>;

const LogoutButton: FC<{ email: string; onCLick: () => unknown }> = ({ email, onCLick }) => {
  const [content, setContent] = useState(<span className="text-red-400"><LogoutIcon /></span> as JSX.Element);
  const navigate = useNavigate();

  const listener = async () => {
    onCLick();
    setContent(<LoadingIcon />);
    await ApiClient.logout(email);
    setContent(<span className="text-red-400"><LogoutIcon /></span>);
    navigate("/");
  }
  return <button onClick={_ => listener()}>{content}</button>
}

const Profile: FC<{}> = () => {
  const ctxNotif = useContext(NotificationContext);
  const ctx = useContext(LoginInformationContext);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");
  const [modalEditDisable, setModalEditDisable] = useState(false);
  const [profileUpload, setProfileUpload] = useState(null as null | File);
  const [profileUploadDisable, setProfileUploadDisable] = useState(false);

  const self = ctx?.self;

  useEffect(() => {
    setDisplayName(self?.name ?? "");
    setDisplayEmail(self?.email ?? "");
  }, [self]);

  useEffect(() => {
    if (!profileUpload) return;
    setProfileUploadDisable(true);
    ctxNotif?.addNotification({ message: "Uploading...", type: "warn" });
    const apiClient = ApiClient.initFromStorage();
    const form = new FormData();
    form.append("file", profileUpload);
    apiClient
      ?.fetch("upload/setprofile", "POST", form)
      .then(async _ => {
        await ctx?.fetchSelft();
        ctxNotif?.addNotification({ message: "Profile Image Updated", type: "success" });
        setProfileUploadDisable(false);
      }).catch(e => {
        ctxNotif?.addNotification({ message: (e as Error).message, type: "danger" });
        setProfileUploadDisable(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUpload]);

  const profileImage = !self?.profileImageId
    ? <div className={`${pickBgColorBasedOnString(self?.name ?? "a")} w-[128px] h-[128px] text-slate-50 text-center align-middle flex justify-center items-center`}>
      <span className="text-[128px] font-bold">{(self?.name ?? "A").charAt(0)}</span>
    </div>
    : <div className="flex justify-center items-center h-[128px] w-[128px]">
      <img className="flex-shrink-0 min-h-full min-w-auto min-w-full" src={`${cdn}${self?.profileImageId!}`} alt={self?.name + " profile"} />
    </div>;

  const modalEditClick = async (_: void) => {
    setModalEditDisable(true);
    if (!displayName.length && !displayPassword.length && !displayEmail.length) return;
    ctxNotif?.addNotification({ message: "Editing...", type: "warn" });
    const apiClient = ApiClient.initFromStorage();
    try {
      await apiClient?.editProfile(
        displayName,
        displayEmail,
        displayPassword.length
          ? displayPassword
          : undefined);
      ctxNotif?.addNotification({ type: "success", message: "Profile Updated" });
      ctx?.fetchSelft();
    } catch (e) {
      ctxNotif?.addNotification({ type: "danger", message: (e as Error).message });
    }
    setModalEditDisable(false);
  }

  const emailVerify = async () => {
    ctxNotif?.addNotification({ message: "Sending verification email...", type: "warn" });
    const apiClient = ApiClient.initFromStorage();
    try {
      await apiClient?.fetch("self/verify", "POST", { link: "http://127.0.0.1:3000/verify?token=$TOKEN" });
      ctxNotif?.addNotification({ message: "Success Sending verification email!", type: "success" });
    } catch (e) {
      ctxNotif?.addNotification({ message: (e as Error).message, type: "danger" });
    }
  }

  return self
    ? <div className="w-fit h-fit bg-opacity-95 rounded-lg">
      <div className="h-52 relative flex justify-center items-end w-96 shadow-slate-800 shadow-lg overflow-hidden rounded-lg">
        <img className="min-h-full min-w-full shrink-0 w-auto h-auto grow" src="https://png.pngtree.com/thumb_back/fh260/background/20230416/pngtree-sky-manga-style-background-image_2371262.jpg" alt="bg" />
        <div className="absolute h-full w-full bg-slate-800 bg-opacity-50 flex flex-row items-center gap-2 justify-center p-2">
          <div className="animate-slideup relative">
            <ProfileImage isAdmin={self.role === "Admin"}>{profileImage}</ProfileImage>
            <label htmlFor="upload-file" className="group bg-slate-800 hover:bg-opacity-50 bg-opacity-0 absolute inset-0 transition-colors m-1 flex justify-center items-center">
              <span className="group-hover:opacity-100 opacity-0 text-center">{profileUploadDisable ? "Uploading.." : "Change profile picture"}</span>
              <input className="hidden" type="file" id="upload-file" onChange={e => setProfileUpload(e.target.files![0])} disabled={profileUploadDisable} />
            </label>
          </div>
          <div className="flex flex-col shadow-slate-800 shadow-lg p-2 rounded-lg bg-slate-800 relative animate-slideup [animation-duration:2s]">
            <button onClick={_ => setShowModalEdit(!showModalEdit)} className="absolute top-[-2.2rem] right-0 bg-slate-800 rounded-t-lg p-2 text-yellow-400">
              {
                showModalEdit
                  ? <span><XIcon /></span>
                  : <PencilIcon />
              }
            </button>
            <span className="absolute top-[-2.2rem] right-12 bg-slate-800 rounded-t-lg p-2 text-red-400">
              <LogoutButton email={self.email} onCLick={() => ctx?.setSelf(null)} />
            </span>
            <h1 className="text-2xl border-b-2 w-fit">{displayName}</h1>
            <h2><span className="italic text-sm">{displayEmail}</span> <VerifyButton verified={self.isEmailVerified} onClick={emailVerify} /></h2>
          </div>
        </div>
      </div>
      <div className={showModalEdit ? "animate-slidedown" : "hidden"}>
        <form onSubmit={e => modalEditClick(e.preventDefault())} className="flex flex-col p-2 bg-slate-800 shadow-slate-800 shadow-lg rounded-lg">
          <label>Username</label>
          <input className="bg-transparent outline-none border-b-2" type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} disabled={modalEditDisable} /><br />
          <label>Email</label>
          <input className="bg-transparent outline-none border-b-2" type="email" value={displayEmail} onChange={e => setDisplayEmail(e.target.value)} disabled={modalEditDisable} /><br />
          <label>Password</label>
          <input className="bg-transparent outline-none border-b-2" type="password" value={displayPassword} onChange={e => setDisplayPassword(e.target.value)} disabled={modalEditDisable} /><br />
          <button className="bg-green-400 active:scale-95 transition flex justify-center" disabled={modalEditDisable}>{modalEditDisable ? <LoadingIcon /> : "Edit"}</button>
        </form>
      </div>
    </div>
    : <div className="w-96 h-52 flex justify-center items-center relative rounded-md overflow-hidden">
      <div className="bg-gray-400 w-full h-full animate-pulse"></div>
      <div className="bg-slate-800 w-4/5 h-4/5 absolute inset-0 m-auto rounded-md p-2">
        <div className="w-full h-full flex flex-col justify-center items-center gap-1">
          <div className="bg-gray-400 w-24 h-24 rounded-full animate-pulse"></div>
          <span className="text-2xl"><Link to="/login">login</Link></span>
        </div>
      </div>
    </div>;
}

export default Profile;
