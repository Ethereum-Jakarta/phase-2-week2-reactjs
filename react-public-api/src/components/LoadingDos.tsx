import { eva } from '@/types/character';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

function LoadingDos({ index, evaId }: { index: number; evaId: eva }) {
  return (
    <div
      className={twMerge(
        clsx(
          'snap-start min-h-screen z-40 relative md:mt-[100vh] backdrop-blur bg-opacity-95 bg-green-500',
          {
            'bg-custom-eva00': evaId === 'eva00',
            'bg-custom-eva01': evaId === 'eva01',
            'bg-custom-eva02': evaId === 'eva02',
            'bg-custom-eva06': evaId === 'eva06',
            'bg-custom-eva08': evaId === 'eva08',
          },
        ),
        index > 0 && 'md:mt-0',
      )}>
      <div className="max-h-screen h-screen bg-no-repeat bg-top text-white w-full md:p-20 p-10 md:grid md:grid-cols-2 md:grid-rows-1 grid grid-rows-2 gap-8">
        <div className="overflow-auto space-y-5">
          <div className={clsx(`animate-pulse h-14 bg-gray-100 bg-opacity-50 rounded-full`)}></div>
          <div
            className={clsx(
              `animate-pulse h-14 w-2/5 bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-full bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-full bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-[60%] bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-[60%] bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-full bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-full bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-full bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-full bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-[80%] bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-[80%] bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-full bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-full bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-full bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
          <div
            className={clsx(
              `animate-pulse h-6 w-[30%] bg-gray-100 bg-opacity-50 rounded-full`,
            )}></div>
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
              'absolute inset-0 diagonal bg-contain bg-left-top bg-no-repeat animate-pulse bg-white bg-opacity-50',
            )}>
            {/* <img src={data?.images?.webp?.image_url} alt="img-profile" className="w-[20%]" /> */}
          </div>
          <div
            className={twMerge(
              clsx(
                'absolute inset-0 diagonal-reverse bg-right-top bg-no-repeat bg-contain animate-pulse bg-white bg-opacity-50',
              ),
            )}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingDos;
