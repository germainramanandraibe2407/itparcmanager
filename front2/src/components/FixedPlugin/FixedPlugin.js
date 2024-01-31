
import React from "react";


import { Button, Dropdown, DropdownToggle, Badge } from "reactstrap";
import { ThemeContext, themes } from "contexts/ThemeContext";
import { backgroundColors } from "contexts/BackgroundColorContext";

function FixedPlugin(props) {
  const [dropDownIsOpen, setdropDownIsOpen] = React.useState(false);
  const handleClick = () => {
    setdropDownIsOpen(!dropDownIsOpen);
  };
  return (
    <div className="fixed-plugin">
      <Dropdown isOpen={dropDownIsOpen} toggle={handleClick}>
        <DropdownToggle tag="div">
          <i className="fa fa-cog fa-2x" />
        </DropdownToggle>
        <ul className="dropdown-menu show">
          <li className="header-title">changer de mode</li>
        
          <li className="adjustments-line text-center color-change">
            <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <>
                  <span className="color-label">mode jour</span>{" "}
                  <Badge
                    className="light-badge mr-2"
                    onClick={() => changeTheme(themes.light)}
                  />{" "}
                  <Badge
                    className="dark-badge ml-2"
                    onClick={() => changeTheme(themes.dark)}
                  />{" "}
                  <span className="color-label">mode nuit</span>{" "}
                </>
              )}
            </ThemeContext.Consumer>
          </li>
          <li className="button-container">
            
            
          </li>
       
        </ul>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
