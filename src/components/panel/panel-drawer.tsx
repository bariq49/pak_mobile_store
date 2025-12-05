

import { TabGroup,  TabPanel, TabPanels } from '@headlessui/react'
import { TabNavigation } from "@/components/panel/tab-navigation"
import PanelColor from "@/components/panel/panel-color"
import { PanelLayout } from "@/components/panel/panel-layout"
import { PanelTheme } from "@/components/panel/panel-theme"
import type { TabType } from "@/services/types"
import {usePanel} from "@/hooks/use-panel";

export default function PanelCustomizer() {
    const tabs: TabType[] = ["COLOR", "LAYOUT", "THEME"]
    const { selectedTab,setSelectedTab } = usePanel();
    return (
        <div className="bg-gray-100 min-h-screen">
           
            <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
                <TabNavigation tabs={tabs}/>
                
                <TabPanels className="p-4 max-w-md mx-auto">
                    <TabPanel>
                        <PanelColor/>
                    </TabPanel>
                    <TabPanel>
                        <PanelLayout/>
                    </TabPanel>
                    <TabPanel>
                        <PanelTheme/>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        
        </div>
    )
}

