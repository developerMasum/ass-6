import { ClockCircleOutlined } from "@ant-design/icons";
import { Divider, Timeline } from "antd";

const TimelineApp = () => (
  <div  className="sm:w-full md:w-full lg:w-full xl:w-full customBg px-8 py-5">
    <p className="text-base font-semibold">Timeline</p>
    <Divider style={{ border: '1px solid white' }} />
    <Timeline
      mode="alternate"
     
      items={[
        {
          children: "iPhone 16 arrived: 1 October 2024",
        },
        {
          children: "Sold 100 Units within: 1 October 2024",
          color: "green",
        },
        {
          dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
          children: `Arrived 150 .`,
        },
        {
          color: "red",
          children: "Refurbished backed: 10 Units",
        },
        {
          children: "Sold 100 Units within: 1 October 2025",
        },
        {
          dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
          children: "Sold all Units",
        },
      ]}
    />
  </div>
);

export default TimelineApp;
