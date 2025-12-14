'use client';
import Image from 'next/image';
import { useUIView } from '@/stores/useUIViewStore';

function Logo() {
  const { showHomeView } = useUIView();

  return (
    <div
      className="flex flex-row justify-center items-center gap-2"
      onClick={showHomeView}
    >
      <Image
        src="/images/logo.webp"
        alt="Logo"
        width={32}
        height={32}
        loading="eager"
      />
      <p className="font-semibold text-2xl text-white">Chingu</p>
    </div>
  );
}

export default Logo;
