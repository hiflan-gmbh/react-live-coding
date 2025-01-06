export interface User {
  id: number;
  name: string;
}

export interface Album {
  id: number;
  user: User;
  title: string;
}
