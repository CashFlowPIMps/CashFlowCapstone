import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Image,
  List,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import Slider from 'react-slick';
import modulesInfo from '../../../../cashflow-api/modules/modulesInfo.json';


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
  const moduleDataArray = modulesInfo.bank_account_basics;

  return (
    <>
    <Heading display={'flex'} justifyContent={'center'} >{moduleDataArray.title}</Heading>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
    >
      
      <Image src='marcus.png' position={'absolute'} top={'25px'} ml={'30px'} zIndex={'1'} />
      <Box position={'relative'} height={'600px'} width={'800px'} overflow={'scroll'} borderRadius={'3xl'} backgroundColor={'var(--lightblue)'}>
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
        {moduleDataArray.sections.map((moduleData, index) => (
          <Box
            key={index}
            height={'6xl'}
            position="absolute"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            left={`${index * 100}%`}
          >
            <Container size="container.lg" height="600px" pt={'20px'}>
              <Heading
                textAlign={'center'}
                mt={'180px'}
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                color="var(--midnight)"
              >
                {moduleData.title}
              </Heading>
              <Stack
                spacing={6}
                w={'full'}
                maxW={'lg'}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <List
                  color="var(--midnight)"
                  fontWeight={'bold'}
                  mt={'50px'}
                  position={'relative'}
                  pl={0}
                  styleType="none"
                >
                  {moduleData.content.map((line, idx) => (
                    <ListItem key={idx} ml={0} pl={4}>
                      {line}
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
      </Box>
    </Box>
    </>
  );
}
