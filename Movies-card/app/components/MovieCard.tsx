import Image from 'next/image';
import { Movie, getImageUrl } from '../lib/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 h-full flex flex-col">
      <div className="relative h-[400px] w-full flex-shrink-0">
        <Image
          src={movie.poster_path ? getImageUrl(movie.poster_path) : '/placeholder.png'}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold truncate text-white">{movie.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-400">
            {new Date(movie?.release_date).getFullYear()}
          </span>
          <span className="text-sm font-medium text-yellow-400">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}; 