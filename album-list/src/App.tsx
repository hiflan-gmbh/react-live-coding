import React, { useState, useEffect } from 'react';
import AlbumList from './AlbumList';
import Loading from './Loading';
import { fetchAlbums } from './api';
import { Album } from './types';
import './App.css';

function App() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    try {
      setLoading(true);
      fetchAlbums().then((data) => {
        setAlbums(data);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="App">
      <div>
        Filter:
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AlbumList albums={albums} searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default App;

//TODO:
// 1. using the "fetchAlbums" function, save the albums in the "albums" state
// 2. implement the "AlbumList" component to render the albums list
// 3. using the text input filter the albums by title
// 4. implement the "fetchAlbums" function following the instructions in the "api.ts" file
