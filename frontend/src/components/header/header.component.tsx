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
      <LogoContainer href="/" underline="none">
        Home Music
      </LogoContainer>
      <OptionsContainer>
        <OptionLink href="/join-room" underline="none">
          Join Room
        </OptionLink>
        <OptionLink href="/create-room" underline="none">
          Create Room
        </OptionLink>
        {/* <Option>
          <ThemeButton />
        </Option> */}
      </OptionsContainer>
    </HeaderContainer>
  );
};

export default Header;
