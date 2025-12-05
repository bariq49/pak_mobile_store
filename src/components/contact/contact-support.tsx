'use client';
import { FC } from 'react';
import Text from '@/components/shared/text';
import Heading from '@/components/shared/heading';
import Link from "next/link";
import Image from "@/components/shared/image";
import {footerSettings} from "@/data/footer-settings";

const data = [
  {
    id: 1,
    name: 'Address',
    description: 'Acme Widgets 123 Widget Street Acmeville, AC 12345 United States of America',
  },
  {
    id: 2,
    name: 'Phone',
    description: '+222-1800-2628 </br> +888-1800-2628'
  },
  {
    id: 3,
    name: 'Email',
    description: 'contact@ibigecommerce.com',
  },
  {
    id: 4,
    name: 'Open Time',
    description: 'Our store has re-opened for shopping,</br> exchange Every day 11am to 7pm',
  },
];

interface Props {
  image?: HTMLImageElement;
}

const ContactSupport: FC<Props> = () => {
  const {social} = footerSettings;
  return (
    <div className="mb-0 3xl:ltr:pr-5 3xl:rtl:pl-5">
      <Heading variant="heading" className="mb-4">
        Visit Our Store
      </Heading>
     
      <div className="mx-auto space-y-5 mb-6">
        
        {data.map((item) => (
            <div
                key={`contact--key${item.id}`}
                className="flex flex-col "
            >
              <div className="mt-4 lg:mt-0">
                <Heading variant="base" className="text-12px  mb-2">
                  {item.name}
                </Heading>
                
                <div className={'text-15px leading-7'} dangerouslySetInnerHTML={{__html: item.description}}/>
              </div>
            
            </div>
        ))}
        
        {social && (
            <ul className="flex flex-wrap items-center  space-x-4 md:space-s-5 mx-auto mt-10">
              {social?.map((item) => (
                  <li
                      className="transition hover:opacity-80"
                      key={`social-list--key${item.id}`}
                  >
                    <Link href={item.path as any} >

                        <Image
                            src={item.image}
                            alt={item.name}
                            height={item.height}
                            width={item.width}
                            className="transform scale-85 md:scale-100"
                        />

                    </Link>
                  </li>
              ))}
            </ul>
        )}
        
      </div>
    
    </div>
  );
};

export default ContactSupport;
