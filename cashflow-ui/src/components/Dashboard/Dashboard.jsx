"use client";
import { Image, Box,Center, useMediaQuery } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import CashBot from "../Cashbot/Cashbot";
import { useEffect, useState } from 'react';

export default function Dashboard({ cashBotLink, dashboard}) {
  // TODO: Separate beginner & intermediate dashboard 
  const [media, heightMedia] = useMediaQuery(["(max-width: 694px)", "(max-height: 840px)"])


  return (
    <>

<Box height={"100vh"}>
    <Box marginTop={`${heightMedia ? ("30%") : (null)}`} display={'flex'} alignItems={`${media ? ("center"): (null)}`} flexDir={`${media ? ("column") : ("row")}`} justifyContent={'center'} height={'50vh'}>
    {dashboard.map((img) =>(
      <Box>
        <Link to={`/${img}`} >
        <Image objectFit={"cover"} boxSize={300} key={img} src={`${img}.png`}></Image>
        </Link>
        </Box>
    ))}
    </Box>
     <Box height={"50vh"}>
          <Center>
            <Image src="cashflowcloud.png" marginTop={"-10%"} />
          </Center>

        </Box>
        <CashBot cashBotLink={cashBotLink}/>
    </Box>
    </>
  );
}
