'use client'
interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-6 min-h-screen text-center px-4">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-red-400">{error.message}</p>
      <button
        className="inline-block bg-accent-800 text-white py-3 px-6 text-lg rounded hover:bg-accent-700 transition"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
};

export default Error;
