import React, { useState } from "react";
import { Form, Input, Button, Select, Space, notification } from "antd";
import axios from "axios";

const { Option } = Select;

function UpdateUser() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      // Make API call to update user information
      const response = await axios.put("http://localhost:5000/api/users", values);

      notification.success({
        message: "User Updated",
        description: "The user information has been successfully updated.",
      });

      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response ? error.response.data.error : "Failed to update user.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Update User</h1>
      <Form
        form={form}
        name="update_user"
        onFinish={handleUpdate}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input the username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="fullname"
          label="Full Name"
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
        >
          <Input.Password placeholder="Enter new password (if changing)" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
        >
          <Select placeholder="Select a role">
            <Option value="employee">Employee</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update User
          </Button>
          <Button onClick={() => form.resetFields()} type="default">
            Reset
          </Button>
        </Space>
      </Form>
    </div>
  );
}

export default UpdateUser;
