import { render, screen } from '@testing-library/react';
import { MovieCard } from '../MovieCard';
import { Movie } from '@/app/lib/tmdb';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

const mockMovie: Movie = {
  id: 950387,
  title: "A Minecraft Movie",
  original_title: "A Minecraft Movie",
  poster_path: "/yFHfHcUgAxxZ1PZZOzqpUeHtCN4.jpg",
  backdrop_path: "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
  overview: "Four miners find themselves struggling with challenges.",
  release_date: "2025-03-31",
  vote_average: 6.064,
  vote_count: 445,
  adult: false,
  genre_ids: [10751, 35, 12, 14],
  original_language: "en",
  popularity: 900.608,
  video: false
};

describe('MovieCard', () => {
  it('renders basic movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('A Minecraft Movie')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('★ 6.1')).toBeInTheDocument();
  });

  it('renders movie poster with correct attributes', () => {
    render(<MovieCard movie={mockMovie} />);
    const image = screen.getByAltText('A Minecraft Movie');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('/yFHfHcUgAxxZ1PZZOzqpUeHtCN4.jpg'));
  });

  it('renders placeholder image when poster_path is null', () => {
    const movieWithoutPoster = {
      ...mockMovie,
      poster_path: null
    };
    render(<MovieCard movie={movieWithoutPoster} />);
    const image = screen.getByAltText('A Minecraft Movie');
    expect(image).toHaveAttribute('src', expect.stringContaining('/placeholder.png'));
  });

  it('truncates long movie titles', () => {
    const movieWithLongTitle = {
      ...mockMovie,
      title: 'This is a very long movie title that should be truncated in the display'
    };
    render(<MovieCard movie={movieWithLongTitle} />);
    const titleElement = screen.getByText('This is a very long movie title that should be truncated in the display');
    expect(titleElement).toHaveClass('truncate');
  });

  it('formats vote average to one decimal place', () => {
    const movieWithLongDecimal = {
      ...mockMovie,
      vote_average: 7.89123
    };
    render(<MovieCard movie={movieWithLongDecimal} />);
    expect(screen.getByText('★ 7.9')).toBeInTheDocument();
  });
}); 