'use client';

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchBar } from './components/SearchBar';
import { MovieCard } from './components/MovieCard';
import { Pagination } from './components/Pagination';
import { FilterBar } from './components/FilterBar';
import { useMovies } from './hooks/useMovies';

const queryClient = new QueryClient();

function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    year: '',
    rating: '',
    language: '',
  });

  const { data, isLoading, error } = useMovies(searchQuery, currentPage, filters);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.year, filters.rating, filters.language, searchQuery]);

  const clearFilters = () => {
    setFilters({
      year: '',
      rating: '',
      language: '',
    });
    
    window.dispatchEvent(new Event('clearFilters'));
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-red-400">Error loading movies. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Movie Search</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={clearFilters}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Clear Filters
            </button>
          </div>
        </div>
        
        <FilterBar onFilterChange={setFilters} />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-[400px] bg-gray-700" />
                <div className="p-4">
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-700 rounded w-1/2 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {data?.results && data.results.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 auto-rows-fr">
                  {data.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={data.total_pages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center mt-12 p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 max-w-2xl mx-auto">
                <div className="text-6xl mb-4">🎬</div>
                <h2 className="text-2xl font-bold text-white mb-2">No Movies Found</h2>
                <p className="text-gray-300 text-center mb-6">
                  {data?.total_pages && data.total_pages > currentPage ? (
                    "We couldn't find any movies matching your current filters on this page. Try navigating to another page."
                  ) : (
                    "We couldn't find any movies matching your current filters."
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieSearch />
    </QueryClientProvider>
  );
}
