import {Metadata} from 'next';
import Heading from "@/components/shared/heading";
import Text from "@/components/shared/text";
import Button from "@/components/shared/button";

export const metadata: Metadata = {
    title: 'Billing',
};

export default async function changeBillingPage() {
    return (
        <>
            <Heading variant="titleMedium">Payments & payouts</Heading>
            <div className="flex flex-col pt-6 2xl:pt-8">
                <Text className="xl:leading-6 lg:mb-6 sm:text-15px">
                    Our secure payment platform supports a range of payout options, all of which can be set up below. For more details, please check the FAQ
                
                </Text>
                <Text className="xl:leading-6 lg:mb-6 text-15px">
                    To receive your payment, you'll need to set up a payout method. Payouts are typically disbursed around 24 hours after a guest's scheduled time,
                    and the time it takes for the funds to show up in your account depends on the specific method you've chosen. Learn more.
                
                </Text>
            </div>
            <div className="relative mt-3">
                <Button
                    type="submit"
                    variant="formButton"
                    className="w-full sm:w-auto"
                >
                    Add payout method
                </Button>
            </div>
        </>
    );
}
