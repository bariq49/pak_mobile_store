import { useState } from 'react';
import Input from '@/components/shared/form/input';
import Button from '@/components/shared/button';
import { useForm } from 'react-hook-form';
import TextArea from '@/components/shared/form/text-area';
import Heading from '@/components/shared/heading';
import Text from '@/components/shared/text';
import cn from 'classnames';
import Rate from '@/components/shared/rate';

interface ReviewFormProps {
  className?: string;
}
interface ReviewFormValues {
  name: string;
  email: string;
  cookie: string;
  message: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({  className = '' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>();
  const [rating_custom_icon, set_rating_custom_icon] = useState(5);
  function onSubmit(values: ReviewFormValues) {
    console.log(values, 'review');
  }

  return (
    <div className={cn(className)}>
      <Heading className="mb-2">Write your review</Heading>
      <Text>
        Your email address won’t be shared. Required fields are marked*
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto mt-5 lg:mt-7 xl:mt-9"
        noValidate
      >
        <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
          <div className="pb-1.5 flex items-center">
            <label className="block text-sm leading-none cursor-pointer shrink-0 text-brand-dark md:text-15px ltr:pr-3 rtl:pl-3">
              Your Rating
            </label>
            <Rate
              size="lg"
              defaultValue={5}
              value={rating_custom_icon}
              className="-mb-2"
              onChange={(value) => set_rating_custom_icon(value)}
            />
          </div>
          <Input
              label="Full Name *"
              placeholder="Enter Your Full Name"
            {...register('name', { required: 'You must need to provide your full name' })}
            error={errors.name?.message}
            variant="solid"
          />
          <Input
              label="Email Address *"
              placeholder="Enter Your Email"
              type="email"
              {...register('email', {
                required: 'You must need to provide your email address',
                pattern: {
                  value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please provide valid email address",
                },
              })}
              error={errors.email?.message}
              variant="solid"
          />
          <TextArea
            variant="solid"
            label="Message"
            {...register('message', { required: 'You must need to provide Message' })}
            error={errors.message?.message}
          />
         
          <div className="pt-1">
            <Button
              type="submit"
              className="w-full h-12 text-sm md:mt-1 lg:text-base sm:w-auto"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
