import React from 'react'
import SearchFormreset from './SearchFormreset';
import { Search } from 'lucide-react';

const SearchForm = ({query}:{query?:string }) => {
    
  return (
   <form action="/" className="search-form">
    <input type="text"
    name='query'
    placeholder='Search'
    defaultValue={query}
    className="search-input" />
    <div className="flex gap-2">
        {query && <SearchFormreset/>}
        <button type='submit' className="search-btn text-white">
            <Search className='size-5'/>
        </button>
    </div>
   </form>
  )
}

export default SearchForm