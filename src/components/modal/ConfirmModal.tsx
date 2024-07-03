const ConfirmModal = ({ closeModal, cancelAppointment }: any) => {
    const handleSubmit = () => {
      cancelAppointment();
      closeModal();
    };
  
    const handleCancel = () => {
      closeModal();
    };
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-transparent backdrop-filter backdrop-blur-sm">
        <div className="w-96 h-40 bg-yellow-50 px-14 py-10 rounded-lg shadow-lg">
          <p className="text-gray-900">Are you sure you want to cancel the booking?</p>
          <div className="flex justify-between px-2 mt-6">
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white px-8 py-0.5 rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-8 py-0.5 rounded-full"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;
  