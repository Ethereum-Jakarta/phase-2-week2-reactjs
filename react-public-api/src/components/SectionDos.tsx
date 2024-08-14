import { getCharacter } from '@/api/api';
import { eva } from '@/types/character';
import { JikanCharacter } from '@/types/jikanResponse';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
        setLoading(false);
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

  return (
    <div
      ref={divRef}
      id={String(id)}
      key={index}
      className={twMerge(
        clsx('snap-start min-h-screen z-40 relative mt-[100vh] backdrop-blur bg-opacity-75', {
          'bg-custom-eva00': evaId === 'eva00',
          'bg-custom-eva01': evaId === 'eva01',
          'bg-custom-eva02': evaId === 'eva02',
          'bg-custom-eva06': evaId === 'eva06',
          'bg-custom-eva08': evaId === 'eva08',
        }),
        index > 0 && 'mt-0',
      )}>
      <div className=" w-full h-screen bg-akane bg-no-repeat bg-[length:50%] bg-top">ok</div>
    </div>
  );
}

export default SectionDos;
