import { Flex, Image, Text, Box } from '@chakra-ui/react'

interface ICardProps {
  content: {
    id: number
    city: string
    country: string
    image: string
    flag: string
  }
}

export function Card({ content }: ICardProps) {
  return (
    <Flex
      flexDirection="column"
      backgroundColor="headingOpaque"
      borderWidth={'1px'}
      borderRadius="8px"
      borderColor="heading"
      overflow={'hidden'}
      w="256px"
    >
      <Image src={content.image} alt="card image" w="100%" h="173px" />
      <Flex p="6" alignItems="center">
        <Box>
          <Text
            fontFamily="Barlow"
            fontSize="xl"
            fontWeight="semibold"
            color="text"
          >
            {content.city}
          </Text>
          <Text
            fontFamily="Barlow"
            fontSize="md"
            fontWeight="medium"
            color="info"
          >
            {content.country}
          </Text>
        </Box>

        <Image
          src={content.flag}
          alt="country flag"
          w="30px"
          h="30px"
          borderRadius="full"
          ml="auto"
        />
      </Flex>
    </Flex>
  )
}