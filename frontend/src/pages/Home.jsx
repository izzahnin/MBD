import "../App.css";
import HeroSection from "../components/HeroSection";
import Styles from "../components/styles/global.module.css";
import Card from "../components/Card";

function Home() {
  return (
    <>
      <HeroSection />
      <div className={Styles.card_row}>
        <Card />
      </div>

      <h1 className="home">HOME</h1>
    </>
  );
}

export default Home;
