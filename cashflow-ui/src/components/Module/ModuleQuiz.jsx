import React, { useState , useRef} from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Container,
  Image,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Text
} from '@chakra-ui/react';
import Slider from 'react-slick';
import moduleQuiz from '../../../../cashflow-api/modules/modulequiz.json';


// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: false,
  autoplay: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Quiz({ module_name, slider }) {
  const quiz_data = moduleQuiz[module_name] || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (isAnswerCorrect) => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (isAnswerCorrect) {
      slider?.slick?.slickNext(); // Move to the next slide if the answer is correct
    }
  };

  return (
    <Slider {...slider}>
      {quiz_data.questions?.map((question, index) => (
        <div key={index}>
          {currentIndex === index ? (
            <Question question={question} onNext={handleNext} />
          ) : (
            <ResultPage
              isCorrect={false} // Show a placeholder result page if not currently on the question slide
              onNext={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
            />
          )}
        </div>
      ))}
    </Slider>
  );
}


function Question({ question }) {
  const { scenario, options } = question;

  return (
    <Box>
      <FormControl as="fieldset" color={'black'}>
        <FormLabel as="legend">{scenario}</FormLabel>
        <RadioGroup>
          <Stack spacing={3}>
            {options.map((option, index) => (
              <Radio key={index}>
                {option}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

// TODO: pass in specific module here 
export default function ModuleQuiz({module_name}) {
  const [slider, setSlider] = useState(settings);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });
  
  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
    >
      <Box>
      <Image src='/marcus.png' position={'absolute'} top={'25px'} ml={'200px'} zIndex={'1'} />
      <Box position={'relative'} height={'800px'} width={'100vh'} overflow={'scroll'} borderRadius={'3xl'} backgroundColor={'var(--lightblue)'}>
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
          onClick={() => slider?.slick?.slickPrev()}
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
          onClick={() => slider?.slick?.slickNext()}
        />
        
        <Quiz module_name={module_name} slider={slider}/>

        
      </Box>
      </Box>
    </Box>

    </>
  );
}
