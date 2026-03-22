import HeaderSkeleton from "@/components/ui/header-skeleton";
import HeroSkeleton from "@/components/ui/hero-skeleton";

export default function Loading() {
  return (
    <main className="relative min-h-screen bg-base-100">
      <HeaderSkeleton />
      <HeroSkeleton />
    </main>
  );
}
