import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";


export default class UserServices {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }
};