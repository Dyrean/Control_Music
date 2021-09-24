import React from "react";

import { ThemeButton } from "../theme-button/theme-button";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  Option,
} from "./header.styles";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">Home Music</LogoContainer>
      <OptionsContainer>
        <OptionLink to="/join-room">Join Room</OptionLink>
        <OptionLink to="/create-room">Create Room</OptionLink>
        <Option>
          <ThemeButton />
        </Option>
      </OptionsContainer>
    </HeaderContainer>
  );
};

export default Header;
