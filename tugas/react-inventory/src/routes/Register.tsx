import { FC, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiClient from "../lib/api";
import LoadingIcon from "../lib/icons/outline/LoadingIcon";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

let keshoMessage = <span className="text-green-400">Lets Register!</span>;

const Register: FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [keshoSpeak, setKeshoSpeak] = useState(<></>);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = !email.length ? true : emailRegex.test(email);
  const isPasswordvalid = !password.length ? true : passwordRegex.test(password);

  const formHandle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.length || !isEmailValid) keshoMessage = <span className="text-red-400">Email must be included!</span>;
    else if (!password.length || !isPasswordvalid) keshoMessage = <span className="text-red-400">Password must be included!</span>;
    else if (!name.length) keshoMessage = <span className="text-red-400">Name must be included!</span>;
    else {
      keshoMessage = <div className="flex gap-2"><LoadingIcon /><span className="text-yellow-400">Please Wait!</span></div>
      setDisabled(true);
      setKeshoSpeak(keshoMessage);
      try {
        await ApiClient.register(name, email, password);
        keshoMessage = <span className="text-green-400">Register Success!</span>;
        setTimeout(() => navigate("/"), 1_000);
      } catch (e) {
        const error = e as Error;
        keshoMessage = <span className="text-red-400">{error.message}</span>;
      }
      setDisabled(false);
    }
    setKeshoSpeak(keshoMessage);
  }

  useEffect(() => {
    if (!isEmailValid && email.length) setKeshoSpeak(<span className="text-red-400">email must contain '@' and 'dot'</span>);
    else if (!isPasswordvalid && password.length) setKeshoSpeak(<span className="text-red-400">Password minimum 8 characters, at least one letter, and one number</span>);
    else setKeshoSpeak(keshoMessage);
  }, [email, password, isEmailValid, isPasswordvalid]);

  return <div className="bg-slate-800 h-screen flex items-center font-mono flex-col w-screen overflow-hidden">
    <main className="relative rounded border-slate-50 border-2 p-2 h-fit mt-96 w-fit">
      <div className="absolute top-[-10rem] w-72 border-slate-50 border-2 text-slate-50 p-2 left-0 rounded-md flex overflow-x-auto max-h-32">
        {keshoSpeak}
      </div>
      <div className="absolute right-0 top-[-11rem] flex flex-row">
        <img src="https://listen.moe/images/girls/platelet.png" alt="keshoban" />
      </div>
      <form className="flex flex-col gap-3 text-slate-50 w-96" onSubmit={formHandle}>
        <div>
          <label>Name</label><br />
          <input onInput={e => setName(e.currentTarget.value)} className={`w-full bg-slate-800 outline-none border-b-2 ${name.length ? "border-b-green-400" : "border-b-slate-50"}`} type="text" disabled={disabled} placeholder="beautiful name" required /><br />
        </div>
        <div>
          <label>Email</label><br />
          <input onInput={e => setEmail(e.currentTarget.value)} className={`w-full bg-slate-800 outline-none border-b-2 ${isEmailValid ? email.length ? "border-b-green-400" : "border-b-slate-50" : "border-b-red-400"}`} type="email" disabled={disabled} placeholder="e.g. user@example.com" required /><br />
        </div>
        <div>
          <label>Password</label><br />
          <input onInput={e => setPassword(e.currentTarget.value)} className={`w-full bg-slate-800 outline-none border-b-2 ${isPasswordvalid ? password.length ? "border-b-green-400" : "border-b-slate-50" : "border-b-red-400"}`} type={displayPassword ? "text" : "password"} disabled={disabled} placeholder="secret" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" required />
        </div>
        <div>
          <label>retype the password</label><br />
          <input onInput={e => setRePassword(e.currentTarget.value)} className={`w-full bg-slate-800 outline-none border-b-2 ${rePassword.length ? rePassword === password ? "border-b-green-400" : "border-b-red-400" : "border-b-slate-50"}`} type={displayPassword ? "text" : "password"} disabled={disabled} placeholder="secret" pattern={password} required />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="bg-rose-400" onClick={_ => setDisplayPassword(!displayPassword)} />
          <label><small>Display password</small></label>
        </div>
        <div>
          <button type="submit" className="flex justify-center rounded-md text-green-400 border-2 border-green-400 w-full py-1 hover:bg-green-400 bg-opacity-95 hover:text-slate-50 transition active:scale-95" disabled={disabled}>
            {disabled ? <LoadingIcon /> : "Register"}
          </button>
        </div>
      </form>
    </main>
    <footer className="mt-4 text-slate-50">
      Have account ? <Link to="/login" className="text-sky-500">Try login</Link>
    </footer>
  </div>
}

export default Register;
