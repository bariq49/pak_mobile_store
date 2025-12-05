'use client';
import TestimonialCard from '@/components/collection/testimonial-card';
import Carousel from '@/components/shared/carousel/carousel';
import {SwiperSlide} from '@/components/shared/carousel/slider';

const data = [
    {
        id: 1,
        slug: '#',
        image: '/assets/images/support/1.jpg',
        description: '“The experience with Razor has been nothing short of amazing. So much better than other themes I’ve used – wish I had seen this one first and saved my wasted time and money on other themes! I’d recommend this theme in a heartbeat!”',
        author_name: 'Siarhei Dzenisenka',
        author_position: 'Founder/CEO'
    },
    {
        id: 2,
        slug: '#',
        image: '/assets/images/support/2.jpg',
        description: '“The experience with Razor has been nothing short of amazing. So much better than other themes I’ve used – wish I had seen this one first and saved my wasted time and money on other themes! I’d recommend this theme in a heartbeat!”',
        author_name: 'Siarhei Dzenisenka',
        author_position: 'Founder/CEO'
    },
    {
        id: 3,
        slug: '#',
        image: '/assets/images/support/3.png',
        description: '“The experience with Razor has been nothing short of amazing. So much better than other themes I’ve used – wish I had seen this one first and saved my wasted time and money on other themes! I’d recommend this theme in a heartbeat!”',
        author_name: 'Siarhei Dzenisenka',
        author_position: 'Founder/CEO'
    }
];

interface Props {
    className?: string;
    uniqueKey?:string;
}


const Testimonial: React.FC<Props> = ({
                                          className = 'relative mb-8 ',
                                          uniqueKey='testimonial',
                                      }) => {
    return (
      <div className={className}>
      
        <Carousel
          autoplay={false}
          className="carouselTestimonial  border border-black/10 rounded"
          navigation = {false}
          pagination={{
            clickable: true,
          }}
          prevActivateId={`prev${uniqueKey}`}
          nextActivateId={`next${uniqueKey}`}
        >
          {data.map((item) => (
            <SwiperSlide key={`collection-key-${item.id}`}>
              <TestimonialCard  key={item.id} collection={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    );
};

export default Testimonial;
