import {useForm} from 'react-hook-form';
import Input from '@/components/shared/form/input';
import EmailIcon from '@/components/icons/email-icon';
import Text from '@/components/shared/text';
import Heading from '@/components/shared/heading';
import {getDirection} from '@/utils/get-direction';
import cn from 'classnames';
import Container from '@/components/shared/container';
import { FaArrowRightLong } from "react-icons/fa6";
import {colorMap} from "@/data/color-settings";
import { usePanel } from "@/hooks/use-panel";
import {useState} from "react";
import NewletterIcon from "@/components/icons/newletter-icon";

interface Props {
    className?: string;
    variant?: string;
}

interface NewsLetterFormValues {
    email: string;
}

const defaultValues = {
    email: '',
};
const WidgetSignup: React.FC<Props> = ({ className, variant = 'default'}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<NewsLetterFormValues>({
        defaultValues,
    });
    const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
    function onSubmit(values: NewsLetterFormValues) {
        // show success message
        setSubscriptionSuccess(true);
        
        // remove success message after 3 seconds
        setTimeout(() => {
            //setSubscriptionSuccess(false);
        }, 5000);
        
       
    }
    
    const { selectedColor,selectedDirection } = usePanel();
    const dir = selectedDirection;
    
    return (
        <div className={cn('grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-8', className)}>
            <div className={"subs-heading flex gap-2 sm:gap-5 mb-3"}>
                <NewletterIcon className="w-[52px] h-[52px]" color={"white"}/>
                <div className={"subs-heading__left"}>
                    <Heading variant="checkoutHeading" className={"text-brand-light"}>
                        Sign Up For Newsletter
                    </Heading>
                    <Text variant={'small'}>
                        Join 60.000+ Subscribers and get a new discount coupon on every Saturday.
                    </Text>
                </div>
            </div>
            <form
                className="flex relative z-10 max-w-[600px]  lg:w-[600px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                    <span className="flex items-center absolute start-0 top-0 h-12 px-3.5 transform">
                      <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]"/>
                    </span>
                <Input
                    placeholder="Your email address"
                    type="email"
                    id="subscription-email"
                    variant="solid"
                    className="w-full"
                    inputClassName={`ps-10 md:ps-10 pe-10 md:pe-10 2xl:px-11 h-12 border-2 border-black/10  focus:outline-none focus:shadow-outline ${dir =='rtl' ? 'rounded-r-3xl':'rounded-l-3xl'}`}
                    {...register('email', {
                        required: `You must need to provide your email address`,
                        pattern: {
                            value:
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: `Please provide valid email address`,
                        },
                    })}
                    error={errors.email?.message}
                />
                
                <button
                    className={cn(colorMap[selectedColor].bg,dir =='rtl' ? 'rounded-l-3xl -mr-1':'rounded-r-3xl -ml-1'," text-sm font-semibold text-brand-light md:h-12 py-2 px-10   focus:outline-none focus:drop-shadow-outline  transform  rounded-e-md -ml-1")}
                    aria-label="Subscribe Button"
                >
                    Subscribe
                </button>
            </form>
            
            {!errors.email && subscriptionSuccess && (
                <p className="my-3 text-sm  max-w-[600px]  lg:w-[600px]">
                    Thank you for subscribing to our newsletter
                </p>
            )}
            
        </div>
    );
};

export default WidgetSignup;
