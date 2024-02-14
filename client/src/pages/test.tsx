import Inventory from "../components/Inventory/Inventory";
import DemoColumn from "../components/Inventory/inventoryStock";

import DisplayCard from "../components/home/DisplayCard";
import Section from "../components/home/Section";
import TimelineApp from "../components/home/Timeline";

const Test = () => {
  return (
    <>
      <DisplayCard />
      <div className="flex flex-col sm:flex-row justify-between gap-4  mt-5 mb-5">
        <DemoColumn />

        <Section />
      </div>

     <div className="flex flex-col sm:flex-row  justify-between gap-2  mt-5 mb-5">
     <Inventory />
      <TimelineApp />
     </div>


     {/* <ProductsList /> */}
      
    </>
  );
};

export default Test;
