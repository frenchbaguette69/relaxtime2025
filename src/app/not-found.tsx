import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Pagina niet gevonden</h1>
      <p className="text-lg text-gray-600 mb-6">Sorry, deze pagina bestaat niet of is verplaatst.</p>
      <Link
        href="/"
        className="bg-blue-950 text-white px-6 py-3 rounded-md text-lg"
      >
        Terug naar home
      </Link>
    </div>
  );
}
