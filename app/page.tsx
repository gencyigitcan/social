import { getDb } from "@/lib/db";
import { SocialCard } from "@/components/social-card";
import { HeaderActions } from "@/components/header-actions";
import Image from "next/image";

export const revalidate = 0; // Ensure fresh data on every request for now

export default async function Home() {
  const db = await getDb();
  const { settings, platforms } = db;

  // Sort: Active first, then by order
  // Actually usually just by order. Let's trust the 'order' field.
  const sortedPlatforms = [...platforms]
    .sort((a, b) => a.order - b.order)
    .filter(p => p.status !== 'hidden');

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center selection:bg-cyan-500/20 relative">
      <HeaderActions />



      {/* Profile Header */}
      <div className="w-full max-w-7xl px-4 flex flex-col items-center mt-20 relative z-10 mb-12 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {settings.avatar && (
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background shadow-2xl bg-neutral-800">
            <Image
              src={settings.avatar}
              alt={settings.siteName}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="text-center max-w-xl space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{settings.siteName}</h1>
          <p className="text-neutral-400 text-lg">{settings.description}</p>
        </div>
      </div>

      {/* Grid Container */}
      {/* 
         Desktop: 4 columns (grid-cols-4)
         Tablet: 2 columns (grid-cols-2)
         Mobile: 1 column (grid-cols-1)
         
         Max width constraints to keep "9:16" cards reasonable size.
      */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-20">
        {sortedPlatforms.map((platform) => (
          <SocialCard key={platform.id} platform={platform} userSettings={settings} />
        ))}
      </div>

      <footer className="mt-auto text-neutral-600 text-sm py-8">
        <p>© {new Date().getFullYear()} {settings.siteName}</p>
      </footer>
    </main>
  );
}
