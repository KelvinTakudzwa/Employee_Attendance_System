import { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import axios from "axios";

export default function LeaveRequestModal({ isOpen, closeModal, refetch, username }) {
  const [form, setForm] = useState({ start_date: "", end_date: "", reason: "" });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRequest = async () => {
    if (!form.start_date || !form.end_date || !form.reason) {
      message.error("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/leave/request",
        { ...form, username }, // Include username in the request
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Leave request submitted!");
      closeModal();
      refetch(); // Refresh the leave requests list
    } catch (error) {
      message.error(error.response?.data?.error || "Error submitting request.");
    }
  };

  return (
    <Modal title="Request Leave" open={isOpen} onCancel={closeModal} footer={null}>
      <Input type="date" name="start_date" placeholder="Start Date" onChange={handleChange} className="mb-2" />
      <Input type="date" name="end_date" placeholder="End Date" onChange={handleChange} className="mb-2" />
      <Input.TextArea name="reason" placeholder="Reason" onChange={handleChange} className="mb-2" />
      <Button type="primary" onClick={submitRequest} block>
        Submit
      </Button>
    </Modal>
  );
}
