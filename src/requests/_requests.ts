import { AxiosError, AxiosResponse } from "axios";
import Api from "./Api";
import { User } from "../models/User";

export const getAllUsers = async () => Api.get('users').then((d: AxiosResponse) => d.data).catch((error: AxiosError) => console.log('error', error.message));

export const getUserById = async (userId: number) => Api.get(`users/${userId}`).then((d: AxiosResponse) => d.data).catch((error: AxiosError) => console.log('error', error.message));

export const createUser = async (userDetails: User) => Api.post(`users`, userDetails).then((d: AxiosResponse) => d.data).catch((error: AxiosError) => console.log('error', error.message));

export const deleteUser = async (userId: number) => Api.delete(`users/${userId}`).then((d: AxiosResponse) => d.data).catch((error: AxiosError) => console.log('error', error.message));

export const updateUser = async (userId: number, userDetails: User) => Api.patch(`users/${userId}`, userDetails).then((d: AxiosResponse) => d.data).catch((error: AxiosError) => console.log('error', error.message));
