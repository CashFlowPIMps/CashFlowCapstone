import React, { Fragment, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  Input,
  InputGroup,
  Image,
  HStack,
  Wrap,
  WrapItem,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Select,
  Spacer,
  Checkbox,
  Text,
  Textarea,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import "./GoalsTracker.css";
import apiClient from "../../services/apiClient";
import { Puff } from "react-loading-icons";

export default function GoalsTracker({ setAppState, appState }) {
  const [goalInfo, setGoalInfo] = useState({
    goal: "",
    start_date: "",
    end_date: "",
    category: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [goalForm, setGoalForm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  console.log(goalInfo);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleRecord(e) {
    e.preventDefault();
    setGoalForm(!goalForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (
      goalInfo.goal &&
      goalInfo.start_date &&
      goalInfo.end_date &&
      goalInfo.category &&
      goalInfo.description
    ) {
      try {
        const token = localStorage.getItem("LifeTracker_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.goals({
          id: appState.user.id,
          goal: goalInfo.goal,
          start_date: goalInfo.start_date,
          end_date: goalInfo.end_date,
          category: goalInfo.category,
          description: goalInfo.description,
        });
        console.log(data);
        setAppState((prevState) => ({
          ...prevState,
          goals: [data.goal, ...prevState.goals],
        }));
      } catch (err) {
        console.log(err);
      }
      setGoalInfo((prevState) => ({
        ...prevState,
        goal: "",
        start_date: "",
        end_date: "",
        category: "",
        description: "",
      }));
      setGoalForm(!goalForm);
    }
    setIsLoading(false);
  }
  return (
    <Fragment>
      <Box marginTop={"5%"} height={"100vh"} color={"white"}>
        <Box
          marginTop={"11%"}
          marginLeft={"16%"}
          rounded={"lg"}
          minHeight={"70vh"}
          maxHeight={"auto"}
          borderRadius={"40px"}
          width={"120vh"}
          bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
          boxShadow={"dark-lg"}
          p={8}
        >
          <Image
            marginTop={"-300px"}
            marginLeft={"29%"}
            width={"500px"}
            height={"500px"}
            src="goalGuy.png"
          />
          <Heading
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
            fontSize={"300%"}
            textAlign={"center"}
            marginTop={"-100px"}
            marginBottom={"10px"}
          >
            CashFlow Goals
          </Heading>
          <Button
            onClick={handleRecord}
            width={"25%"}
            borderRadius={"20px"}
            height={"45px"}
            fontSize={"130%"}
            marginLeft={"38%"}
            bg={"var(--midnight)"}
            color={"var(--lightblue)"}
            _hover={{
              borderColor: "var(--grey)",
              border: "1px solid",
            }}
          >
            {isLoading ? (
              <Puff stroke="var(--grey)" speed={1.25} />
            ) : (
              <span>Add New Goal</span>
            )}
          </Button>
          {goalForm ? (
            <Box
              margin={"0 auto"}
              rounded={"lg"}
              marginTop={"10px"}
              max-height={"40vh"}
              borderRadius={"40px"}
              width={"40vh"}
              bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
              boxShadow={"dark-lg"}
              p={8}
            >
              <Stack align={"center"}>
                <Heading
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                  fontSize={"150%"}
                  marginTop={"10px"}
                  marginBottom={"20px"}
                >
                  Add a New CashFlow Goal!
                </Heading>
              </Stack>
              <FormControl id="goal" isRequired>
                <Input
                  borderRadius={"5px"}
                  width={"90%"}
                  type="email"
                  color={"var(--midnight)"}
                  marginLeft={"5%"}
                  bg={"var(--grey)"}
                  placeholder="Goal"
                  _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                  value={goalInfo.goal}
                  onChange={(e) =>
                    setGoalInfo((prevState) => ({
                      ...prevState,
                      goal: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl id="start_date" isRequired>
                <InputGroup justifyContent={"center"}>
                  <Input
                    borderRadius={"5px"}
                    marginTop={"7px"}
                    width={"90%"}
                    bg={"var(--grey)"}
                    onFocus={() => {
                      const x = document.querySelector("#start_date");
                      x.type = "date";
                    }}
                    onBlur={() => {
                      const x = document.querySelector("#start_date");
                      x.type = "text";
                    }}
                    color={"var(--midnight)"}
                    placeholder="Start Date"
                    _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                    value={goalInfo.start_date}
                    onChange={(e) =>
                      setGoalInfo((prevState) => ({
                        ...prevState,
                        start_date: e.target.value,
                      }))
                    }
                    type={"text"}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="end_date" isRequired>
                <InputGroup justifyContent={"center"}>
                  <Input
                    borderRadius={"5px"}
                    marginTop={"7px"}
                    width={"90%"}
                    bg={"var(--grey)"}
                    color={"var(--midnight)"}
                    placeholder="End Date"
                    onFocus={() => {
                      const x = document.querySelector("#end_date");
                      x.type = "date";
                    }}
                    onBlur={() => {
                      const x = document.querySelector("#end_date");
                      x.type = "text";
                    }}
                    _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                    value={goalInfo.end_date}
                    onChange={(e) =>
                      setGoalInfo((prevState) => ({
                        ...prevState,
                        end_date: e.target.value,
                      }))
                    }
                    type={"text"}
                  />
                </InputGroup>
              </FormControl>

              <Select
                marginTop={"7px"}
                borderRadius={"5px"}
                width={"90%"}
                type="text"
                color={"var(--midnight)"}
                marginLeft={"5%"}
                bg={"var(--grey)"}
                placeholder="Category -- Select an Option --"
                value={goalInfo.category}
                onChange={(e) =>
                  setGoalInfo((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                  }))
                }
              >
                <option value="Savings">Savings</option>
                <option value="Investing">Investing</option>
                <option value="Debt">Debt</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </Select>
              <FormControl id="description" isRequired>
                <Textarea
                  marginTop={"7px"}
                  borderRadius={"5px"}
                  height={"150px"}
                  maxHeight={"200px"}
                  width={"90%"}
                  maxWidth={"90%"}
                  marginBottom={"10px"}
                  type="text"
                  color={"var(--midnight)"}
                  marginLeft={"5%"}
                  bg={"var(--grey)"}
                  _placeholder={{ opacity: 1, color: "var(--midnight)" }}
                  value={goalInfo.description}
                  onChange={(e) =>
                    setGoalInfo((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Description"
                />
              </FormControl>
              <Stack spacing={10}>
                <Flex margin={"0 auto"} width={"90%"}>
                  <Button
                    onClick={handleRecord}
                    width={"40%"}
                    borderRadius={"20px"}
                    height={"45px"}
                    fontSize={"130%"}
                    margin={"0 auto"}
                    bg={"var(--midnight)"}
                    color={"var(--lightblue)"}
                    _hover={{
                      borderColor: "var(--grey)",
                      border: "1px solid",
                    }}
                  >
                    {isLoading ? (
                      <Puff stroke="var(--grey)" speed={1.25} />
                    ) : (
                      <span>Cancel</span>
                    )}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    width={"40%"}
                    borderRadius={"20px"}
                    height={"45px"}
                    fontSize={"130%"}
                    margin={"0 auto"}
                    bg={"var(--midnight)"}
                    color={"var(--lightblue)"}
                    _hover={{
                      borderColor: "var(--grey)",
                      border: "1px solid",
                    }}
                  >
                    {isLoading ? (
                      <Puff stroke="var(--grey)" speed={1.25} />
                    ) : (
                      <span>Create Goal</span>
                    )}
                  </Button>
                </Flex>
              </Stack>
            </Box>
          ) : (
            <Flex
              flexWrap={"wrap"}
              justifyContent={"center"}
              marginTop={"20px"}
              direction={"row"}
              spacing={"2%"}
            >
              {appState.goals.map((userGoal) => {
                console.log("hereee");
                console.log(userGoal);

                let wordImage = userGoal.category.charAt(0).toUpperCase();

                const createdAtUTC = new Date(userGoal.start_date);
                const createdAtUTCend = new Date(userGoal.end_date);
                const createdAtLocal = createdAtUTC.toLocaleString();
                const createdAtLocalend = createdAtUTCend.toLocaleString();
                const splitCreatedAtLocal = createdAtLocal.split(" ");
                const splitCreatedAtLocalend = createdAtLocalend.split(" ");

                const getOrdinalSuffix = (day) => {
                  if (day >= 11 && day <= 13) {
                    return "th";
                  }

                  switch (day % 10) {
                    case 1:
                      return "st";
                    case 2:
                      return "nd";
                    case 3:
                      return "rd";
                    default:
                      return "th";
                  }
                };
                const formatDate = (dateString) => {
                  const date = new Date(dateString);
                  const month = date.toLocaleString("en-US", {
                    month: "short",
                  });
                  const day = date.getDate();
                  const year = date.getFullYear();
                  const suffix = getOrdinalSuffix(day);

                  return `${month} ${day}${suffix} ${year}`;
                };

                const dayStart = formatDate(splitCreatedAtLocal[0]);
                const dayEnd = formatDate(splitCreatedAtLocalend[0]);
                return (
                  <Fragment>
                    <Box
                      marginRight={"20px"}
                      marginBottom={"15px"}
                      height={"420px"}
                      overflow={"scroll"}
                      border={"solid 5px white"}
                      borderRadius={"30px"}
                      width={"30%"}
                      padding={"15px"}
                    >
                      <Box
                        display="inline-block"
                        boxShadow={"7px 7px 7px var(--blue)"}
                        objectFit={"cover"}
                        bg={"var(--midnight)"}
                        color={"var(--stark)"}
                        width={"70px"}
                        height={"60px"}
                        borderRadius={"50%"}
                        paddingTop={"2%"}
                        paddingLeft={"8%"}
                        fontSize={"xx-large"}
                        fontWeight={"bold"}
                        marginRight={"18%"}
                      >
                        {wordImage}
                      </Box>
                      <Text
                        display={"inline-block"}
                        color={"white"}
                        width={"130px"}
                        textAlign={"center"}
                        padding={"3px"}
                        backgroundColor={"var(--darkblue)"}
                        fontSize={"x-large"}
                        as={"span"}
                      >
                        {userGoal.category}
                      </Text>
                      <Checkbox
                        color={"black"}
                        marginTop={"10px"}
                        colorScheme="blue"
                      >
                        Goal Accomplished?
                      </Checkbox>
                      <Text
                        color={"var(--midnight)"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        marginTop={"5px"}
                        padding={"3px"}
                        fontSize={"x-large"}
                      >
                        {userGoal.goal}
                      </Text>
                      <HStack marginTop={"5px"} textAlign={"center"}>
                        <Flex flexDirection={"column"}>
                          <Text
                            fontWeight={"bold"}
                            color={"var(--blue)"}
                            fontSize={"x-large"}
                          >
                            Start Date
                          </Text>
                          <Text
                            color={"var(--midnight)"}
                            fontWeight={"bold"}
                            textAlign={"center"}
                            marginTop={"5px"}
                            padding={"3px"}
                            fontSize={"x-large"}
                          >
                            {dayStart}
                          </Text>
                        </Flex>
                        <Flex flexDirection={"column"}>
                          <Text
                            fontWeight={"bold"}
                            color={"var(--blue)"}
                            fontSize={"x-large"}
                          >
                            End Date
                          </Text>
                          <Text
                            color={"var(--midnight)"}
                            fontWeight={"bold"}
                            textAlign={"center"}
                            marginTop={"5px"}
                            padding={"3px"}
                            fontSize={"x-large"}
                          >
                            {dayEnd}
                          </Text>
                        </Flex>
                      </HStack>
                      <Text fontSize={"x-large"} color={"var(--midnight)"}>
                        Description:
                      </Text>
                      <Text
                        color={"white"}
                        height={"100px"}
                        maxHeight={"150px"}
                        borderRadius={"20px"}
                        overflow={"scroll"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        marginBottom={"15px"}
                        marginTop={"8px"}
                        padding={"3px"}
                        fontSize={"x-large"}
                        bg={"var(--blue)"}
                      >
                        {userGoal.description}
                      </Text>
                    </Box>
                  </Fragment>
                );
                // return (
                //     <h1>{userGoal.goal}</h1>
                // );
              })}
            </Flex>
          )}
        </Box>
      </Box>
    </Fragment>
    // <>
    //     <>
    //       <div className="barPage">
    //         <div className="bars-header">
    //           <h1>Nutrition</h1>
    //         </div>
    //         {nutriForm ? (
    //           <>
    //             <div className="bars-form">
    //               <div className="barsForm-header">
    //                 <h1> Record Nutrition</h1>
    //               </div>

    //                <form className="innerForm">
    //                 <input
    //                   className="barsForm-input"
    //                   type="text"
    //                   name="name"
    //                   value={nutriInfo.name}
    //                   onChange={(e) =>
    //                     setNutriInfo((prevState) => ({
    //                       ...prevState,
    //                       name: e.target.value,
    //                     }))
    //                   }
    //                   placeholder="Name"
    //                 />{" "}
    //                 <br />
    //                 <label className="bars-label" htmlFor="category" required>
    //                   Category
    //                 </label>
    //                 <br />
    //                 <select
    //                   style={{ width: "102%" }}
    //                   className="barsForm-input"
    //                   name="category"
    //                   value={nutriInfo.category}
    //                   onChange={(e) =>
    //                     setNutriInfo((prevState) => ({
    //                       ...prevState,
    //                       category: e.target.value,
    //                     }))
    //                   }
    //                   required
    //                 >
    //                   <option value="">--Select a Category--</option>
    //                   <option value="Snack">Snack</option>
    //                   <option value="Beverage">Beverage</option>
    //                   <option value="Food">Food</option>
    //                 </select>
    //                 <br />
    //                 <div className="quantCal-input">
    //                   <div className="div-input">
    //                     <label
    //                       className="bars-label"
    //                       htmlFor="quantity"
    //                       required
    //                     >
    //                       Quantity
    //                     </label>
    //                     <br />
    //                     <input
    //                       value={nutriInfo.quantity}
    //                       onChange={(e) =>
    //                         setNutriInfo((prevState) => ({
    //                           ...prevState,
    //                           quantity: e.target.value,
    //                         }))
    //                       }
    //                       id="quantity-input"
    //                       type="number"
    //                       name="quantity"
    //                       min="1"
    //                       max="100"
    //                       required
    //                     />
    //                   </div>
    //                   <div className="div-input2">
    //                     <label
    //                       className="bars-label"
    //                       htmlFor="calories"
    //                       required
    //                     >
    //                       Calories
    //                     </label>
    //                     <br />
    //                     <input
    //                       value={nutriInfo.calories}
    //                       onChange={(e) =>
    //                         setNutriInfo((prevState) => ({
    //                           ...prevState,
    //                           calories: e.target.value,
    //                         }))
    //                       }
    //                       id="calories-input"
    //                       type="number"
    //                       name="calories"
    //                       min="0"
    //                       max="15000"
    //                       step="10"
    //                       required
    //                     />
    //                   </div>
    //                 </div>
    //                 <br />
    //                 <input
    //                   value={nutriInfo.image_url}
    //                   onChange={(e) =>
    //                     setNutriInfo((prevState) => ({
    //                       ...prevState,
    //                       image_url: e.target.value,
    //                     }))
    //                   }
    //                   className="barsForm-input"
    //                   type="url"
    //                   name="url"
    //                   placeholder="url for image"
    //                   pattern="https://.*"
    //                   required
    //                 />
    //                 <button onClick={handleSumbit} className="bars-cancel">
    //                   Save
    //                 </button>
    //                 <button className="bars-cancel" onClick={handleRecord}>
    //                   Cancel
    //                 </button>
    //               </form>
    //             </div>
    //           </>
    //         ) : (
    //           <>
    //             <div className="bar-content">
    //               {appState.nutrition.length === 0 ? (
    //                 <Fragment>
    //                   <p className="bar-contentp">Nothing here yet.</p>
    //                   <button onClick={handleRecord} className="bar-button">
    //                     Record Nutrition
    //                   </button>{" "}
    //                   <br />
    //                   <img src={emptycan} alt="empty can in a fridge" />
    //                 </Fragment>
    //               ) : (
    //                 <Fragment>
    //                   <button
    //                     style={{ marginTop: "2%" }}
    //                     onClick={handleRecord}
    //                     className="bar-button"
    //                   >
    //                     Add Nutrition
    //                   </button>
    //                   <div id="exercise-whole">
    //                     {appState.nutrition.map((nutrition) => {
    //                       return <Tile nutrition={nutrition} />;
    //                     })}
    //                   </div>
    //                 </Fragment>
    //               )}
    //             </div>
    //           </>
    //         )}
    //       </div>
    //     </>
    // </>
  );
}
