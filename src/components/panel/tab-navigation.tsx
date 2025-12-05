import { Tab, TabList } from "@headlessui/react"
import { Palette, Layout, Layers } from "lucide-react"
import type { TabType } from "@/services/types"
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";

interface TabNavigationProps {
    tabs: TabType[]
}

export function TabNavigation({ tabs }: TabNavigationProps) {
    const { selectedColor } = usePanel();
    
    return (
        <TabList className="flex justify-center border-b border-border-base bg-white px-4">
            <div className="flex w-full max-w-md">
                {tabs.map((tab) => (
                    <Tab
                        key={tab}
                        className={({ selected }) => `
                          flex-1 flex flex-col items-center py-3 outline-none
                          ${selected ? colorMap[selectedColor].text+" "+ colorMap[selectedColor].border+" border-b-2 " : "text-gray-500"}
            `}
                    >
                        {tab === "COLOR" && <Palette className="h-5 w-5" />}
                        {tab === "LAYOUT" && <Layout className="h-5 w-5" />}
                        {tab === "THEME" && <Layers className="h-5 w-5" />}
                        <span className="text-xs mt-1 font-semibold">{tab}</span>
                    </Tab>
                ))}
            </div>
        </TabList>
    )
}

