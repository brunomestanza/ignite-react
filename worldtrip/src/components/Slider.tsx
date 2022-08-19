import Link from 'next/link';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Center, Image, Text } from '@chakra-ui/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ISliderProps {
  content: Array<{
    id: string,
    slug: string,
    title: string,
    subtitle: string,
    img: string,
  }>
};

export function Slider({ content }: ISliderProps) {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={1}
      spaceBetween={1}
      navigation
      pagination
      cssMode
      className="mySwiper"
    >
      {content.map((item) => (
        <SwiperSlide key={item.id}>
          <Center
            position="relative"
            flexDir="column"
            w="100%"
            h="100%"
            overflow="hidden"
          >
            <Image
              src={item.img}
              alt="slider image"
              bgSize="cover"
              bgAttachment="fixed"
              bgRepeat="no-repeat"
              filter={'brightness(0.3)'}
            />
            <Link href={`/continent/${item.slug}`}>
              <Center
                flexDir="column"
                position="absolute"
                top="50%"
                transform={['translateY(-50%)']}
                transition={'filter 0.2s'}
                _hover={{ filter: 'brightness(0.8)' }}
              >
                <Text
                  fontFamily="Poppins"
                  fontWeight="bold"
                  fontSize={['2xl', '5xl']}
                  color="white"
                >
                  {item.title}
                </Text>
                <Text
                  fontFamily="Poppins"
                  fontWeight="medium"
                  fontSize={['sm', '2xl']}
                  color="white"
                >
                  {item.subtitle}
                </Text>
              </Center>
            </Link>
          </Center>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
