import { Modal } from "flowbite-react";

import { DashModalProps } from "./interfaces";
import UrlUpdater from "./UrlUpdater";

export default function DashModal({ ...props }: DashModalProps) {
  return (
    <>
      <Modal
        dismissible
        show={props.openModal}
        onClose={() => props.setOpenModal(false)}
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
              id={props.data.url_id}
              label="short_url"
            />
            <UrlUpdater
              data={props.data.original_url}
              id={props.data.url_id}
              label="original_url"
            />
            <div className="flex flex-row w-full mt-4">
              <span className="text-gray-200 w-1/4">Views</span>
              <p className="text-gray-200">{props.data.views}</p>
            </div>
            <div className="flex flex-row w-full mt-4">
              <span className="text-gray-200 w-1/4">Created:</span>
              <p className="text-gray-200">{props.data.created_at}</p>
            </div>
            <div className="flex flex-row w-full mt-4">
              <span className="text-gray-200 w-1/4">Updated</span>
              <p className="text-gray-200">{props.data.updated_at}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Delete
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
