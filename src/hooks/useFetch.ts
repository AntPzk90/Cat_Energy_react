import { useCallback, useState } from 'react';

type AsyncFn<Args extends unknown[], Result> = (...args: Args) => Promise<Result>;

/**
 * Оборачивает асинхронную функцию (обычно поход в api),
 * сам следит за isLoading и error, ничего не знает про стейт компонента.
 *
 * Пример:
 *   const [fetchQuestions, isLoading, error] = useFetch(api.get<Question[]>);
 *   const questions = await fetchQuestions('/questions');
 */
export function useFetch<Args extends unknown[], Result>(
  asyncFn: AsyncFn<Args, Result>,
): [AsyncFn<Args, Result | undefined>, boolean, Error | null] {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const wrappedFn = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      setError(null);
      try {
        return await asyncFn(...args);
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn],
  );

  return [wrappedFn, isLoading, error];
}
