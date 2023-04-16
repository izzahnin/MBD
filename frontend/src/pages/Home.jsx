import "../App.css";
import HeroSection from "../components/HeroSection";
import Styles from "../components/styles/global.module.css";
import Card from "../components/Card";
// import AddProduct from "../components/AddProduct";

function Home() {
  return (
    <>
      <HeroSection />
      {/* <AddProduct/> */}
      <div className={Styles.card_row}>
        <Card />
      </div>

      <h1 className="home">HOME</h1>
    </>
  );
}

export default Home;
