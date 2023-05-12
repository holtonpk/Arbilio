"use client";

import React, { useState } from "react";
import { HiDotsCircleHorizontal, HiDotsHorizontal } from "react-icons/hi";
import {
  MdAdd,
  MdCheckCircle,
  MdCheckCircleOutline,
  MdEdit,
  MdModeEditOutline,
} from "react-icons/md";
import { RiVisaLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/Auth";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { formatDate } from "@/lib/utils";
const stripe = require("stripe")(
  "sk_test_51KsFpgEewcpAM4MfqUhXKeEnFfdHkN0Btxdxi4pLQzB45cOWyGtk1ujQsZWfT5RIOcijIZqyIrUpeVfJtGxHuMmz00rGEWP0qm"
);

const Billing = () => {
  const { currentUser } = useAuth()!;
  const isPremium = usePremiumStatus(currentUser);

  return (
    <div className="h-full flex-grow p-8">
      <h2 className="font-bold text-2xl mb-4 text-primary">Billing</h2>

      <div className="flex flex-col gap-2">
        <Plans />
        <div className="grid grid-cols-2">
          <PlanDetails />
          <BillingInfo />
        </div>
        <PaymentMethod />
        <BillingHistory />
      </div>
    </div>
  );
};

export default Billing;

const BillingHistory = () => {
  // async function getInvoices() {
  //   const invoices = await stripe.invoices.list({
  //     customer: "cus_Ns5BZPlhGnvG7w",
  //   });

  //   return invoices;
  // }

  const [invoices, setInvoices] = useState<any>(undefined);

  // React.useEffect(() => {
  //   async function fetchInvoices() {
  //     const data = await getInvoices();
  //     setInvoices(data.data);
  //   }
  //   fetchInvoices();
  // }, []);

  // console.log("i", invoices);

  return (
    <div className="flex flex-col gap-2 p-4">
      <h3 className="font-bold text-primary">Billing History</h3>

      <div className="flex flex-col gap-2 w-full  max-h-[300px]">
        <div className="flex flex-row justify-between border-2 border-border rounded-md p-2 px-6">
          <h4 className="text-primary  w-[40%]">Invoice</h4>
          <h4 className="text-primary ">Date</h4>
          <h4 className="text-primary ">Amount</h4>
        </div>
        <div className="flex flex-col gap-1 overflow-scroll rounded-md">
          {invoices &&
            invoices.map((invoice: any, i: number) => (
              <div
                key={i}
                className="flex flex-row justify-between border-2 border-border p-4 px-6  border-b-2"
              >
                <h4 className="text-primary font-bold  w-[40%]">
                  Basic Plan - Apr 2023
                </h4>
                <h4 className="text-primary">
                  {formatDate(invoice?.status_transitions.paid_at)}
                </h4>
                <h4 className="text-primary">
                  {"$" + invoice?.amount_paid / 100}
                </h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h3 className="font-bold text-primary">Payment Method</h3>
      <div className="flex items-center justify-between w-full  rounded-md border-2 border-border p-4">
        <div className="flex flex-row gap-2 items-center">
          <span className="bg-muted flex justify-center p-1 rounded-md items-center">
            <RiVisaLine className="text-2xl text-primary" />
          </span>
          <h4 className="text-primary">Visa **** 1234</h4>
        </div>
        <div className="flex gap-2 items-center">
          <h4 className="text-primary/60">Expires 02/23</h4>
          <button className="flex items-center gap-1">
            <HiDotsHorizontal className="text-primary/60 h-4 w-4" />
          </button>
        </div>
      </div>
      <button className="flex items-center gap-1 w-fit  mx-auto">
        <MdAdd className="text-primary/60 h-4 w-4" />
        <h4 className="text-primary/60">Add Payment Method</h4>
      </button>
    </div>
  );
};

const BillingInfo = () => {
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);

  const getBilling = async () => {
    const paymentMethods = await stripe.customers.listPaymentMethods(
      "cus_Ns5BZPlhGnvG7w",
      { type: "card" }
    );
    console.log("pm==>", paymentMethods.data[0]);
  };

  getBilling();

  return (
    <div className="flex flex-col gap-2 p-4">
      <h3 className="font-bold text-primary">Billing Information</h3>

      <div className="flex flex-col gap-4 w-full  rounded-md border-2 border-border p-4 relative">
        <div className="flex gap-2 justify-between">
          <h4 className="w-[20%]">Name</h4>

          <input
            value="Bill Smith"
            type="text"
            disabled={!edit}
            className={`${
              edit ? "border-2 border-input " : "border-none p-0"
            }  flex h-10  w-[70% rounded-md text-primary  bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
          />
        </div>
        <div className="flex gap-2  justify-between">
          <h4 className="w-[20%]">Address</h4>
          <textarea
            value="1234 example st NewYork, NY 12345 US"
            disabled={!edit}
            // resizable="false"
            className={`${
              edit ? "border-2 border-input " : "border-none p-0"
            }  flex h-fit w-[70%] rounded-md text-primary  bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
          />
        </div>
        <Button
          onClick={toggleEdit}
          className={`${
            edit ? "relative w-full mt-3 py-3" : "absolute  top-3 right-3"
          }  `}
          variant={edit ? "default" : "outline"}
          size={edit ? "lg" : "sm"}
        >
          {edit ? "Update" : <MdEdit className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
};

const PlanDetails = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h3 className="font-bold text-primary">Plan Details</h3>
      <div className="flex flex-col gap-4 w-full  rounded-md border-2 border-border p-4">
        <div className="flex flex-row justify-between">
          <h4 className="font-bold">Plan</h4>
          <h4 className="text-primary/60">Free</h4>
        </div>
        <div className="flex flex-row justify-between">
          <h4 className="font-bold">Price</h4>
          <h4 className="text-primary/60">$0</h4>
        </div>
        <div className="flex flex-row justify-between">
          <h4 className="font-bold">Next Billing Date</h4>
          <h4 className="text-primary/60">20 Apr, 2023</h4>
        </div>
        <div className="flex flex-row justify-between">
          <h4 className="font-bold">Billing Frequency</h4>
          <h4 className="text-primary/60">Monthly</h4>
        </div>
        <div className="w-full bg-primary py-2 text-center  font-bold rounded-md text-background">
          Pay Annually & Save 20%
        </div>
      </div>
    </div>
  );
};

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState<
    "Free" | "Pro" | "Enterprise"
  >("Free");

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-bold text-primary">Plans</h3>
      <div className="grid grid-cols-3 gap-4">
        <PlanCard
          title="Free"
          price="$0"
          description="Free forever. No credit card required."
          features={[
            "Unlimited projects",
            "Unlimited collaborators",
            "Unlimited storage",
          ]}
          isCurrentPlan={selectedPlan == "Free"}
          setPlan={setSelectedPlan}
        />
        <PlanCard
          title="Pro"
          price="$10"
          description="Billed monthly"
          features={[
            "Unlimited projects",
            "Unlimited collaborators",
            "Unlimited storage",
          ]}
          isCurrentPlan={selectedPlan == "Pro"}
          setPlan={setSelectedPlan}
        />
        <PlanCard
          title="Enterprise"
          price="$100"
          description="Billed monthly"
          features={[
            "Unlimited projects",
            "Unlimited collaborators",
            "Unlimited storage",
            "Unlimited storage",
          ]}
          isCurrentPlan={selectedPlan == "Enterprise"}
          setPlan={setSelectedPlan}
        />
      </div>
    </div>
  );
};

const PlanCard = ({
  title,
  price,
  description,
  features,
  isCurrentPlan,
  setPlan,
}: any) => {
  return (
    <div className="w-fit gap-4 rounded-lg border p-4 flex flex-col items-center">
      <div className="flex flex-col gap-4 text-center">
        <div>
          <h4 className="text-7xl font-bold">{price}</h4>
          <p className="text-sm font-medium text-muted-foreground">
            Billed Monthly
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <h3 className="text-xl font-bold ">
          What&apos;s included in the {title} plan
        </h3>
        <ul className="grid gap-2 text-sm text-muted-foreground w-fit ">
          {features.map((feature: any, i: number) => (
            <li key={i} className="flex items-center">
              <MdCheckCircleOutline className="mr-2 h-4 w-4" /> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
