import { FeedList } from "@/features/feed/ui/FeedList";

export default function FeedPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 py-4 px-4">
      <FeedList />
    </div>
  );
}
