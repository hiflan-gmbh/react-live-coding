type Suggestion<T = Record<string, unknown>> = T;
interface SuggestionListProps<T = Record<string, unknown>> {
  suggestions: Suggestion<T>[] | [];
  dataKey: string;
  onSelect: (value: Suggestion<T> | string) => void;
}
const SuggestionList = ({
  suggestions,
  dataKey,
  onSelect,
}: SuggestionListProps) => {
  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = dataKey
          ? (suggestion[dataKey] as string)
          : (suggestion as unknown as string);
        return (
          <li
            key={index}
            onClick={() => onSelect(suggestion)}
            className="suggestion-item"
          >
            {currentSuggestion}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionList;
