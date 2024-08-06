import { UrlCardProps } from "./interfaces";

import { Link } from "@tanstack/react-router";

import { useState } from "react";

import ShareButton from "../ShareButton";

import { QRModal } from "../qr";

const UrlCard: React.FC<UrlCardProps> = ({ ...props }) => {
  const redirect = import.meta.env.VITE_REDIRECT_SHORT_URL;

  const [openModal, setOpenModal] = useState(false);

  const handleRedirect = () => {
    window.open(`${redirect}${props.short_url}`, "_blank");
  };

  return (
    <>
      <div
        id="card"
        className="bg-yellow-box max-w-sm p-6 border rounded-lg shadow flex items-center space-x-4 flex-col w-full"
      >
        <div className="inline-flex font-medium items-center gap-2">
          <button
            onClick={() => handleRedirect()}
            className="text-white text-lg"
          >
            {props.short_url}
          </button>

          <ShareButton
            openModal={openModal}
            setOpenModal={setOpenModal}
            shortUrl={props.short_url}
          />
        </div>

        <div className="mt-5 w-full flex items-center justify-center">
          <Link
            to="/dashboard/$url_id"
            params={{
              url_id: props.id,
            }}
            className="btn-grad"
            activeProps={{ className: "text-black font-bold" }}
          >
            view more...
          </Link>
        </div>
      </div>

      <QRModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        short_url={props.short_url}
      />
    </>
  );
};

export default UrlCard;
