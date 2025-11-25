import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  hasMore: boolean; // còn data để load nữa không
  isLoading: boolean; // đang load (tránh gọi chồng)
  onLoadMore: () => void; // hàm gọi khi cần load thêm
  rootMargin?: string; // optional: khoảng cách trigger
}

export function useInfiniteScroll<T extends HTMLElement>({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = "200px",
}: UseInfiniteScrollProps) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading && hasMore) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [hasMore, isLoading, onLoadMore, rootMargin]);

  return { sentinelRef: ref };
}
