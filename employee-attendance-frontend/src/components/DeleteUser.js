import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import axios from "../services/api";

const DeleteUser = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!username) {
      message.error("Please specify the username.");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${username}`);
      message.success(`User ${username} deleted successfully.`);
      onClose();
    } catch (error) {
      message.error("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Delete User"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete} loading={loading}>
          Delete
        </Button>,
      ]}
    >
      <p>Specify the username of the user to delete:</p>
      <Input
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </Modal>
  );
};

export default DeleteUser;
