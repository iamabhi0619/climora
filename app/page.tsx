import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";


export default function Home() {
  
  return (
    <div className="h-screen w-full bg-accent2 flex flex-col-reverse md:flex-row overflow-y-hidden">
      <LeftSection/>
      <RightSection/>
    </div>
  );
}
