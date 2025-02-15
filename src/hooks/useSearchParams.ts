import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

interface MovieSearchParams {
  initialParams?: {
    initialSearch?: string;
    initialType?: string;
    initialYear?: string;
    initialPage?: number;
  };
}

export const useMovieSearchParams = ({ initialParams }: MovieSearchParams) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const hasNoParams = ![...searchParams.entries()].length;
    if (hasNoParams) {
      const newParams = new URLSearchParams();
      if (initialParams?.initialSearch)
        newParams.set('search', initialParams.initialSearch);
      if (initialParams?.initialType)
        newParams.set('type', initialParams.initialType);
      if (initialParams?.initialYear)
        newParams.set('year', initialParams.initialYear);
      if (initialParams?.initialPage)
        newParams.set('page', initialParams.initialPage.toString());
      setSearchParams(newParams);
    }
  }, []);

  const search = searchParams.get('search') || initialParams?.initialSearch;
  const type = searchParams.get('type') || initialParams?.initialType;
  const year = searchParams.get('year') || initialParams?.initialYear;
  const page = Number(searchParams.get('page')) || initialParams?.initialPage;

  const updateSearch = (newSearch: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('search', newSearch);
      newParams.set('page', '1');
      return newParams;
    });
  };

  const updateType = (newType: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('type', newType);
      newParams.set('page', '1');
      return newParams;
    });
  };

  const updateYear = (newYear: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('year', newYear);
      newParams.set('page', '1');
      return newParams;
    });
  };

  const updatePage = (newPage: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', newPage.toString());
      return newParams;
    });
  };

  return {
    search,
    type,
    year,
    page,
    updateSearch,
    updateType,
    updateYear,
    updatePage,
  };
};
