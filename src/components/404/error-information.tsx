import { ROUTES } from '@/utils/routes';
import Image from '@/components/shared/image';
import cn from "classnames";
import { usePanel } from "@/hooks/use-panel";
import Link from "@/components/shared/link";

const ErrorInformation: React.FC = () => {
  return (
    <div className="flex items-center justify-center px-12 py-20 text-center ">
      <div className="max-w-md xl:max-w-lg text-center">
        <Image src="/assets/images/404.png" alt="signin" width={500} height={300} />
        <div className="text-2xl md:text-4xl  font-semibold text-brand-dark">Ops! Page Not Found</div>
        <p className="text-15px md:text-base leading-6  pt-3 pb-7">
          The page you are looking for might have been removed had
          its name changed or is temporarily unavailable.
        </p>
        <Link
            href={ROUTES.HOME}
            variant={"button-primary"}
            className={cn("m-auto md:max-w-[300px] "
            )}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ErrorInformation;
