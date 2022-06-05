import React, { useMemo } from "react"
import { Flex, Text, useMediaQuery } from "@chakra-ui/react"
import SidebarItem from "./SidebarItem"
import {
  AiFillFileText,
  AiFillFund,
  AiFillHome,
  AiFillProfile,
  AiOutlineTeam,
} from "react-icons/ai"
import { MdAttachMoney, MdSupport } from "react-icons/md"
import { FaCog, FaTelegramPlane } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import ROUTES from "../../constants/routes"

const Sidebar = () => {
  const sideBarItens = useMemo(
    () => [
      {
        label: "Home",
        icon: <AiFillHome />,
        route: ROUTES.HOME,
      },
      {
        label: "Quotes",
        icon: <MdAttachMoney />,
        route: ROUTES.QUOTES,
      },
      {
        label: "Leads",
        icon: <AiFillProfile />,
        route: ROUTES.LEADS,
      },
      {
        label: "Tours",
        icon: <FaTelegramPlane />,
        route: ROUTES.TOURS,
      },
      {
        label: "Invoices",
        icon: <AiFillFileText />,
        route: ROUTES.INVOICES,
      },
      {
        label: "Analytics",
        icon: <AiFillFund />,
        route: ROUTES.ANALYTICS,
      },
      {
        label: "Team",
        icon: <AiOutlineTeam />,
        route: ROUTES.TEAM,
      },
      {
        label: "Admin",
        icon: <FaCog />,
        route: ROUTES.ADMIN,
      },
      {
        label: "Support",
        icon: <MdSupport />,
        route: ROUTES.SUPPORT,
      },
    ],
    []
  )

  const navigate = useNavigate()
  const location = useLocation()
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)")

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      bg="brand.600"
      w={isLargerThan1024 ? "200px" : "60px"}
      transition="700ms"
    >
      <Flex direction="column" h="100%" maxH="860px">
        {sideBarItens.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={Boolean(location.pathname === item.route)}
            onClick={() => navigate(`${item.route}`)}
          />
        ))}
      </Flex>

      {isLargerThan1024 ? (
        <Flex
          p="1rem"
          justifyContent="center"
          alignItems="center"
          borderTop="2px solid"
          borderColor="brand.800"
          transition="700ms"
        >
          <Text fontSize="xs" color="brand.800" textAlign="center">
            All rights received by WetBat 2020 ©
          </Text>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Sidebar
