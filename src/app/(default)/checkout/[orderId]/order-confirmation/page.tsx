import { Metadata } from "next";
import Container from "@/components/shared/container";
import OrderInformation from "./OrderInformation";

export const metadata: Metadata = {
  title: "Order",
};

export default async function Order() {
  return (
    <Container>
      <OrderInformation />
    </Container>
  );
}
