import { Fragment } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { Icons } from "@/components/icons";

export const CustomListBox = ({ value, values, onChange }: any) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="w-full h-full relative  ">
        <Listbox.Button className="relative w-full z-10 cursor-default rounded-lg border border-border text-primary py-2 pl-3 pr-10 text-left  ">
          <span className="block truncate">{value.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icons.chevronUpDown className="h-3 w-3 text-primary" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100">
          <Listbox.Options className="absolute mt-1 z-40  h-fit min-w-full w-fit  rounded-md bg-background   border  px-2  py-1 text-base  ">
            {values.map((item: any, Idx: number) => (
              <Listbox.Option
                key={Idx}
                disabled={item?.disabled || false}
                className={({ active }) =>
                  `relative cursor-pointer select-none rounded-md py-2 pl-6 pr-3 ${
                    active && !item?.disabled
                      ? "bg-muted text-primary"
                      : item?.disabled
                      ? "text-indigo-600"
                      : "text-primary"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.label}
                    </span>
                    {selected && !item?.disabled ? (
                      <span className="absolute inset-y-0 left-1 flex items-center text-primary">
                        <Icons.check className="h-3 w-3" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
