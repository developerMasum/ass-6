import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeFilled,
  VideoCameraOutlined,
  AppstoreAddOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/buy.gif";

const { Sider } = Layout;

interface SidebarItem {
  key: string;
  icon: React.ReactNode;
  link: string;
  label: string;
}

const Sidebar: React.FC = () => {
  const sidebarItems: SidebarItem[] = [
    {
      key: "1",
      icon: <HomeFilled />,
      link: "/",
      label: "Home",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      link: "/product",
      label: "Management",
    },
    {
      key: "3",
      icon: <AppstoreAddOutlined />,
      link: "/add-product",
      label: "Add Product",
    },
    {
      key: "4",
      icon: (
        <img src={img1} alt="Buy" style={{ width: "24px", height: "24px" }} />
      ),
      link: "/sell-product",
      label: "Sell Product",
    },
    {
      key: "5",
      icon: <HistoryOutlined />,
      link: "/sells-history",
      label: "Product History",
    },
  ];

  return (
    <Sider
      className="bg-[#1C2E4C]"
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              height: "80%",
              width: "80%",
              // border: "2px solid white",
              borderRadius: "50%",
            }}
            src="https://images.all-free-download.com/images/graphicwebp/mobile_shop_logo_flat_modern_smartphone_texts_6930802.webp"
            alt=""
          />

          <p
            style={{
              color: "white",
              paddingLeft: "20px",
              textAlign: "center",
              padding: "5px",
            }}
          >
            SmartphoneHERO
          </p>
        </div>
      </div>
      <Menu
        style={{
          marginTop: "30px",
          backgroundColor: "#0c1a32f6",
          color: "white",
        }}
        mode="inline"
        defaultSelectedKeys={["1"]}
      >
        {sidebarItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
