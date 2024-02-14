import { Button, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/home/Sidebar";
import { Header, Content } from "antd/lib/layout/layout";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
// import SearchBar from "../components/home/SearchBar";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    // console.log('clicked');
    dispatch(logout());
    toast.success("successfully logged out");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1C2E4C",
            color: "white",
          }}
        >
          <div className="flex gap-3" style={{ marginBottom: "16px" }}>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            <Button
              onClick={handleLogOut}
              className="text-white"
              style={{ marginBottom: "8px" }}
            >
              Logout
            </Button>
          </div>
          {/* <SearchBar /> */}
        </Header>

        <Content
          className="bg-[#ffffff]"
          style={{ margin: "64px 0 0", padding: "24px" }}
        >
          <div
            style={{
              minHeight: 360,
              backgroundColor: "#ffffff",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
