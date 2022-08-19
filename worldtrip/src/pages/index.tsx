import { Text } from "@chakra-ui/react";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import { Slider } from "../components/Slider";
import { TravelTypes } from "../components/TravelTypes";
import { images } from "../utils/images";

export default function Home () {
  return (
    <>
      <Header />
      <Banner />
      <TravelTypes />
      <Text fontWeight='medium' fontSize='4xl' color='gray.600' textAlign='center' mt={14} mx='auto'>Vamos nessa?<br />Então escolha seu continente</Text>
      <Slider content={images.slider} />
    </>
  );
};
