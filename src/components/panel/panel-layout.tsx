import {usePanel} from "@/hooks/use-panel";
import {footerLayouts, headerLayouts} from "@/components/panel/data";
import {LayoutCard} from "@/components/panel/panelCardUI/layout-card";

const headerImg = "/assets/demos/panel/header_default.png";
const footerImg = "/assets/demos/panel/footer_default.png";

export function PanelLayout() {
    const { selectedLayout,selectedFooter,setSelectedLayout,setSelectedFooter  } = usePanel();
    
    return (
        <div className="space-y-4">
            {/* Header Layout Selection */}
            <LayoutCard heading={"Header Layout"} layouts={headerLayouts} selectedLayout={selectedLayout} setSelectedLayout={setSelectedLayout} images={headerImg} />
            
            {/* Footer Layout Selection */}
            <LayoutCard heading={"Footer Layout"} layouts={footerLayouts} selectedLayout={selectedFooter} setSelectedLayout={setSelectedFooter} images={footerImg} />
        </div>
    )
}


