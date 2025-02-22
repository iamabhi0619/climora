"use client";
import LeftSection from "./components/LeftSection";
import Loader from "./components/Loader";
import RightSection from "./components/RightSection";
import { useAppContext } from "./context/AppContext";


export default function Home() {
  const { loading } = useAppContext();
  return (
    <>
      {loading ? <div className="bg-accent2">
        <Loader />
      </div> : <div className="h-screen w-full bg-accent2 flex flex-col-reverse md:flex-row overflow-y-hidden">
        <LeftSection />
        <RightSection />
      </div>}
    </>
  );
}
