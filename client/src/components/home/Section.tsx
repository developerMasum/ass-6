import { Divider, Progress } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";

const Section = () => {
  const { data } = useGetAllProductsQuery("");
  const productData = data?.data;
  const percentData = (1000 - productData?.length) / 100;

  const loaded = Math.ceil(productData?.length / 10);
  const blankBox = 10000 - loaded 

  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
  return (
    <div className="p-5 rounded-md customText customBg mx-auto sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
    <p className="text-base font-semibold">STORAGE MANAGEMENT</p>
    <Divider style={{ border: '1px solid white' }} />
    <div className="text-center">
      <Progress type="circle" size={200} percent={percentData} strokeColor={twoColors} />
      <p className="text-lg font-semibold mt-4">STORE USED </p>
    </div>
    <div className="flex justify-around items-center">
      <p className="font-semibold">Loaded: {loaded} Shelves</p>
      <p className="font-semibold">Blank: {blankBox} Shelves</p>
    </div>
  </div>
  
  
  
  );
};

export default Section;
