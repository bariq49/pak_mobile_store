'use client';

import { useState } from 'react';
import Input from '@/components/shared/form/input';
import Button from '@/components/shared/button';
import TextArea from '@/components/shared/form/text-area';
import { useForm } from 'react-hook-form';
import Heading from "@/components/shared/heading";
import Text from "@/components/shared/text";
import { useContactFormMutation } from '@/services/contact/contact-api';
import { ContactFormData } from '@/services/contact/contact-types';
import toast from 'react-hot-toast';

const ContactForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const mutation = useContactFormMutation();

  const onSubmit = async (values: ContactFormData) => {
    try {
      const response = await mutation.mutateAsync(values);
      
      if (response.success && response.data) {
        setSuccess(true);
        setContactId(response.data.contactId);
        reset();
        const successMessage = response.message 
          ? `✓ ${response.message} It may take 5 to 10 minutes to receive the email.`
          : '✓ Your message has been received. It may take 5 to 10 minutes to receive the email.';
        toast.success(successMessage);
      } else {
        // Handle validation errors
        if (response.errors && response.errors.length > 0) {
          response.errors.forEach((error) => {
            toast.error(`${error.field}: ${error.message}`);
          });
        } else {
          toast.error(response.message || 'Failed to submit contact form. Please try again.');
        }
      }
    } catch (error: any) {
      // Handle network errors or other exceptions
      if (error.response?.status === 429) {
        toast.error('Too many submissions. Please wait before submitting another message.');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Network error. Please check your connection and try again.');
      }
    }
  };

  // Show success message
  if (success && contactId) {
    return (
      <>
        <Heading variant="heading" className="mb-4">
          Thank You!
        </Heading>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
          <Text className="xl:leading-6 lg:mb-4 sm:text-15px text-green-800 dark:text-green-200">
            Your message has been received. We will get back to you within 24-48 hours.
          </Text>
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded">
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reference ID:</Text>
            <Text className="text-lg font-mono font-bold text-green-700 dark:text-green-300">
              {contactId}
            </Text>
          </div>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Please save this reference ID for future correspondence.
          </Text>
        </div>
        <Button
          variant="formButton"
          className="w-full"
          onClick={() => {
            setSuccess(false);
            setContactId(null);
          }}
        >
          Send Another Message
        </Button>
      </>
    );
  }

  return (
    <>
      <Heading variant="heading" className="mb-4">
        Get in Touch
      </Heading>
      <Text className="xl:leading-6 lg:mb-6 sm:text-15px">
        If you've got great products your making or looking to work with us then drop us a line.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <Input
          label="Full Name *"
          placeholder="Enter Your Full Name"
          {...register('name', { 
            required: 'You must need to provide your full name',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            maxLength: { value: 100, message: 'Name cannot exceed 100 characters' },
          })}
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
          label="Message *"
          {...register('message', {
            required: 'Message is required',
            maxLength: { value: 5000, message: 'Message cannot exceed 5000 characters' },
          })}
          placeholder="Message.."
          error={errors.message?.message}
        />
        <Button 
          variant="formButton" 
          className="w-full" 
          type="submit"
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Send Message
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
