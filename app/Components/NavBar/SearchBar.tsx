import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
function SearchBar() {
  return (
    <div className="flex items-center justify-between  border py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
    <div className="font-semibold text-sm px-6">Anywhere</div>
    <div className="hidden sm:block text-sm font-semibold border-x text-center px-6">Any Week</div>
    <div className="flex items-center text-sm text-gray-600 gap-3 px-6">
        <div className="hidden sm:block">Add Guests </div>
        <FontAwesomeIcon icon={faSearch} className="bg-rose-500 rounded-full text-white p-2" width={40} height={40}/>
    </div>
</div>

  )
}

export default SearchBar
