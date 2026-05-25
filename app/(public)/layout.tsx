import { BookingProvider } from '@/components/providers/BookingProvider';
import TopNav from '@/components/layout/TopNav';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <div className="font-body-md selection:bg-secondary-container selection:text-on-secondary-container min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </BookingProvider>
  );
}
