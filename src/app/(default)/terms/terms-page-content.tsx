'use client';

import Container from '@/components/shared/container';
import { termsCondition } from '@/data/terms-settings';
import Heading from '@/components/shared/heading';

export default function TermsPageContent() {
  return (
    <div className="py-7 lg:py-8 ">
      <Container>
        <div className="w-full p-5 md:p-10  bg-white rounded-md">
          {termsCondition?.map((item) => (
            <div
              key={item.title}
              className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
            >
              <Heading className="mb-4 lg:mb-6 text-lg" variant="title">
                {item.title}
              </Heading>
              <div
                className="space-y-5 text-sm leading-7 text-brand-muted lg:text-15px"
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
