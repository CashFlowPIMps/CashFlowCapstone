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
  Button
} from '@chakra-ui/react';
import Slider from 'react-slick';
import moduleQuiz from '../../../../cashflow-api/modules/modulequiz.json';
import apiClient from "../../services/apiClient";
import NotQuite from '../Fail/NotQuite';

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

function Quiz({ module_name, slider, setAppState, onQuizFinish }) {
  const quiz_data = moduleQuiz[module_name] || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = (isAnswerCorrect) => {
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleQuizFinish = () => {
    setIsFinished(true);
    onQuizFinish(score); // Call the onQuizFinish function passed from the parent component with the final score
  };

  return (
    <Slider {...slider}>
      {quiz_data.questions?.map((question, index) => (
        <div key={index}>
          {currentIndex === index ? (
            <>
              <Question question={question} onNext={handleNext} />
              {currentIndex === quiz_data.questions.length - 1 && isFinished ? (
                score >= quiz_data.questions.length / 2 ? (
                  <Success />
                ) : (
                  <Fail />
                )
              ) : null}
            </>
          ) : (
            <>
              {index < score ? <GoodJob /> : <NotQuite />}
              <Question question={question} onNext={handleNext} />
            </>
          )}
        </div>
      ))}
    </Slider>
  );
}



function Question({ question, onNext }) {
  const { scenario, options, answer } = question;
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle user's answer selection
  const handleAnswerSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const isAnswerCorrect = selectedOption === answer; 
      onNext(isAnswerCorrect);
    } else {
      alert("Please select an answer before continuing.");
    }
  };

  return (
    <Box>
      <Box>
        <Box fontWeight="bold" mb={2}>{scenario}</Box>
        <RadioGroup onChange={handleAnswerSelect} value={selectedOption}>
          <Stack spacing={3}>
            {options.map((option, index) => (
              <Radio key={index} value={option}>
                {option}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Box>
      <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="relative"
          transform={'translate(0%, -50%)'}
          zIndex={2}
          mt={50}
          icon={<Image src="/next.png" maxH={'120px'} />}
          onClick={handleSubmit}
        />
    </Box>
  );
}


export default function ModuleQuiz({appState, setAppState, module_name}) {
  const [quizInfo, setQuizInfo] = useState({
    topic: "",
    points: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if ( quizInfo.topic && quizInfo.points ) {
      try {
        const token = localStorage.getItem("CashFlow_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.quiz({
          id: appState.user.id,
          topic: quizInfo.topic,
          points: quizInfo.points,
        });
        console.log(data);
        setAppState((prevState) => ({
          ...prevState,
          quizzes: [data.quiz, ...prevState.quizzes],
        }));
      } catch (err) {
        console.log(err);
      }
      setquizInfo((prevState) => ({
        ...prevState,
        topic: "",
        points: 0,
      }));    }
    setIsLoading(false);
  }
  console.log(appState)


  
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
      <Box position={'relative'} height={'600px'} width={'100vh'} overflow={'scroll'} borderRadius={'3xl'} backgroundColor={'var(--lightblue)'}>
        {/* Next */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          icon={<Image src="/next.png" maxH={'120px'} />}
          //onClick={}
        />
        
        <Quiz module_name={module_name} slider={slider}/>

        
      </Box>
      </Box>
    </Box>

    </>
  );
}
