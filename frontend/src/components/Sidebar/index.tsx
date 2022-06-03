import React, { useMemo } from "react"
import { Flex, Text } from "@chakra-ui/react"
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
      },
      {
        label: "Tours",
        icon: <FaTelegramPlane />,
      },
      {
        label: "Invoices",
        icon: <AiFillFileText />,
      },
      {
        label: "Analytics",
        icon: <AiFillFund />,
      },
      {
        label: "Team",
        icon: <AiOutlineTeam />,
      },
      {
        label: "Admin",
        icon: <FaCog />,
      },
      {
        label: "Support",
        icon: <MdSupport />,
      },
    ],
    []
  )

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Flex direction="column" justifyContent="space-between" bg="brand.600">
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

      <Flex
        p="1rem"
        justifyContent="center"
        alignItems="center"
        borderTop="2px solid"
        borderColor="brand.800"
      >
        <Text fontSize="xs" color="brand.800" textAlign="center">
          All rights received by WetBat 2020 ©
        </Text>
      </Flex>
    </Flex>
  )
}

export default Sidebar
