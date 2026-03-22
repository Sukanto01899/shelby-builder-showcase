"use client";

import React, { useState } from "react";
import SubmissionForm from "@/components/SubmissionForm";
import ModalPortal from "@/components/ModalPortal";

const SubmissionModalTrigger = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={
          classname ||
          "w-full rounded-full border border-base-300/70 px-6 py-3 text-sm font-semibold text-base-content/80 transition hover:border-base-300 hover:text-base-content sm:w-auto"
        }
        onClick={() => setOpen(true)}
      >
        {children || "Submit"}
      </button>

      {open ? (
        <ModalPortal>
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4 py-10 backdrop-blur-sm">
            <div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-base-300/60 bg-base-100 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-base-200 px-6 py-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/60">
                    Submission
                  </p>
                  <h2 className="text-lg font-semibold text-base-content">
                    Project Details
                  </h2>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-7">
                <SubmissionForm onClose={() => setOpen(false)} />
              </div>
            </div>
          </div>
        </ModalPortal>
      ) : null}
    </>
  );
};

export default SubmissionModalTrigger;
