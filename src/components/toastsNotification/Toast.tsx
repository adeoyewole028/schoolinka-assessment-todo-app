import { useEffect } from "react";

export default function Toast({
  toasts,
  onClose,
}: {
  toasts: {
    id: string;
    message: string;
    type: string;
    icon: string;
    fill: string;
    background: string;
  }[];
  onClose: (id: string) => void;
}) {
  useEffect(() => {
    toasts.forEach(
      (toast: {
        id: string;
        message: string;
        type: string;
        icon: string;
        fill: string;
        background: string;
      }) => {
        setTimeout(() => onClose(toast.id), 5000);
      }
    );
  }, [toasts, onClose]);

  return (
    <div>
      {toasts.map(
        (toast: {
          id: string;
          message: string;
          type: string;
          icon: string;
          fill: string;
          background: string;
        }) => (
          <div
            id={toast.id}
            key={toast.id}
            className="fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 transition-all delay-300 ease-in-out"
            role="alert"
          >
            <div
              className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 rounded-lg dark:bg-green-800 dark:text-green-200 ${toast.background}`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill={toast.fill}
                viewBox="0 0 20 20"
              >
                {toast.icon === "check" ? (
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                ) : (
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                )}
              </svg>
              <span className="sr-only">
                {toast.icon === "check" ? "Check icon" : "Error icon"}
              </span>
            </div>
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => onClose(toast.id)}
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )
      )}
    </div>
  );
}
