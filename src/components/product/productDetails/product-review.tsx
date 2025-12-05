import ReviewCard from '@/components/cards/review-card';
import ReviewForm from "@/components/product/productDetails/review-form";
import cn from "classnames";
import Heading from "@/components/shared/heading";
import Cookies from "js-cookie";
import { useUI } from '@/hooks/use-UI';

const data = [
    {
        id: 1,
        rating: 4,
        date: "04/06/2025",
        title: 'very poor',
        comment:
            'I like this style!',
        userName: 'Luhan Nguyen',
    },
    {
        id: 2,
        date: "04/06/2025",
        rating: 5,
        title: 'refe',
        comment:
            '二v俄铝',
        userName: 'Luhan Nguyen',
    },
    {
        id: 3,
        date: "04/06/2025",
        rating: 4,
        title: 'Amazingly Soft Sweater',
        comment:
            'This is my second of these jumpers - I love how light and warm they are especially under a jacket. They breathe well and dont require regular washing. I have gently handwashed my old one in warm water once or twice without any issues. The sleeves are flattering and I don\'t find the wool itchy, it softens up after a couple of wears. I sized down and it\'s still a lovely oversized fit.\n',
        userName: 'Luhan Nguyen',
    },
    {
        id: 4,
        date: "04/06/2025",
        rating: 5,
        title: 'Amazingly Soft Sweater',
        comment:
            'no quality',
        userName: 'John Nguyen',
    },
    {
        id: 5,
        date: "04/06/2025",
        rating: 5,
        title: 'Amazingly Soft Sweater',
        comment:
            'This is my second of these jumpers - I love how light and warm they are especially under a jacket. They breathe well and dont require regular washing.',
        userName: 'John Nguyen',
    },
];

interface ReviewProps {
    useHeading?: boolean;
    className?: string;
}


const ProductReview: React.FC<ReviewProps> = ({className, useHeading = false}) => {
    const { isAuthorized } = useUI();
    const isLoggedIn = isAuthorized ?? !!Cookies.get('auth_token');
    return (
        <>
            {useHeading && (
                <Heading variant="titleLarge" className="mb-5 lg:mb-10 text-center p-1.5 px-4  bg-gray-100/80 rounded">
                    Customer Reviews
                </Heading>
            )}
            <div className={cn('lg:flex ',
                className
            )}>
                <div className="pt-2 basis-2/2">
                    {data?.map((item, index) => (
                        <ReviewCard review={item} index={index} key={`review-key-${item.id}`}/>
                    ))}
                </div>
                
                {isLoggedIn && (
                    <ReviewForm
                        className="basis-1/2 lg:ps-10  xl:ps-14  3xl:ps-20  shrink-0 pt-10"
                    />
                )}
                
            </div>
        </>
    
    );
};

export default ProductReview;
