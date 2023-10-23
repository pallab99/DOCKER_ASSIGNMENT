/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import "./accordion.style.scss";
export default function AccordionUI({ header, body }) {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>{header}</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p className="font-18 font-justify">{body}</p>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
}
