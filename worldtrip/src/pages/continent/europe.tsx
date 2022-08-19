import {
  Flex,
  Box,
  Text,
  Heading,
  useBreakpointValue,
  Grid,
  GridItem
} from '@chakra-ui/react'

import { Card } from '../../components/Card';
import { NextHead } from '../../components/NextHead';
import { images } from '../../utils/images';

export default function Continent() {
  const isLargeScreen = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true
  })

  return (
    <>
      <NextHead title="Europe" />
      <Flex w="100%" flexDir="column">
        <Flex
          id="continent-banner"
          bgImage={images.continent.banner.europe}
          w="100%"
          h={['150px', '500px']}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          {isLargeScreen ? (
            <Box w="100%" maxW="1240px" mx="auto" p="4" position="relative">
              <Heading
                color="white"
                fontFamily="Poppins"
                fontSize="5xl"
                fontWeight="bold"
                position="absolute"
                top="350px"
              >
                Europa
              </Heading>
            </Box>
          ) : (
            <Box mx="auto" my="auto">
              <Heading
                color="white"
                fontFamily="Poppins"
                fontSize="2xl"
                fontWeight="semibold"
              >
                Europa
              </Heading>
            </Box>
          )}
        </Flex>

        <Flex
          id="continent-info"
          mx="auto"
          mt={['6', '20']}
          p="2"
          w="100%"
          maxW="1240px"
          flexDirection={isLargeScreen ? 'row' : 'column'}
          justifyContent={isLargeScreen ? 'space-between' : 'start'}
        >
          <Box flex="1" maxW={'585px'} p="2">
            <Text
              textAlign="justify"
              fontFamily="Poppins"
              color="text"
              fontSize={['sm', '2xl']}
            >
              A Europa é, por convenção, um dos seis continentes do mundo.
              Compreendendo a península ocidental da Eurásia, a Europa
              geralmente divide-se da Ásia a leste pela divisória de águas dos
              montes Urais, o rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a
              sudeste
            </Text>
          </Box>

          <Flex
            maxW={'585px'}
            flexWrap="wrap"
            flex="1"
            alignItems="center"
            justifyContent="space-between"
            mt={['4', '4', '4', '0']}
            p="2"
          >
            <Flex flexDir="column">
              <Text
                as="strong"
                color="heading"
                fontFamily="Poppins"
                fontWeight="semibold"
                fontSize={['2xl', '5xl']}
              >
                50
              </Text>
              <Text
                as="span"
                color="text"
                fontFamily="Poppins"
                fontWeight={['regular', 'semibold']}
                fontSize={['lg', '2xl']}
              >
                Paises
              </Text>
            </Flex>

            <Flex flexDir="column">
              <Text
                as="strong"
                color="heading"
                fontFamily="Poppins"
                fontWeight="semibold"
                fontSize={['2xl', '5xl']}
              >
                60
              </Text>
              <Text
                as="span"
                color="text"
                fontFamily="Poppins"
                fontWeight={['regular', 'semibold']}
                fontSize={['lg', '2xl']}
              >
                línguas
              </Text>
            </Flex>

            <Flex flexDir="column">
              <Text
                as="strong"
                color="heading"
                fontFamily="Poppins"
                fontWeight="semibold"
                fontSize={['2xl', '5xl']}
              >
                24
              </Text>
              <Text
                as="span"
                color="text"
                fontFamily="Poppins"
                fontWeight={['regular', 'semibold']}
                fontSize={['lg', '2xl']}
              >
                cidades +100
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Box mx="auto" mt={['6', '20']} p="4" w="100%" maxW="1240px">
          <Text
            color="text"
            fontFamily="Poppins"
            fontWeight={['regular', 'semibold']}
            fontSize={['lg', '2xl']}
          >
            Cidades +100
          </Text>
        </Box>

        <Flex mx="auto" p="4" w="100%" maxW="1240px" mt={['6', '20']}>
          <Grid
            w="100%"
            gridTemplateColumns={'repeat(auto-fill, minmax(257px, 1fr))'}
            rowGap="12"
          >
            {images.card.map((item) => (
              <GridItem mx="auto" key={item.id}>
                <Card content={item} />
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </>
  )
}