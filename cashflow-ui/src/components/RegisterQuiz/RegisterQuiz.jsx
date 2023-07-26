import * as React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  RadioGroup,
  useColorModeValue,
  Radio,
  Flex,
  Heading,
  Image,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";

export default function RegisterQuiz() {
  const [imageUrl, setImageUrl] = useState("");

  console.log(imageUrl);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    console.log("this is file", file);
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const navigateTo = useNavigate();
  const handleStartLearning = (e) => {
    navigateTo("/dashboard");
  };

  return (
    <Fragment>
      <Stack bg={useColorModeValue("var(--grey)", "var(--midnight)")}>
        <Heading
          as="h3"
          size="lg"
          marginLeft={"750px"}
          marginTop={""}
          position={"relative"}
          top={"70px"}
          color={useColorModeValue("var(--midnight)", "var(--grey)")}
        >
          Let’s Start With Examining <br /> Your Financial Goals...{" "}
        </Heading>
      </Stack>
      <Box
        maxWidth={"720px"}
        maxHeight={"110vh"}
        color={"white"}
        margin={"0 auto"}
        bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
        borderRadius={"40px"}
      >
        <Image
          textAlign={"center"}
          width={"400px"}
          height={"400px"}
          position={"absolute"}
          top={"60px"}
          marginLeft={"-70px"}
          src="/registerguy.png"
        ></Image>
        <FormControl position={"relative"} top={"70px"}>
          <FormLabel
            fontWeight={"bold"}
            marginLeft={"20px"}
            marginTop={"10%"}
            position={"relative"}
            top={"90px"}
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
          >
            {" "}
            1. On a scale of 1-10, how would you rate your current financial
            stability?
          </FormLabel>
          <NumberInput
            max={10}
            min={1}
            color={"black"}
            position={"relative"}
            top={"90px"}
            width={"150px"}
            marginLeft={"30px"}
            borderRadius={"20px"}
          >
            <NumberInputField bg={"var(--grey)"} />
            <NumberInputStepper color={"black"}>
              <NumberIncrementStepper color={"black"} />
              <NumberDecrementStepper color={"black"} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl
          as="fieldset"
          marginTop={"10%"}
          position={"relative"}
          top={"70px"}
        >
          <FormLabel
            as="legend"
            fontWeight={"bold"}
            marginLeft={"20px"}
            position={"relative"}
            top={"50px"}
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
          >
            {" "}
            2. How would you rate your current level of debt?
          </FormLabel>
          <RadioGroup defaultValue="Question2">
            <Stack
              spacing="24px"
              direction={"column"}
              marginLeft={"20px"}
              position={"relative"}
              top={"50px"}
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
            >
              <Radio value="No debt"> No debt </Radio>
              <Radio value=" Minimal debt (e.g., student loans, small credit card balance)o">
                {" "}
                Minimal debt (e.g., student loans, small credit card balance){" "}
              </Radio>
              <Radio
                value=" Moderate debt (e.g., mortgage, car loan, significant credit card
                balance)"
              >
                {" "}
                Moderate debt (e.g., mortgage, car loan, significant credit card
                balance){" "}
              </Radio>
              <Radio value=" High debt (e.g., multiple loans, large credit card balances)">
                {" "}
                High debt (e.g., multiple loans, large credit card balances){" "}
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl
          as="fieldset"
          marginTop={"10%"}
          position={"relative"}
          top={"50px"}
        >
          <FormLabel
            as="legend"
            fontWeight={"bold"}
            marginLeft={"20px"}
            position={"relative"}
            top={"50px"}
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
          >
            {" "}
            3. What is your primary financial goal/objective?
          </FormLabel>
          <RadioGroup
            defaultValue="Question3"
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
          >
            <Stack
              spacing="24px"
              direction={"column"}
              marginLeft={"20px"}
              position={"relative"}
              top={"50px"}
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
            >
              <Radio value="Saving for a specific purchase or expense">
                {" "}
                Saving for a specific purchase or expense{" "}
              </Radio>
              <Radio value="Building an emergency fund">
                {" "}
                Building an emergency fund{" "}
              </Radio>
              <Radio value="Paying off debt (e.g., credit cards, loans)">
                {" "}
                Paying off debt (e.g., credit cards, loans){" "}
              </Radio>
              <Radio value=" Investing for retirement">
                {" "}
                Investing for retirement{" "}
              </Radio>
              <Radio value="Saving for education (e.g., college fund)">
                {" "}
                Saving for education (e.g., college fund){" "}
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Box margin={"0 auto"}>
          <FormControl marginTop={"10%"} position={"relative"} top={"50px"}>
            <FormLabel
              htmlFor="image"
              fontWeight={"bold"}
              marginLeft={"50px"}
              position={"relative"}
              top={"20px"}
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
            >
              {" "}
              Lastly, would you like to upload a profile photo?
            </FormLabel>
            <Input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              position={"relative"}
              top={"20px"}
              width={"450px"}
              marginLeft={"30px"}
              color={useColorModeValue("var(--grey)", "var(--midnight)")}
            />
          </FormControl>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Uploaded preview"
              mt={4}
              backgroundColor={"white"}
              marginLeft={"40px"}
              maxWidth={"100px"}
              maxHeight={"100px"}
              position={"relative"}
              top={"60px"}
            />
          )}
        </Box>

        <Flex alignItems="center" justifyContent="center">
          <Center>
            <Button
              onClick={handleStartLearning}
              width={"100%"}
              borderRadius={"20px"}
              height={"45px"}
              fontSize={"x-large"}
              marginTop={"110px"}
              marginBottom={"20px"}
              bg={"var(--midnight)"}
              color={"var(--lightblue)"}
              _hover={{
                bg: "var(--darkblue)",
              }}
            >
              <span>Start Learning Now!</span>
            </Button>
          </Center>
        </Flex>
      </Box>
    </Fragment>
  );
}