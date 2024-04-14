import React, { useState, useMemo } from "react";

import { UrlCardProps } from "./interfaces";

import { Button } from "flowbite-react";

import DashModal from "./DashModal";

import { baseUrl } from "../../consts";
import ShareButton from "../ShareButton";

const UrlCard: React.FC<UrlCardProps> = ({ ...props }) => {
  const [openModal, setOpenModal] = useState(false);

  const redirect = import.meta.env.VITE_REDIRECT_SHORT_URL;

  const urlData = useMemo(
    () => ({
      created_at: props.created_at,
      original_url: props.original_url,
      short_url: props.short_url,
      updated_at: props.updated_at,
      url_id: props.url_id,
      views: props.views,
    }),
    [props]
  );

  const handleRedirect = () => {
    window.open(`${redirect}${props.short_url}`, "_blank");
  };

  return (
    <>
      <div
        id="url-card"
        className="max-w-sm p-6 bg-card_color border border-gray-200 rounded-lg shadow flex items-center space-x-4 flex-col w-full"
      >
        <button
          className="inline-flex font-medium items-center text-yellow-600 hover:underline text-lg"
          onClick={() => handleRedirect()}
        >
          {props.short_url}
          <svg
            className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            ></path>
          </svg>
        </button>
        <ShareButton
          shortUrl={`${baseUrl}/api/url/redirect/${props.short_url}`}
          title={props.short_url}
        />
        <div className="mt-5 w-full flex items-center justify-center">
          <Button
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
            onClick={() => setOpenModal(!openModal)}
          >
            View More
          </Button>
        </div>
      </div>

      <DashModal
        setOpenModal={setOpenModal}
        data={urlData}
        openModal={openModal}
      />
    </>
  );
};

export default UrlCard;
