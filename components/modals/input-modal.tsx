"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
// import toast from "react-hot-toast";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  data: {
    title?: string;
    description?: string;
    input1: {
      label: string;
      required: boolean;
      value: string;
      onChange: (e: any) => void;
      customElement?: JSX.Element;
    };
    input2?: {
      label: string;
      required: boolean;
      value: string;
      onChange: (e: any) => void;
      customElement?: JSX.Element;
    };
    input3?: {
      label: string;
      required: boolean;
      value: string;
      onChange: (e: any) => void;
      customElement?: JSX.Element;
    };

    denyLabel: string;
    denyFunction: () => void;
    confirmLabel: string;
    confirmFunction: () => void;
    successMessage?: string;
  };
}

export default function InputModal({ show, setShow, data }: Props) {
  function handleConfirm() {
    data.confirmFunction();
    setShow(false);

    if (data.successMessage) {
      //   toast.success(data.successMessage);
    }
  }
  function handleDeny() {
    data.denyFunction();
    setShow(false);
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-[70]" onClose={handleDeny}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden border border-back-300 rounded-2xl bg-back-100 bg-opacity-40 blurBack p-6 text-left align-middle shadow-xl transition-all">
                  {data.title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      {data.title}
                    </Dialog.Title>
                  )}

                  {data.description && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">
                        {data.description}
                      </p>
                    </div>
                  )}

                  {data.input1.customElement ? (
                    data.input1.customElement
                  ) : (
                    <div className="flex flex-col mt-4">
                      <div className="flex w-fit gap-2 items-center">
                        <label htmlFor="title" className="text-white text-lg">
                          {data.input1.label}
                        </label>
                        {!data.input1.required && (
                          <label
                            htmlFor="description"
                            className="text-white opacity-30"
                          >
                            Optional
                          </label>
                        )}
                      </div>

                      <input
                        autoFocus
                        type="text"
                        value={data.input1.value}
                        onChange={data.input1.onChange}
                        className=" p-2 rounded-md border border-back-300 text-white bg-transparent focus:border-c1 "
                      />
                    </div>
                  )}
                  {data.input2 && (
                    <>
                      {data.input2.customElement ? (
                        <>{data.input2.customElement}</>
                      ) : (
                        <div className="flex flex-col mt-4">
                          <div className="flex w-fit gap-2 items-center">
                            <label
                              htmlFor="description"
                              className="text-white  text-lg"
                            >
                              {data.input2.label}
                            </label>
                            {!data.input2.required && (
                              <label
                                htmlFor="description"
                                className="text-white opacity-30"
                              >
                                Optional
                              </label>
                            )}
                          </div>
                          <input
                            type="text"
                            className=" p-2 rounded-md border border-back-300  text-white bg-transparent focus:border-c1 "
                            value={data.input2.value}
                            onChange={data.input2.onChange}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {data.input3 && (
                    <>
                      {data.input3.customElement ? (
                        data.input3.customElement
                      ) : (
                        <div className="flex flex-col mt-4">
                          <div className="flex w-fit gap-2 items-center">
                            <label
                              htmlFor="description"
                              className="text-white  text-lg"
                            >
                              {data.input3.label}
                            </label>
                            {!data.input3.required && (
                              <label
                                htmlFor="description"
                                className="text-white opacity-30"
                              >
                                Optional
                              </label>
                            )}
                          </div>
                          <input
                            type="text"
                            className=" p-2 rounded-md border border-back-300  text-white bg-transparent focus:border-c1 "
                            value={data.input3.value}
                            onChange={data.input3.onChange}
                          />
                        </div>
                      )}
                    </>
                  )}

                  <div className="mt-4 flex gap-4 w-fit float-right">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent   px-4 py-2 text-sm font-medium text-white"
                      onClick={handleDeny}
                    >
                      {data.denyLabel}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-c1 bg-opacity-70  px-4 py-2 text-sm font-medium text-white bg-neutral-500  hover:bg-neutral-400"
                      onClick={handleConfirm}
                    >
                      {data.confirmLabel}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
