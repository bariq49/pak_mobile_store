'use client';

import Input from '@/components/shared/form/input';
import Button from '@/components/shared/button';
import TextArea from '@/components/shared/form/text-area';
import { useForm } from 'react-hook-form';
import Heading from "@/components/shared/heading";
import Text from "@/components/shared/text";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  function onSubmit(values: ContactFormValues) {
    console.log(values, 'Contact');
  }


  return (
      <>
          <Heading variant="heading" className="mb-4">
              Get in Touch
          </Heading>
          <Text className="xl:leading-6 lg:mb-6 sm:text-15px">
              If you’ve got great products your making or looking to work with us then drop us a line.
          </Text>
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Input
        label="Full Name *"
        placeholder="Enter Your Full Name"
        {...register('name', { required: 'You must need to provide your full name' })}
        error={errors.name?.message}
      />
      
      <Input
        type="email"
        label="Email Address *"
        placeholder="Enter Your Email"
        {...register('email', {
          required: 'You must need to provide your email address',
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Please provide valid email address',
          },
        })}
        error={errors.email?.message}
      />
      
      <TextArea
        label="Message"
        {...register('message')}
        placeholder="Message.."
      />
      <Button variant="formButton" className="w-full" type="submit">
          Send Message
      </Button>
    </form>
      </>
  );
};

export default ContactForm;
