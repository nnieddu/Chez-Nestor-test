export default function Loading() {
  return (
    <div className="border relative py-28">
      <h2 className="text-center font-bold tracking-tight  text-4xl sm:text-6xl">
        Chargement
      <div
        className="ml-8 inline-block h-8 w-8 sm:h-14 sm:w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
      </h2>
    </div>
  );
}
