import React from "react";

export const CheckboxIconChecked = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2m-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z" />
    </svg>
  );
};

export const CheckboxIconUnchecked = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z"
        strokeWidth="2"
        stroke="red"
      />
      <path d="M5 5h14v14H5z" />
    </svg>
  );
};

export const CheckboxIconIndeterminate = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-2 10H7v-2h10z" />
    </svg>
  );
};
