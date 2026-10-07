import { writable } from 'svelte/store';
import { mockUsers } from './mockData';

const users = writable(mockUsers);

export const getUsers = () => {
  return users;
};

export const addUser = (user: {id: string; name: string; age: number;}) => {
  users.update((c) => {
    c.push(user);
    return c;
  });
};