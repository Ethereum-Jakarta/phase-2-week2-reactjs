import './App.css';
import Navbar from '@/components/Navbar';
import SectionUno from './components/SectionUno';
import FloatingButton from './components/FloatingButton';
import { evangelion } from './data/character';
import SectionDos from './components/SectionDos';

function App() {
  return (
    <main className="mx-auto relative">
      <Navbar />
      <SectionUno />
      {evangelion?.map(({ id, evaId }, index) => {
        return <SectionDos key={id} id={id} index={index} evaId={evaId!} />;
      })}
      <FloatingButton />
    </main>
  );
}

export default App;
