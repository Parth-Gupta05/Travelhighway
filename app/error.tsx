'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-[87px] flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {error.message || 'Failed to load experiences'}
        </p>
        <button
          onClick={reset}
          className="bg-[#FFD643] text-black px-6 py-2 rounded-lg hover:bg-[#e6c13c] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}