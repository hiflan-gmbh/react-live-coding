/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import './styles.css';
import SuggestionList from './SuggestionList';
import debounce from 'lodash/debounce';

type Suggestion<T = Record<string, unknown>> = T;

interface AutoCompleteProps<T = Record<string, unknown>> {
  placeholder?: string;
  staticData?: [];
  dataKey?: string;
  fetchSuggestions: (query: string) => Promise<Suggestion<T>[]>;
  onSelect?: (value: Suggestion<T> | string) => void;
  customLoading: React.ReactNode;
}
const AutoComplete = ({
  placeholder = 'Search',
  staticData,
  dataKey = '',
  fetchSuggestions,
  onSelect = () => {},
  customLoading = <>Loading..</>,
  ...props
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    // onChange(value);
  };

  const getSuggestions = async (query: string) => {
    setLoading(true);
    try {
      let results;
      if (staticData) {
        results = staticData.filter((item: string) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else {
        results = await fetchSuggestions(query);
      }
      setSuggestions(results);
    } catch (err) {
      setError('Failed to fetch data');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleOnSelect = (suggestion: Record<string, unknown> | string) => {
    let suggestionValue: string;
    if (
      typeof suggestion === 'object' &&
      suggestion !== null &&
      dataKey in suggestion
    ) {
      suggestionValue = suggestion[dataKey] as string;
    } else {
      suggestionValue = suggestion as string;
    }
    setInputValue(suggestionValue);
    onSelect(suggestion);
  };
  return (
    <div className="container">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputValue}
        {...props}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list">
          {loading && <div className="loading">{customLoading}</div>}
          {error && <div className="error">{error}</div>}
          <SuggestionList
            suggestions={suggestions}
            onSelect={handleOnSelect}
            dataKey={dataKey}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
