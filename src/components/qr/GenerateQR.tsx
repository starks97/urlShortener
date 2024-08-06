import React, { useEffect } from "react";
import QRCode from "qrcode";
import { getHexColor } from "../../utils";

interface QRCodeGeneratorProps {
  url: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  size?: number;
  color?: string;
  bg?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  url,
  canvasRef,
  size = 200,
  color = "black",
  bg = "white",
}) => {
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        if (url && canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const qrOptions = {
              with: size,
              margin: 1,
              color: {
                dark: getHexColor(color),
                light: getHexColor(bg),
              },
            };
            const qr = await QRCode.toDataURL(url, qrOptions);
            const image = new Image();
            image.onload = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
            image.src = qr;
          }
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [url, canvasRef, size, color, bg]);

  return null;
};

export default QRCodeGenerator;
