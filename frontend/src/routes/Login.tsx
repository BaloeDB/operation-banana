import axios from "axios";
import { FormEvent } from "react"
import { useCookies } from "react-cookie";

export default function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
    
    async function sendLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let object = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());
        setCookie("accessToken", await axios.post("http://localhost:8080/api/v1/banana/user/login", object));
        location.assign("./");
    }

    return (
        <form id="login-form" onSubmit={sendLogin}>
            <h1>Login</h1>
            <p>
                <label>
                    Username:<br />
                    <input type="text" name="username" />
                </label>
            </p>
            <p>
                <label>
                    Password:<br />
                    <input type="password" name="password" />
                </label>
            </p>
            <p className="right">
                <button id="btn-login">Login</button>
            </p>
        </form>
    )
}