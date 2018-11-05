import React from "react";
import styled from "styled-components";
import { withRR4, Nav, NavIcon } from "react-sidenav";
import { Icon } from "react-icons-kit";
import { ic_home as home } from "react-icons-kit/md/ic_home";
import { ic_reorder as simple } from "react-icons-kit/md/ic_reorder";

const theme = {
  hoverBgColor: "#f5f5f5",
  selectionBgColor: "#f5f5f5",
  selectionIconColor: "#03A9F4"
};

const Text = styled.div`
  padding-left: 8px;
`;

const SideNav = withRR4();

export class AppNavigation extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <SideNav theme={theme} defaultSelectedPath={`${match.path}`}>
        <Nav id="home">
          <NavIcon>
            <Icon icon={home} />
          </NavIcon>
          <Text>Repos</Text>
        </Nav>
        <Nav id="basic">
          <NavIcon>
            <Icon icon={simple} />
          </NavIcon>
          <Text>Users</Text>
        </Nav>
      </SideNav>
    );
  }
}
