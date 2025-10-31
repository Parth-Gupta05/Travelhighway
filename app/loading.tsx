export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-[#FFD643] border-t-transparent animate-spin"></div>
        {/* Loading text */}
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
          Loading amazing experiences...
        </p>
      </div>
    </div>
  );
}