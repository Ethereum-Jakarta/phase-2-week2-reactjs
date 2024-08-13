import './App.css';
import Navbar from '@/components/Navbar';
import SectionUno from './components/SectionUno';
import { useEffect, useState } from 'react';
import { getAllStudents } from './api/api';
import { Character } from './types/response';
import { twMerge } from 'tailwind-merge';
import FloatingButton from './components/FloatingButton';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<Character[]>([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await getAllStudents();
        setData(data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <main className="mx-auto relative">
      <Navbar />
      <SectionUno />
      {data?.map(({ name }, index) => {
        return (
          <div
            id={name}
            key={index}
            className={twMerge(
              'snap-start min-h-screen z-40 bg-blue-500 bg-opacity-75 relative mt-[100vh] backdrop-blur',
              index > 0 && 'mt-0',
            )}>
            <div className=" w-full h-screen bg-akane bg-no-repeat bg-[length:50%] bg-top">ok</div>
          </div>
        );
      })}
      <FloatingButton />
    </main>
  );
}

export default App;
