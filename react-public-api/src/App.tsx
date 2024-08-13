import './App.css';
import Navbar from '@/components/Navbar';
import SectionUno from './components/SectionUno';

function App() {
  return (
    <main className="mx-auto">
      <Navbar />
      <SectionUno />
      <div className="min-h-screen z-40 bg-blue-500 relative mt-[100vh]">ok</div>
    </main>
  );
}

export default App;
