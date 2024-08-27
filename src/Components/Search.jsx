const SearchComponent = ({setSearchTerm}) => {

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;