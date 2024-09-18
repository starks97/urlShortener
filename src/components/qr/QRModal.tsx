import { Modal } from "flowbite-react";

import { useRef, useState, useEffect } from "react";

import { ReactPortal } from "../Portal";

import QRCodeGenerator from "./GenerateQR";

import DownLoadQR from "./DownLoadQR";

import { Spinner } from "flowbite-react";

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

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (props.openModal) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [props.openModal, props.short_url]);

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
              {loading ? (
                <div className="flex justify-center items-center">
                  <Spinner size="xl" color="warning" />
                </div>
              ) : (
                <div>
                  <QRCodeGenerator
                    canvasRef={canvasRef}
                    url={redirectUrl}
                    color={props.color}
                    size={300}
                    bg={props.bg}
                  />
                  <div className="flex justify-center items-center ">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={300}
                      style={{ border: "2px solid orange" }}
                    />
                  </div>
                  <DownLoadQR canvasRef={canvasRef} />
                </div>
              )}
            </Modal.Body>
          </div>
        </Modal>
      </ReactPortal>
    </>
  );
}
