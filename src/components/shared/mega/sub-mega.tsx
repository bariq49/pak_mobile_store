import ListMenu from '@/components/shared/mega/mega-menu';
import Container from '@/components/shared/container';
import Image from '@/components/shared/image';
import {productPlaceholder} from '@/assets/placeholders';
import Link from '@/components/shared/link';
import {MainMenuType, SubMenuType} from "@/services/types";
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import cn from "classnames";
import React from "react";

interface MenuProps {
    item: MainMenuType;

}

const SubMega: React.FC<MenuProps> = ({item}) => {
    const {
        mega_categoryCol,
        mega_bannerMode,
        mega_bannerImg: image,
        mega_bannerUrl,
        mega_contentBottom,
    } = item ;
    const {selectedColor} = usePanel();
    let isBannerMode = false;
    if (mega_bannerMode == 'left' || mega_bannerMode == 'right') isBannerMode = true;

    return (
        <>
            <Container className={"lg:max-w-[1430px]"}>
                <div className={`flex flex-row gap-5 pt-8 py-5`}>
                    <div
                        className={`cateArea ${isBannerMode ? 'basis-9/12' : 'basis-full'} `}
                    >
                        <ul
                            className={`text-body text-sm grid grid-cols-${mega_categoryCol} gap-4 lg:gap-5 `}
                        >
                            {item.subMenu.map((menu: SubMenuType, index: number) => {
                                const dept: number = 1;
                                const menuName: string = `sidebar-menu-${dept}-${index}`;
                                return (
                                    <ListMenu
                                        dept={dept}
                                        data={menu}
                                        hasSubMenu={!!menu.subMenu}
                                        menuName={menuName}
                                        key={menuName}
                                        menuIndex={index}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                    {isBannerMode && (
                        <div
                            className={`imageArea basis-3/12 ${
                                mega_bannerMode == 'left' && 'order-first'
                            }`}
                        >
                            <Link href={mega_bannerUrl} className="text-brand-dark ">
                                <div className="card-img-container">
                                    <Image
                                        src={image ?? productPlaceholder}
                                        alt={'Product Image'}
                                        width={450}
                                        height={300}
                                        className="rounded object-cover bg-skin-thumbnail"
                                    />
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </Container>
            {mega_contentBottom && mega_contentBottom?.trim().length != 0 && (
                <div className={cn("navPages-content-bottom ", colorMap[selectedColor].bg)}>
                    <Container>
                        <div
                            className={`text-brand-light text-sm text-center py-4`}
                            dangerouslySetInnerHTML={{__html: mega_contentBottom}}
                        />
                    </Container>
                </div>
            )}
        </>
    );
};

export default SubMega;
