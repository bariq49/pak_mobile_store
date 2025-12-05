import Container from '@/components/shared/container';
import {Metadata} from 'next';
import PageHeroSection from "@/components/shared/page-hero-section";
import StoresLocation from "@/components/our-store/store-location";
import { dataStores } from '@/components/our-store/data';
export const metadata: Metadata = {
    title: 'Store locations',
};

export default async function Page() {
  
  return (
      <>
          <PageHeroSection heroTitle="Store locations"/>
          <Container className={"my-10"}>
             <StoresLocation dataStores={dataStores}/>
          </Container>
      </>
  );
}
