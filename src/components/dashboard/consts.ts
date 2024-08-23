import { FormField } from "../Form";

export const CreateShortUrlField: FormField[] = [
  {
    name: "original_url",
    type: "text",
    label: "Original url",
    placeholder: "https://company.com",
    required: true,
  },
  {
    name: "short_url",
    type: "text",
    label: "Custom short url",
    placeholder: "custom short url",
    required: true,
  },
  {
    name: "category",
    type: "select",
    label: "Category",
    placeholder: "Select a category",
    required: true,
    options: [
      { value: "Tech", label: "Tech" },
      { value: "News", label: "News" },
      { value: "Music", label: "Music" },
      { value: "Sports", label: "Sports" },
      { value: "Movies", label: "Movies" },
      { value: "Education", label: "Education" },
      { value: "Science", label: "Science" },
      { value: "Gaming", label: "Gaming" },
    ],
  },
];

export const DeleteUrlField: FormField[] = [
  {
    name: "delete",
    type: "text",
    label: "delete url",
    placeholder: "CONFIRM",
    required: true,
  },
];
