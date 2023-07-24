import React, { Fragment, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  Input,
  InputGroup,
  Image,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Textarea,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import "./GoalsTracker.css";

export default function NutritionPage({ setAppState, appState }) {
  const [goalInfo, setGoalInfo] = useState({
    goal: "",
    start_date: "",
    end_date: "",
    category: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);


  function handleRecord(e) {
    e.preventDefault();
    setNutriForm(!nutriForm);
  }

  async function handleSumbit(e) {
    e.preventDefault();
    if (
      nutriInfo.name &&
      nutriInfo.category &&
      nutriInfo.quantity &&
      nutriInfo.calories
    ) {
      try {
        const token = localStorage.getItem("LifeTracker_Token");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.nutrition({
          name: nutriInfo.name,
          category: nutriInfo.category,
          quantity: nutriInfo.quantity,
          calories: nutriInfo.calories,
          image_url: nutriInfo.image_url,
          id: appState.user.id,
        });
        setAppState((prevState) => ({
          ...prevState,
          nutrition: [data.nutrition, ...prevState.nutrition],
        }));
      } catch (err) {
        console.log(err);
      }
      setNutriInfo((prevState) => ({
        ...prevState,
        name: "",
        category: "",
        quantity: 0,
        calories: 0,
        image_url: "",
      }));
      setNutriForm(!nutriForm);
    }
  }
  return (
    <Fragment>
      <Box marginTop={"5%"} height={"100vh"} color={"white"}>
        <Box
          rounded={"lg"}
          max-height={"40vh"}
          borderRadius={"40px"}
          width={"40vh"}
          bg={useColorModeValue("var(--midnight)", "var(--lightblue)")}
          boxShadow={"lg"}
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
                // padding={"7px"}
                marginTop={"7px"}
                width={"90%"}
                bg={"var(--grey)"}
                onFocus={() => {
                  const x = document.querySelector("#start_date");
                  x.type = "datetime-local";
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
                  x.type = "datetime-local";
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
          <FormControl id="category" isRequired>
            <Input
              marginTop={"7px"}
              borderRadius={"5px"}
              width={"90%"}
              type="text"
              color={"var(--midnight)"}
              marginLeft={"5%"}
              bg={"var(--grey)"}
              placeholder="Category"
              _placeholder={{ opacity: 1, color: "var(--midnight)" }}
              value={goalInfo.category}
              onChange={(e) =>
                setGoalInfo((prevState) => ({
                  ...prevState,
                  category: e.target.value,
                }))
              }
            />
          </FormControl>
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
          <Button
                    onClick={handleRecord}
                    width={"40%"}
                    borderRadius={"20px"}
                    height={"45px"}
                    fontSize={"x-large"}
                    margin={"0 auto"}
                    bg={"var(--midnight)"}
                    color={"var(--lightblue)"}
                    _hover={{
                      borderColor: "var(--grey)",
                      border: "1px solid"
                    }}
                  >
                    {isLoading ? (
                      <Puff stroke="var(--grey)" speed={1.25} />
                    ) : (
                      <span>Create Goal</span>
                    )}
                  </Button>
                  </Stack>
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
