import axios from 'axios';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined in environment variables');
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchMovies = async (
  query: string, 
  page: number = 1,
  filters: { year?: string; rating?: string; language?: string } = {}
): Promise<MovieResponse> => {
  try {
    const params: any = {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    };

    // Add filter parameters
    if (filters.year) {
      // Use primary_release_year for search/movie endpoint
      params.primary_release_year = filters.year;
    }
    if (filters.language) {
      // Use with_original_language parameter
      params.with_original_language = filters.language;
    }
    if (filters.rating) {
      // Use vote_average.gte for minimum rating
      params['vote_average.gte'] = filters.rating;
    }

    const { data } = await tmdbClient.get<MovieResponse>('/search/movie', { params });
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies');
  }
};

export const getPopularMovies = async (
  page: number = 1,
  filters: { year?: string; rating?: string; language?: string } = {}
): Promise<MovieResponse> => {
  try {
    const params: any = {
      page,
      language: 'en-US',
    };

    // Add filter parameters
    if (filters.year) {
      // Use primary_release_year for discover/movie endpoint
      params.primary_release_year = filters.year;
    }
    if (filters.language) {
      // Use with_original_language parameter
      params.with_original_language = filters.language;
    }
    if (filters.rating) {
      // Use vote_average.gte for minimum rating
      params['vote_average.gte'] = filters.rating;
    }

    // For popular movies with filters, we need to use the discover endpoint instead
    const endpoint = (filters.year || filters.language || filters.rating) 
      ? '/discover/movie' 
      : '/movie/popular';
    
    // Add sort_by parameter for discover endpoint
    if (endpoint === '/discover/movie') {
      params.sort_by = 'popularity.desc';
    }

    const { data } = await tmdbClient.get<MovieResponse>(endpoint, { params });
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw new Error('Failed to fetch popular movies');
  }
};

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder.png';
  return `https://image.tmdb.org/t/p/w500${path}`;
}; 