import { lusitana } from '@/components/ui/fonts';
import { ArrowRightEndOnRectangleIcon, CalculatorIcon } from '@heroicons/react/24/outline';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <CalculatorIcon className="size-12 rotate-[15deg]" />
      <p className="text-[44px]">FridgeBot</p>
    </div>
  );
}
