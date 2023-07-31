import { Heading, Flex, Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

export default function Badges({appState}) {
    const potentialBadges = ['cash-cadet', 'dolla-scholar', 'money-maverick', 'profit-prodigy', 'wealth-wizard', 'cashflow-champion']
    const [earnedBadges, setEarnedBadges] = useState([])
    let userPoints = appState.user.total_points
    console.log(appState.user)
    
    return (
    <Heading
        color={useColorModeValue("var(--grey)", "var(--midnight)")}
        fontWeight={"bold"}
        textAlign={"center"}
        marginTop={"5px"}
        padding={"3px"}
    >
    Badges Earned
    </Heading>
    )
}
