import { logIn } from "../../database/methods";

export async function log_in(login, password) {
    let [user] = await logIn(login, password);
    if (user) {
        localStorage.setItem('userID', user.id);
        return true;
    }
    else return false;
}