import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector(state => state.favorites);
  const favoritesCount = favorites.length;

  return (
    <>
      {favoritesCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold px-1.5 py-0 rounded-full">
          {favoritesCount}
        </span>
      )}
    </>
  );
};

export default FavoritesCount;