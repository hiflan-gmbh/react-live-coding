import AutoComplete from './components/AutoComplete';
import './App.css';

// https://dummyjson.com/recipes/search?q

function App() {
  const fetchSuggestions = async (query: string) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error('Network Error!');
    }
    const results = await response.json();
    return results.recipes;
  };

  // const onChange = (value: string) => {
  //   console.log(value);
  // };
  return (
    <>
      <AutoComplete
        placeholder={'Type recipe name'}
        dataKey={'name'}
        fetchSuggestions={fetchSuggestions}
        onSelect={(res) => console.log('payload', res)}
        customLoading={<>Loading...</>}
      />
    </>
  );
}

export default App;
