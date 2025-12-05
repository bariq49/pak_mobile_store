'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import Input from '@/components/shared/form/input';
import EmailIcon from '@/components/icons/email-icon';
import Text from '@/components/shared/text';
import Heading from '@/components/shared/heading';
import cn from 'classnames';
import {SendHorizontal} from "lucide-react";
import {getDirection} from "@/utils/get-direction";
import {usePanel} from "@/hooks/use-panel";
import { colorMap } from '@/data/color-settings';

interface NewsLetterFormValues {
    email: string;
}

const defaultValues = {
    email: '',
};

function SubscriptionForm({variant}: { variant?: string; }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<NewsLetterFormValues>({
        defaultValues,
    });
    const { selectedColor,selectedDirection } = usePanel();
    const dir = selectedDirection;
    
    const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
    function onSubmit(values: NewsLetterFormValues) {
        // show success message
        setSubscriptionSuccess(true);
        
        // remove success message after 3 seconds
        setTimeout(() => {
            setSubscriptionSuccess(false);
        }, 5000);
        
        // reset form after submit
        //e.target.reset();
    }
    
    return (
        <>
        <form
            noValidate
            className="flex relative"
            onSubmit={handleSubmit(onSubmit)}
        >
          <span className="flex items-center absolute ltr:left-0 rtl:right-0 top-0 h-12 px-3.5 transform">
            <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]"/>
          </span>
            <Input
                placeholder="Your email address"
                type="email"
                id="subscription-email"
                variant="outline"
                className="w-full"
                inputClassName={cn('ps-10 md:ps-10 pe-10 md:pe-10 2xl:px-11 h-12 rounded-md bg-transparent border-white/20 dark:border-black/10 focus:outline-none focus:drop-shadow-outline text-gray-400',
                    {
                        'xs:border-black/20 focus:xs:border-black/50': variant === 'home10',
                    }
                )}
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
           
            
            { variant === 'home10' ? (
                <button
                    className={`bg-brand-dark ${colorMap[selectedColor].hoverBg} text-sm font-medium text-brand-light md:h-12 py-2 px-10   focus:outline-none focus:shadow-outline ${dir == 'rtl' ? 'rounded-l -mr-1' : 'rounded-r -ml-1'}`}
                    aria-label="Subscribe Button"
                >
                    Subscribe
                </button>
            ):(
                <button
                    className="absolute ltr:right-0 rtl:left-0 top-0 hover:text-brand-light/50 focus:outline-none h-12 px-3 lg:px-3.5 transform"
                    aria-label="Subscribe Button"
                >
                    <SendHorizontal/>
                </button>
            )}
           
        </form>
        {!errors.email && subscriptionSuccess && (
            <p className="my-3 text-sm text-fill-footer">
                Thank you for subscribing to our newsletter
            </p>
        )}
        </>
    );
}

interface Props {
    className?: string;
    variant?: string;
}
const bgNewletter = '/assets/images/bg_newsletter_bottom.png';

const WidgetSubscription: React.FC<Props> = ({className, variant}) => {
    // Conditionally apply the backgroundImage style
    const backgroundStyle = variant === 'home10' && bgNewletter ? { backgroundImage: `url(${bgNewletter})` } : {};
    
    return (
        <div className={cn({
            'text-brand-dark': variant === 'home7',
            ' bg-no-repeat bg-[length:180px_auto]  ltr:bg-right-bottom rtl:bg-left-bottom':  variant === 'home10',
        }, className)}
             style={backgroundStyle}
        >
            <Heading variant="mediumHeading" className={cn(' mb-4 lg:mb-5',
                {
                    'text-brand-light': variant === 'default' ||  variant === 'basic' || variant === 'home7',
                })}
            >
                Sign Up For Newsletter
            </Heading>
            
            <Text variant={'small'} className={cn("pb-8 mb-0 text-fill-footer")}>
                Get the latest updates on new products and upcoming sales
            </Text>
            <SubscriptionForm variant={variant}/>
        </div>
    );
};

export default WidgetSubscription;
