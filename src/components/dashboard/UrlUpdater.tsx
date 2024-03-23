import { useState } from "react";

import { UrlUpdaterProps } from "./interfaces";

export default function UrlUpdater({ ...props }: UrlUpdaterProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUrl, setEditedUrl] = useState<string>("");

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedUrl(props.data);
  };

  const saveEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <div className="flex flex-col align-start">
          <div
            className="flex w-full flex-col md:flex-row "
            style={{ display: !isEditing ? "flex" : "none" }}
          >
            <span className="text-gray-200 w-1/4">{props.label}</span>
            <div className="flex flex-row align-start">
              <button
                className="text-blue-500 hover:underline"
                onClick={toggleEdit}
              >
                <svg
                  className="w-6 h-6 text-gray-200 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <span className="text-gray-600 text-lg">{props.data}</span>
            </div>
          </div>

          {/* Display the input field for editing */}
          <div
            className="mb-4 flex items-center justify-start w-full"
            style={{ display: isEditing ? "flex" : "none" }}
          >
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={editedUrl}
              onChange={(e) => setEditedUrl(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={saveEdit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
