import { getCharacter } from '@/api/api';
import { eva } from '@/types/character';
import { JikanCharacter } from '@/types/jikanResponse';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import LoadingDos from './LoadingDos';

function SectionDos({ id, index, evaId }: { id: number; index: number; evaId: eva }) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<JikanCharacter | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    const getData = async () => {
      if (hasLoaded.current) return;
      setLoading(true);
      try {
        const result = await getCharacter({ id });
        console.log(result);
        setData(result);
        hasLoaded.current = true;
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getData();
        }
      },
      { threshold: 0.1, rootMargin: '100px' },
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [id]);

  if (isLoading) {
    return <LoadingDos evaId={evaId} index={index} />;
  }

  return (
    <div
      ref={divRef}
      id={String(id)}
      key={index}
      className={twMerge(
        clsx('snap-start min-h-screen z-40 relative md:mt-[100vh] backdrop-blur bg-opacity-95', {
          'bg-custom-eva00': evaId === 'eva00',
          'bg-custom-eva01': evaId === 'eva01',
          'bg-custom-eva02': evaId === 'eva02',
          'bg-custom-eva06': evaId === 'eva06',
          'bg-custom-eva08': evaId === 'eva08',
        }),
        index > 0 && 'md:mt-0',
      )}>
      <div className="max-h-screen h-screen bg-no-repeat bg-top text-white w-full md:p-20 p-10 md:grid md:grid-cols-2 md:grid-rows-1 grid grid-rows-2 gap-y-8">
        <div className="overflow-auto">
          <p
            className={clsx(
              `md:text-[5rem] text-lg  font-bold tracking-wide font-custom leading-normal  transition-opacity opacity-0 animate-fadeIn`,
              (data?.name?.length || 0) >= 15 && 'md:text-[4rem] text-lg leading-none',
            )}>
            {data?.name}
          </p>
          <p className="text-lg tracking-wide md:w-[60%] w-full md:text-ellipsis transition-opacity opacity-0 animate-fadeIn">
            {data?.about?.slice(0, 580)}
          </p>
        </div>
        <div
          className={clsx('w-full h-full relative', {
            'bg-custom-eva00': evaId === 'eva00',
            'bg-custom-eva01': evaId === 'eva01',
            'bg-custom-eva02': evaId === 'eva02',
            'bg-custom-eva06': evaId === 'eva06',
            'bg-custom-eva08': evaId === 'eva08',
          })}>
          <div
            className={clsx(
              'absolute inset-0 diagonal bg-contain bg-left-top bg-no-repeat transition-opacity opacity-0 animate-fadeIn',
              {
                'bg-eva-pilot-00': evaId === 'eva00',
                'bg-eva-pilot-01': evaId === 'eva01',
                'bg-eva-pilot-02': evaId === 'eva02',
                'bg-eva-pilot-06': evaId === 'eva06',
                'bg-eva-pilot-08': evaId === 'eva08',
              },
            )}>
            {/* <img src={data?.images?.webp?.image_url} alt="img-profile" className="w-[20%]" /> */}
          </div>
          <div
            className={twMerge(
              clsx(
                'absolute inset-0 diagonal-reverse bg-right-top bg-no-repeat bg-contain transition-opacity opacity-0 animate-fadeIn',
                {
                  'bg-eva00': evaId === 'eva00',
                  'bg-eva01': evaId === 'eva01',
                  'bg-eva02': evaId === 'eva02',
                  'bg-eva06': evaId === 'eva06',
                  'bg-eva08': evaId === 'eva08',
                },
              ),
            )}></div>
        </div>
      </div>
    </div>
  );
}

export default SectionDos;
