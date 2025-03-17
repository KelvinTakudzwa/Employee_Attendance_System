import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

function CheckOutModal({ isOpen, closeModal, token, notify }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckOut = async () => {
    if (!summary.trim()) {
      toast.error("Please enter a summary before checking out.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/check-out",
        { summary }, // Send the summary in the request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notify(response.data.message);
      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Check-out failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Check-Out Summary"
      open={isOpen}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleCheckOut}
        >
          Submit
        </Button>,
      ]}
    >
      <p>Please provide a summary of today before checking out:</p>
      <Input.TextArea
        rows={4}
        placeholder="Write your summary here..."
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
    </Modal>
  );
}

export default CheckOutModal;
