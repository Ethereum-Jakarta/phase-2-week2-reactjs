import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection';
import CategoryTab from './components/CategoryTab';
import FlashSale from './components/FlashSale';
import TodayForYou from './components/TodayForYou';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <CategoryTab />
      <FlashSale/>
      <TodayForYou/>
      <Footer />
    </>
  );
}

export default App;
