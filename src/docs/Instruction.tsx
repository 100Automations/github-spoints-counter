"use strict";

// external imports
import { Fragment, render } from "preact";

import "./Instruction.scss";
import addfilter1 from "../assets/jpgs/addfilter1.jpg";

const Instruction = () => {
  return (
    <Fragment>
      <header className="instruction-header flex-align-center">
        <div className="ml-7">
          <h2 className="spoints-title-4">Getting started with</h2>
          <h1 className="spoints-title-2">GitHub Story Points Calculator</h1>
        </div>
      </header>
      <main className="flex-justify-center">
        <div className="instruction-content my-5">
          <Section
            title="Installation"
            subtitle="How to install the extension in just a few clicks."
          ></Section>
          <Section title="Instructional Guide">
            <Step step="1. Click on the GitHub Story Points Calculator extension" />
            <SubSection title="Adding Filters">
              <Step
                step="2. Add a new filter by typing in the designated filter area. Press 'enter' on your keyboard to create the filter. hahaha"
                img={addfilter1}
              />
            </SubSection>
            <SubSection title="Editing and Deleting Filters">
              <Step step="3. To edit the existing filter, tap on the icon. Confirm the changes by tapping on the icon. To delete the filter,tap on the icon." />
            </SubSection>
            <SubSection title="Activating and Deactivating Filters">
              <Step step="4. To activate a filter, tap on the desired filter. 'No filters selected' should change to the targeted selection. To deactivate a filter, deselect it by tapping on the icon." />
            </SubSection>
          </Section>
          <Section
            title="Troubleshooting"
            subtitle="If you can't find your GitHub Story Points Calculator, it's possible that the extension is not enabled. Here’s how to check:"
          >
            <Step step="1. Navigate to your FireFox browser settings." />
            <Step step="2. Select Extensions and Themes on the left of the page. You should see a list of your enabled extensions. Double check that the GitHub Story Points Calculator is enabled." />
          </Section>
        </div>
      </main>
      <footer className="instruction-footer flex-container align-center justify-center">
        <h2 className="spoints-title-2">
          Questions, comments, concerns?{" "}
          <span className="underline">Contact us here.</span>
        </h2>
      </footer>
    </Fragment>
  );
};

interface SectionProps {
  addClass?: string;
  children?: preact.ComponentChildren;
  subtitle?: string;
  title?: string;
}

const Section = ({ addClass, children, subtitle, title }: SectionProps) => {
  return (
    <div className={addClass}>
      <h3 className="spoints-title-3">{title}</h3>
      <p className="spoints-p-1">{subtitle}</p>
      {children}
    </div>
  );
};

interface SubSectionProps extends SectionProps {}

const SubSection = ({ addClass, children, title }: SubSectionProps) => {
  return (
    <div className={addClass}>
      <h4 className="spoints-title-4">{title}</h4>
      {children}
    </div>
  );
};

interface StepProps {
  children?: preact.ComponentChild;
  img?: any;
  imgSize?: [number, number];
  step: string;
}

const Step = ({ children, img, imgSize = [null, null], step }: StepProps) => {
  console.log(img);

  return (
    <div>
      <p className="spoints-p-2">{step}</p>
      {children}
      {img && (
        <img
          src={img}
          width={imgSize[0] ? imgSize[0] : "auto"}
          height={imgSize[1] ? imgSize[1] : "auto"}
        />
      )}
    </div>
  );
};

render(<Instruction />, document.getElementById("app"));