import type { Album, User } from './types';

// TODO: implement the function using the rest apis:
// users: https://jsonplaceholder.typicode.com/users
// albums: https://jsonplaceholder.typicode.com/albums

const BASE_URL = 'https://jsonplaceholder.typicode.com';
// export function fetchAlbums(): Promise<Album[]> {
//   const user1: User = {
//     id: 1,
//     name: 'user1',
//   };
//   const user2: User = {
//     id: 2,
//     name: 'user2',
//   };

//   const albums = [
//     {
//       id: 1,
//       user: user1,
//       title: 'album1',
//     },
//     {
//       id: 2,
//       user: user1,
//       title: 'album2',
//     },
//     {
//       id: 3,
//       user: user2,
//       title: 'album3',
//     },
//   ];

//   return new Promise((resolve) => setTimeout(() => resolve(albums), 2000));
// }

export const fetchAlbums = async (): Promise<Album[]> => {
  try {
    const [usersResponse, albumsResponse] = await Promise.all([
      fetch(`${BASE_URL}/users`).then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch users: ${res.statusText}`);
        return res.json();
      }),
      fetch(`${BASE_URL}/albums`).then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch albums: ${res.statusText}`);
        return res.json();
      }),
    ]);

    const albums = albumsResponse.map((album) => {
      const user = usersResponse.find((user) => user.id === album.userId);
      return {
        ...album,
        user,
      };
    });

    return albums;
  } catch (error) {
    console.error('Failed to fetch albums:', error);
    return [];
  }
};
