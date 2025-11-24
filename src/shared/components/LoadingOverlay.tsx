interface LoadingOverlayProps {
    show?: boolean
}

export function LoadingOverlay({ show = false }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
    </div>
  );
}
