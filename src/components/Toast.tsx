import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <div>
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
}
