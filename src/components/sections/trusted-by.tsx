import Marquee from '@/components/magicui/marquee';
import Image from 'next/image';
import LogosSvg from '/public/logos.svg';

const companies = [
  { name: 'Revai', image: '/Revai.webp' },
  { name: 'Trudy', image: '/trudy.webp' },
  { name: 'Allheartz', image: '/allheartz.webp' },
  { name: 'Topflight apps', image: '/topflightapps.png' },
  { name: 'Riot Games', image: '/riot.webp' },
  { name: 'AVM', image: '/avmlogo.webp' },
  { name: 'AWS', image: '/aws.webp' },
  { name: 'Mercado Libre', image: '/mp.webp' },
  { name: 'Lil Horse', image: '/lilhorse.webp' },
];

export default function TrustedBy({
  staticVersion = false,
}: {
  staticVersion?: boolean;
}) {
  if (staticVersion) {
    return (
      <div className="container mb-20 mt-20 flex items-center justify-center">
        <Image
          width={1200}
          height={200}
          src={`/logos.svg`}
          alt={`Logos Logo`}
        />
      </div>
    );
  }
  return (
    <section id="logos">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <h3 className="text-center text-sm font-semibold text-gray-500">
          TRUSTED BY COMPANIES ALL OVER THE WORLD
        </h3>
        <div className="relative mt-6">
          <Marquee className="max-w-full [--duration:40s]">
            {companies.map((company, idx) => (
              <Image
                key={idx}
                width={120}
                height={60}
                src={company.image}
                className="mx-8 h-12 w-auto max-w-[120px] object-contain"
                alt={company.name}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
}
