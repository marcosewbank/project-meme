"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      Error! {error.message}
      <button
        onClick={() => {
          reset();
        }}
      >
        Click here to try again
      </button>
    </div>
  );
};

export default error;
