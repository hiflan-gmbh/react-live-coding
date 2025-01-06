import React, { FC } from 'react';
import { Album } from './types';

interface AlbumListProps {
  albums: Album[];
  searchQuery: string;
}

const AlbumList: FC<AlbumListProps> = ({ albums, searchQuery }) => {
  const filterAlbums = (albums) => {
    if (searchQuery) {
      return albums.filter((album) => album.title.includes(searchQuery));
    }
    return albums;
  };
  const groupedAlbums = () => {
    const groupedAlbums = {};
    const filteredAlbums = filterAlbums(albums);
    for (let album of filteredAlbums) {
      const { user } = album;
      if (!groupedAlbums[user.name]) {
        groupedAlbums[user.name] = [];
      }
      groupedAlbums[user.name].push(album);
    }
    return groupedAlbums;
  };
  let albumsGrouped = groupedAlbums();
  const users = Object.keys(groupedAlbums());

  return (
    <section>
      {users.map((user, index) => {
        return (
          <ul key={index}>
            <h3>{user}</h3>
            {albumsGrouped[user].map((album) => {
              return (
                <li
                  key={album.id}
                  style={{ listStyle: 'none', marginLeft: '20px' }}
                >
                  {album.title}
                </li>
              );
            })}
          </ul>
        );
      })}
    </section>
  );
};

export default AlbumList;
