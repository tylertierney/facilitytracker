import React, { useState } from "react";
import "./propertyModal.css";
import { CloseButton } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  getStreetAddress,
  getCityStateZip,
  preventScrollOnBody,
  determineBadgeColor,
  checkForSmallScreen,
} from "../HelperFunctions";
import { ButtonGroup, Button, Badge } from "@chakra-ui/react";
import { SiGooglemaps } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";

const PropertyModal = ({
  setModalShowing,
  isModalShowing,
  market,
  address,
  projectstage,
  whoscourt,
  projectstatusupdate,
  strategicdirection,
  size,
  expdate,
  featuredimg,
}) => {
  const [seeingMore, setSeeingMore] = useState(false);
  const [boxIsMoving, setBoxIsMoving] = useState(false);
  const [slideAnimation, setSlideAnimation] = useState("slidein");
  const [modalYValue, setModalYValue] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(checkForSmallScreen());

  const hideModal = (e) => {
    e.stopPropagation();
    setModalShowing(false);
    preventScrollOnBody("allow");
  };

  const seeMoreFunction = (e, seeMoreOrLess) => {
    // preventScrollOnBody("prevent");
    if (seeMoreOrLess === "See Less") {
      setSeeingMore(false);
    } else {
      setSeeingMore(true);
    }
    e.stopPropagation();
  };

  let largeScenarioDescription;
  let seeMoreOrLess;
  if (seeingMore) {
    largeScenarioDescription = "largeScenarioDescription";
    seeMoreOrLess = "See Less";
  } else {
    largeScenarioDescription = "";
    seeMoreOrLess = "See More";
  }

  const startMoving = (e) => {
    setBoxIsMoving(true);
  };

  const handleMouseMove = (e) => {
    let box = e.currentTarget;
    let newBoxY;
    if (boxIsMoving) {
      if (e.clientY) {
        // MOUSE movement
        let boxY = parseInt(box.style.top, 10);
        setModalYValue(boxY);
        newBoxY = boxY + e.movementY + "px";
      } else {
        // TOUCH movement
        newBoxY =
          e.changedTouches[0].clientY - e.target.clientHeight / 2 + "px";
      }
      box.style.setProperty("top", newBoxY);
    }
  };

  const stopMoving = (e) => {
    let box = e.currentTarget;
    setBoxIsMoving(false);
    if (parseInt(box.style.top, 10) > modalYValue) {
      setSlideAnimation("slideout");
      window.setTimeout(() => {
        setModalShowing(false);
        hideModal(e);
      }, 300);
    } else {
      box.style.setProperty("top", "50px");
    }
  };

  let eventHandlers;
  if (isSmallScreen) {
    eventHandlers = {
      mousedown: (e) => startMoving(e),
      touchstart: (e) => startMoving(e),
      mouseup: (e) => stopMoving(e),
      touchend: (e) => stopMoving(e),
      mousemove: (e) => handleMouseMove(e),
      touchmove: (e) => handleMouseMove(e),
    };
  } else {
    eventHandlers = {
      mousedown: undefined,
      touchstart: undefined,
      mouseup: undefined,
      touchend: undefined,
      mousemove: undefined,
      touchmove: undefined,
    };
  }

  return (
    <div
      className={`modalContainer ${slideAnimation}`}
      style={{ overflowY: "scroll", WebkitOverflowScrolling: "touch" }}
      onMouseDown={eventHandlers.mousedown}
      onTouchStart={eventHandlers.touchstart}
      onMouseUp={eventHandlers.mouseup}
      onTouchEnd={eventHandlers.touchend}
      onMouseMove={eventHandlers.mousemove}
      onTouchMove={eventHandlers.touchmove}
      onMouseLeave={() => setBoxIsMoving(false)}
    >
      <div className="modalHeaderDiv">
        <h2 className="modalHeaderText">Property Report</h2>
        <div
          style={{ position: "absolute" }}
          className="modalheaderHandle"
        ></div>
        <div onClick={(e) => hideModal(e)} className="modalHeaderCloseBtn">
          <CloseButton size="lg" className="closeBtn" />
        </div>
      </div>
      <div
        className="modalBodyDiv"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="modalBodyImg"
          style={{ backgroundImage: `url(${featuredimg})` }}
        >
          <Badge
            className="propertyModalBadge"
            colorScheme={determineBadgeColor(projectstage)}
          >
            {projectstage}
          </Badge>
        </div>
        <h1 className="modalStreetAddress">{getStreetAddress(address)}</h1>
        <p className="modalCityStateZip">{getCityStateZip(address)}</p>
        <div>
          <ButtonGroup variant="outline" pt="5px" pb="5px">
            <a
              href={"http://maps.google.com/?q=" + address}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                rightIcon={<SiGooglemaps />}
                colorScheme="green"
                size="sm"
                className="linkBtns"
                mr="10px"
              >
                Google Maps
              </Button>
            </a>
            <a href="#">
              <Button
                size="sm"
                rightIcon={<BsClipboardData />}
                className="linkBtns"
                colorScheme="blue"
              >
                Lease
              </Button>
            </a>
          </ButtonGroup>
          <div className="scenarioContainer">
            <h3 className="scenarioHeader">{strategicdirection}</h3>
            <p className={`scenarioDescription ${largeScenarioDescription}`}>
              Nisi ipsum aute irure eu incididunt. Nostrud velit labore
              adipisicing excepteur aute enim adipisicing excepteur adipisicing
              pariatur amet. Nostrud incididunt ad adipisicing nulla ex quis ex
              laboris proident proident enim. Lorem occaecat non quis labore
              magna incididunt mollit sit. Cupidatat in ut magna aliquip labore
              pariatur anim minim ad labore in do.
            </p>
            <p className="seeMoreBtn">
              <span
                className="seeMoreBtnSpan"
                onClick={(e) => seeMoreFunction(e, seeMoreOrLess)}
              >
                {seeMoreOrLess}
              </span>
            </p>
          </div>
          <Tabs>
            <TabList>
              <Tab className="tabHeaders" onClick={(e) => e.stopPropagation()}>
                Documents
              </Tab>
              <Tab onClick={(e) => e.stopPropagation()} className="tabHeaders">
                Notes
              </Tab>
              <Tab onClick={(e) => e.stopPropagation()} className="tabHeaders">
                Something Else
              </Tab>
            </TabList>
            <TabPanels className="tabPanel">
              <TabPanel className="tabPanel" _focus="none">
                <div className="tabPanelContainer">
                  <p className="tabPanelParagraph">
                    <a href="#" className="documentLinks">
                      Peer Property Report
                    </a>
                  </p>
                  <p>
                    <br></br>
                  </p>
                </div>
              </TabPanel>
              <TabPanel className="tabPanel">
                <p className="tabPanelParagraph">{projectstatusupdate}</p>
              </TabPanel>
              <TabPanel
                className="tabPanel.tabpanel2.tabpanel3"
                style={{ boxShadow: "none" }}
              >
                <p className="tabPanelParagraph">three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
