import React from "react";
import { Box, IconButton, Text, Image, useMediaQuery, extendTheme, Flex, useColorModeValue } from "@chakra-ui/react";

export default function NotQuite({ onNextClick }) {
  const [media] = useMediaQuery("(max-width: 1000px)");  

  return (
<>
        <Flex 
        position="absolute"
        width={`${media ? ("70%") : ("100%")}`} 
        flexDirection={`${media ? ("column") : ("row")}`} 
        alignContent={'center'}
        height={'70vh'}
        top={'25%'}
        >
          <Image
            src="/gary.png"
            position="absolute"
            top="-50%"
            ml="25%"
            display={'flex'}
            alignContent={'center'}
            width={`${media ? ("0%") : ("50%")}`}
            zIndex="1"
          />
          <Flex
            borderRadius={"3xl"}
            width={'100%'} 
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
            position={'absolute'}
          >
            <Box
            margin={'15%'}
            mt={'10%'}
            >
              <Text 
              display={"flex"} 
              justifyContent={"center"} 
              fontWeight={'bold'}
              pt={'15%'}
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
              fontSize={{ base: "20px", md: "40px", lg: "60px", xl: "80px" }}
              >
                NOT QUITE!
              </Text>
              <Text 
               
              display={"flex"} 
              fontWeight={'bold'}
              justifyContent={"center"} 
              textAlign={'center'}
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
              fontSize={{ base: "15px", md: "20px", lg: "30px", xl: "40px" }}
              >
                DON'T WORRY, MISTAKES ARE A PART OF LEARNING! KEEP GOING!
              </Text>
              <IconButton
                aria-label="right-arrow"
                variant="ghost"
                display={'flex'}
                left={'42%'}
                transform="translate(0%, -50%)"
                zIndex={2}
                mt={50}
                icon={<Image src="/next.png" marginLeft="-70%" width="40%" />}
                onClick={onNextClick}
              />
            </Box>
          </Flex>
        </Flex>
    </>
  );
}
