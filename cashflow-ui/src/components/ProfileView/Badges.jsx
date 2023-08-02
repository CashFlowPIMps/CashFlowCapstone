import { Heading, Image, useColorModeValue, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function Badges({ appState }) {
  let userPoints = appState.user.total_points;

  function determineBadges(userPoints) {
    let badges = [];
    if (userPoints >= 500) {
      badges.push("cash-cadet.png");
    }
    if (userPoints >= 1000) {
      badges.push("dolla-scholar.png");
    }
    if (userPoints > 1600) {
      badges.push("money-maverick.png");
    }
    if (userPoints > 2000) {
      badges.push("profit-prodigy.png");
    }
    if (userPoints > 3000) {
      badges.push("wealth-wizard.png");
    }
    if (userPoints > 3600) {
      badges.push("cashflow-champion.png");
    }
    return badges;
  }

  const earnedBadges = determineBadges(userPoints);

  return (
    <>
      <Heading
        color={useColorModeValue("var(--grey)", "var(--midnight)")}
        fontWeight={"bold"}
        textAlign={"center"}
        marginTop={"5px"}
        padding={"3px"}
      >
        Badges Earned
      </Heading>
      <Flex justifyContent={'center'} >
      {earnedBadges.map((badge) => {
        return (
          <Image maxW={'200px'} key={badge} src={badge} alt="Badge" />
        );
      })}
      </Flex>
    </>
  );
}
