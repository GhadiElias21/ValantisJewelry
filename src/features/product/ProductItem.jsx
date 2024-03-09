/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";
import diamondImage from '../../assets/diamond.webp'
export default function ProductItem({ item }) {
  const { id, price, brand, product } = item;

  return (
    <div className="bg-black-200">
      <Card
        isFooterBlurred
        className="w-full h-[400px] bg-stone-200 transition duration-300 col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-large text-stone-200 uppercase bg-black bg-opacity-40 font-bold">
            {product}
          </p>
          <h4 className="text-white/90 font-medium text-xl bg-opacity-70 bg-red-500">
            {brand ? brand : ""}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          
          className="z-0 w-full h-full object-cover"
          src={diamondImage}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex  ">
              <p className="text-large mr-10 text-white/90">${price}</p>
            </div>
          </div>
          <Button variant="solid" color="danger" radius="full" size="sm">
            Buy
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
