import { getStorage, setStorage } from "../utils/storage";

const USER_NAME = "USER_NAME";
export const getUserName = () => getStorage(USER_NAME);
export const saveUserName = (name: string) => setStorage(USER_NAME, name);

PICKED_MULTIPLIERS;
