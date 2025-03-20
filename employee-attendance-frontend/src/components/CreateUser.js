import React, { useState } from "react";
import { Form, Input, Button, Select, Space, notification } from "antd";
import axios from "axios";

const { Option } = Select;

function CreateUser() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Submit form data to the server
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Make an API call to the backend to create a new user
      const response = await axios.post("http://localhost:5000/api/users/add", values);

      // Show success notification
      notification.success({
        message: "User Created",
        description: "The user has been successfully created.",
      });

      // Reset the form after successful submission
      form.resetFields();
    } catch (error) {
      // Show error notification
      notification.error({
        message: "Error",
        description: error.response ? error.response.data.error : "Failed to create user.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form
        form={form}
        name="create_user"
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ role: "employee" }} // Default role
      >
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[{ required: true, message: "Please input the full name!" }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input the username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="national_id"
          label="National ID"
          rules={[{ required: true, message: "Please input the national ID!" }]}
        >
          <Input placeholder="Enter national ID" />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input the phone number!" },
          ]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: "Please input the department!" }]}
        >
          <Input placeholder="Enter department" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="employee">Employee</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create User
          </Button>
          <Button onClick={() => form.resetFields()} type="default">
            Reset
          </Button>
        </Space>
      </Form>
    </div>
  );
}

export default CreateUser;
