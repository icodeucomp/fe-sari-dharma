"use client";

import * as React from "react";
import { Container } from "@/components";
import { TabsField } from "../tabs-field";

export const SocialMedia = () => {
  const [activeTab, setActiveTab] = React.useState<"youtube" | "instagram">("youtube");

  return (
    <Container className="py-16 space-y-8">
      <div className="flex py-4 overflow-hidden rounded-md">
        <button
          className={`border w-full relative font-semibold rounded-s-md py-2 ${activeTab === "youtube" ? "bg-primary text-light border-primary" : "text-gray bg-light border-gray/50"}`}
          onClick={() => setActiveTab("youtube")}
        >
          YouTube
          <i className={`absolute rotate-45 -translate-x-1/2 -bottom-2 size-4 bg-primary left-1/2 ${activeTab === "youtube" ? "block" : "hidden"}`}></i>
        </button>
        <button
          className={`border w-full relative font-semibold rounded-e-md py-2 ${activeTab === "instagram" ? "bg-primary text-light border-primary" : "text-gray bg-light border-gray/50"}`}
          onClick={() => setActiveTab("instagram")}
        >
          Instagram
          <i className={`absolute rotate-45 -translate-x-1/2 -bottom-2 size-4 bg-primary left-1/2 ${activeTab === "instagram" ? "block" : "hidden"}`}></i>
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "youtube" && <TabsField />}

        {activeTab === "instagram" && <TabsField />}
      </div>
    </Container>
  );
};
