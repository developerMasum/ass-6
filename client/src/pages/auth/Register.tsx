import { Button, Form, Input, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../redux/user/userApi";
import { toast } from "sonner";

const Register = () => {
  const [form] = Form.useForm();
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

type TRegister = {
  name: string;
  email:string;
  password:string;
}

  const onFinish = async (values:TRegister) => {
    try {
      const userInfo = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      // Call the createUser mutation
       await createUser(userInfo);

      // Display success toast
      toast.success("User created successfully", { duration: 2000 });
      navigate("/login");

      // console.log(userInfo);

      // Clear form fields after successful submission
      form.resetFields();
    } catch (error) {
      // Display error toast
      toast.error("Error creating user. Please try again.", { duration: 2000 });

      console.error("Error:", error);
    }
  };

  // const onFinishFailed = (errorInfo:string) => {
  //   // Display validation error toast
  //   toast.error("Please fill out all required fields correctly.", {
  //     duration: 2000,
  //   });

  //   console.log("Failed:", errorInfo);
  // };

  return (
    <div className="mx-auto max-w-md p-6 rounded-lg border border-gray-300 bg-white text-gray-800">
      <h2 className="text-center text-xl font-bold mb-6">
        Please Register Now
      </h2>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label="Your Name"
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item>
          <Space direction="vertical">
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
            <div className="text-center">
              Already registered? <Link to="/login">Login</Link>
            </div>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
