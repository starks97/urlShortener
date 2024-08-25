import { Modal } from "flowbite-react";

import { DashModalProps } from "./interfaces";

import { useNavigate } from "@tanstack/react-router";

import UrlUpdater from "./UrlUpdater";

import { DateConverter } from "../../utils";
import { UrlCategories } from "../../api";
import DeleteUrl from "./DeleteUrl";

export default function DashModal({ ...props }: DashModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    false;
    navigate({
      to: "/dashboard",
      replace: true,
      search: { limit: 15, offset: 0, category: UrlCategories.All },
    });
  };
  return (
    <>
      <Modal
        dismissible
        show={props.openModal}
        onClose={handleClose}
        id="default-modal"
      >
        <div id="modal-body">
          <Modal.Header>
            <span className="text-2xl font-semibold text-gray-200">
              Url info
            </span>
          </Modal.Header>

          <Modal.Body>
            <UrlUpdater
              data={props.data.short_url}
              id={props.data.id}
              label="short_url"
            />
            <UrlUpdater
              data={props.data.original_url}
              id={props.data.id}
              label="original_url"
            />
            <UrlUpdater
              data={props.data.category}
              id={props.data.id}
              label="category"
            />
            <div className="flex flex-row w-full mt-4">
              <span className="text-gray-200 w-1/4">Views</span>
              <p className="text-gray-200">{props.data.views}</p>
            </div>
            <div className="flex flex-row w-full mt-4">
              <span className="text-gray-200 w-1/4">Created:</span>
              <p className="text-gray-200">
                {DateConverter.formatDateFromString(props.data.createdAt)}
              </p>
            </div>
            <div className="flex flex-row w-full mt-4">
              <span className="text-gray-200 w-1/4">Updated</span>
              <p className="text-gray-200">
                {DateConverter.formatDateFromString(props.data.updatedAt)}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <DeleteUrl />
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
