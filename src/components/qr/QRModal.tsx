import { Modal } from "flowbite-react";

import { useRef } from "react";

import { ReactPortal } from "../Portal";

import QRCodeGenerator from "./GenerateQR";

import DownLoadQR from "./DownLoadQR";

interface QRModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  short_url: string;
  size?: number;
  color?: string;
  bg?: string;
}

export default function QRModal({ ...props }: QRModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const redirect = import.meta.env.VITE_REDIRECT_SHORT_URL;

  const redirectUrl = `${redirect}${props.short_url}`;

  const handleClose = () => props.setOpenModal(false);

  return (
    <>
      <ReactPortal wrapperId="modal-portal">
        <Modal
          dismissible
          show={props.openModal}
          onClose={handleClose}
          id="default-modal"
        >
          <div id="modal-body">
            <Modal.Header>
              <span className="text-2xl font-semibold text-gray-200">
                QR Url Info
              </span>
            </Modal.Header>
            <Modal.Body>
              <div>
                <QRCodeGenerator
                  canvasRef={canvasRef}
                  url={redirectUrl}
                  color="black"
                  size={300}
                  bg="white"
                />
                <canvas ref={canvasRef} width={300} height={300} />
                <DownLoadQR canvasRef={canvasRef} />
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </ReactPortal>
    </>
  );
}
