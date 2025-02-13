import { Bounce, ToastContainer } from "react-toastify";
import ResistanceMobileController from "./ResistanceMobileController";

export default () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      ></ToastContainer>
      <ResistanceMobileController />
    </>
  );
};
