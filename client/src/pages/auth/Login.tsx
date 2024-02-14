import { Button, Form, Input, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [form] = Form.useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    const toastId = toast.loading("Logging......");
    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged In", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 rounded-lg border border-green-500 bg-white text-gold mt-28">
      <h2 className="text-center text-xl font-bold mb-6">Please Login Now</h2>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password" },
            { min: 6, message: "Password must be at least 6 characters long" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Space direction="vertical">
            <Button type="dashed" htmlType="submit" className="w-full">
              Login
            </Button>
            <div className="text-center">
              Not registered? <Link to="/register">Register</Link>
            </div>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
