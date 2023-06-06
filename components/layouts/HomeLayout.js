import Header from '../ui/Header';

export default function HomeLayout({ children }) {
  return (
    <div className="bg-stone-50">
      <Header />
      <main className="p-4 lg:px-8 grid gap-5 md:grid-cols-1 lg:grid-cols-1">
        {children}
      </main>
    </div>
  );
}
