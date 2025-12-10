"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import cn from "classnames";
import DescriptionTabContent from "./DescriptionTabContent";
import AdditionalInfoTabContent from "./AdditionalInfoTabContent";
import ReturnPoliciesTabContent from "./ReturnPoliciesTabContent";
import ReviewRatingTabContent from "./ReviewRatingTabContent";

interface ProductDetailsTabProps {
  data: any;
}

export default function ProductDetailsTab({ data }: ProductDetailsTabProps) {
  const tabs = {
    Description: <DescriptionTabContent data={data} />,
    Additional_Information: <AdditionalInfoTabContent data={data} />,
    Return_Policies: <ReturnPoliciesTabContent data={data} />,
    Review_Rating: <ReviewRatingTabContent data={data} />,
  };

  return (
    <div className="w-full mb-8 lg:mb-10">
      <TabGroup>
        <TabList className="border-b border-border-base flex flex-wrap gap-2">
          {Object.keys(tabs).map((key) => (
            <Tab
              key={key}
              className={({ selected }) =>
                cn(
                  "relative inline-block border-b-2 transition-all text-base font-semibold uppercase leading-5 focus:outline-none pb-2 md:pb-4 mt-2 xs:mt-0 me-5 xl:me-10 hover:text-primary-500",
                  selected
                    ? `text-brand-dark border-primary-500`
                    : "border-transparent"
                )
              }
            >
              {key.split("_").join(" ")}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-6 lg:mt-9">
          {Object.entries(tabs).map(([key, content]) => (
            <TabPanel key={key}>{content}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
