import { Spin } from "antd";


const Loader = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Loader;