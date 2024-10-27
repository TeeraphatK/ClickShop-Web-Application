
export default function Footer() {
  return (
    <footer className="p-4 text-white bg-gray-800">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Store Teeraphat Kanpong.</p>
        <div className="flex justify-center space-x-4">
        </div>
      </div>
    </footer>
  );
}
