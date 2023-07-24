import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Image
} from '@chakra-ui/react';
import Slider from 'react-slick';

// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ModuleInfo() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which change the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  // TODO: Load info from json
  const cards = [
    {
      title: 'Design Projects 1',
      text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    },
    {
      title: 'Design Projects 2',
      text: "Different",
    },
    {
      title: 'Design Projects 3',
      text: "TYO YO YO",
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
    >
      <Image src='marcus.png' position={'absolute'} top={'25px'} ml={'30px'} zIndex={'1'} />
      <Box position={'relative'} height={'600px'} width={'800px'} overflow={'hidden'} borderRadius={'3xl'} backgroundColor={'var(--lightblue)'}>
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          icon={<Image src="/back.png" maxH={'120px'} />}
          onClick={() => slider?.slickPrev()}
        />
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          icon={<Image src="/next.png" maxH={'120px'} />}
          onClick={() => slider?.slickNext()}
        />
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((card, index) => (
            <Box
              key={index}
              height={'6xl'}
              position="absolute"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              left={`${index * 100}%`} // Adjust the offset based on the index
            >
              {/* This is the block you need to change, to customize the caption */}
              <Container size="container.lg" height="600px" position="relative">
                <Heading 
                  textAlign={'center'}
                  mt={'100px'}
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  color="var(--midnight)"
                >
                  {card.title}
                </Heading>
                <Stack
                  spacing={6}
                  w={'full'}
                  maxW={'lg'}
                  position="absolute"
                  top="50%"
                  transform="translate(0, -50%)"
                >
                  <Text textAlign={'center'} color="var(--midnight)" >
                    {card.text}
                  </Text>
                </Stack>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
