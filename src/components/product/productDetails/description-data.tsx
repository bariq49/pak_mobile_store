// accordion-sections.tsx
import React from "react";
import Image from "@/components/shared/image";
import ProductReview from './product-review';

interface AccordionSectionType {
    [key: string]: React.ReactNode;
}

const descriptionData: AccordionSectionType = {
    Description: (
        <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5">
            <p>
                iPad Air with a vibrant 10.9-inch Liquid Retina display. Breakthrough Apple M1 chip for
                faster performance,
                making iPad Air super-powerful for creativity and mobile gaming. Get Touch ID, an
                advanced camera, lightning-fast 5G2 and Wi-Fi 6,
                a USB-C port, and support for the Magic Keyboard and Apple Pencil (2nd generation).
            </p>
            
            <Image
                src={"/assets/images/products/img_detail_0.png"}
                alt={'Product Image'}
                width={1330}
                height={447}
                className="object-cover"
            />
            
            <h3 className={"text-brand-dark font-medium"}>Work wonders With ease</h3>
            <p>
                There are so many things you can do with iPad and all the amazing apps designed for it.
                Now App Library automatically organizes those apps for you.
                And new widgets let you see information at a glance, right on your Home Screen. iPad is
                the world's best note-taking device.
                And now Notes goes system‑wide with Quick Note, a fast and easy way to get to a note no
                matter what you're doing. Highlight text in Safari or add a link from an app,
                and you'll see a Quick Note thumbnail next time you visit the site,
                taking you right to what you were viewing before. And if you make a Quick Note on your
                iPad, it will be on your iPhone and Mac.
            </p>
            <p>
                We are not responsible for the content or privacy practices on any websites.
            </p>
            <p>
                We reserve the right, in our sole discretion, to modify, update, add to, discontinue,
                remove or otherwise change any
                portion of this Privacy Policy, in whole or in part, at any time. When we amend this
                Privacy Policy, we will revise the "last updated" date located at the top of this
                Privacy Policy.
            </p>
            <p>
                If you provide information to us or access or use the Website in any way after this
                Privacy Policy has been changed,
                you will be deemed to have unconditionally consented and agreed to such changes. The
                most current version of this Privacy Policy will be available on the Website and will
                supersede all previous versions of this Privacy Policy.
            </p>
        </div>
    ),
    Additional_Information: (
        <table className="w-full text-sm">
            <tbody>
            <tr className="bg-gray-50">
                <td className="py-3 px-4 text-brand-dark font-medium w-1/4">Color</td>
                <td className="py-3 px-4">Space Black, Silver, Red</td>
            </tr>
            <tr className="">
                <td className="py-3 px-4 text-brand-dark font-medium">Product Type</td>
                <td className="py-3 px-4">New, Renewed, Refurbished, Used</td>
            </tr>
            <tr className="bg-gray-50">
                <td className="py-3 px-4 text-brand-dark font-medium">Storage</td>
                <td className="py-3 px-4">64GB, 512GB, 2TB</td>
            </tr>
            <tr className="">
                <td className="py-3 px-4 text-brand-dark font-medium">Brand</td>
                <td className="py-3 px-4">Apple</td>
            </tr>
            <tr className="bg-gray-50">
                <td className="py-3 px-4 text-brand-dark font-medium">Chip (CPU)</td>
                <td className="py-3 px-4">Apple M1 with 8-core CPU, 8-core GPU</td>
            </tr>
            </tbody>
        </table>
    ),
    Return_Policies: (
        <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5">
            <h3 className={"text-brand-dark font-medium"}>
                The Company Private Limited
                Policy</h3>
            <p>
                The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically for the creative professional,
                this display provides more space for easier access to all the tools and palettes needed to edit, format and composite your work.
                Combine this display with a Mac Pro, MacBook Pro, or PowerMac G5 and there's no limit to what you can achieve.
            </p>
            <p>
                The Cinema HD features an active-matrix liquid crystal display that produces flicker-free images that deliver twice the brightness,
                twice the sharpness and twice the contrast ratio of a typical CRT display. Unlike other flat panels,
                it's designed with a pure digital interface to deliver distortion-free images that never need adjusting.
                With over 4 million digital pixels, the display is uniquely suited for scientific and technical applications such as
                visualizing molecular structures or analyzing geological data.
            </p>
            <p>
                We are not responsible for the content or privacy practices on any websites.
            </p>
            
            <p>
                Offering accurate, brilliant color performance, the Cinema HD delivers up to 16.7 million colors across a wide gamut allowing
                you to see subtle nuances between colors from soft pastels to rich jewel tones. A wide viewing angle ensures uniform color from edge to edge.
                Apple's ColorSync technology allows you to create custom profiles to maintain consistent color onscreen and in print. The result:
                You can confidently use this display in all your color-critical applications.
            </p>
            
            <p>
                The Cinema HD features a single cable design with elegant breakout for the USB 2.0, FireWire 400 and a pure digital connection using the
                industry standard Digital Video Interface (DVI) interface. The DVI connection allows for a direct pure-digital connection.
            </p>
        </div>
    ),
    Review_Rating: (
        <ProductReview />
    )
};

export default descriptionData;