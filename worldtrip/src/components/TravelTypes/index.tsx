import { Flex } from "@chakra-ui/react";
import { Travel } from "../../types/travel";
import { TravelItem } from "./TravelItem";


export function TravelTypes() {
  const travelTypes: Travel[] = [
    { id: 1, icon: './drink.svg', title: 'vida noturna' },
    { id: 2, icon: './surf-board.svg', title: 'praia' },
    { id: 3, icon: './building.svg', title: 'moderno', hasDivider: true },
    { id: 4, icon: './museum.svg', title: 'clássico' },
    { id: 5, icon: './planet.svg', title: 'e mais...' },
  ];
  

  return (
    <Flex mt='85px' maxW='1240px' mx='auto' w='100%' justify='space-around'>
      {travelTypes.map((travel) => {
        return (<TravelItem key={travel.id} title={travel.title} icon={travel.icon} hasDivider={travel.hasDivider} />)
      })}
    </Flex>
  );
};
