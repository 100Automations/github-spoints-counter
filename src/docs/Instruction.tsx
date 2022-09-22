"use strict";

// external imports
import { Fragment, render } from "preact";

import "./Instruction.scss";

const Instruction = () => {
  return (
    <Fragment>
      <header className="instruction-header flex-align-center">
        <div className="ml-7">
          <h2 className="spoints-title-2">Getting started with</h2>
          <h1 className="spoints-title-1">GitHub Story Points Calculator</h1>
        </div>
      </header>
      <main className="flex-justify-center">
        <div className="instruction-content my-5">
          <Section
            title="Installation"
            subtitle="How to install the extension in just a few clicks."
          ></Section>
          <Section title="Instructional Guide">
            1. Click on the GitHub Story Points Calculator extension
            <SubSection title="Adding Filters">
              2. Add a new filter by typing in the designated filter area. Press
              'enter' on your keyboard to create the filter.
            </SubSection>
            <SubSection title="Editing and Deleting Filters">
              3. To edit the existing filter, tap on the icon. Confirm the
              changes by tapping on the icon. To delete the filter,tap on the
              icon.
            </SubSection>
            <SubSection title="Activating and Deactivating Filters">
              4. To activate a filter, tap on the desired filter. 'No filters
              selected' should change to the targeted selection. To deactivate a
              filter, deselect it by tapping on the icon.
            </SubSection>
          </Section>
          <Section
            title="Troubleshooting"
            subtitle="If you can't find your GitHub Story Points Calculator, it's possible that the extension is not enabled. Here’s how to check:"
          ></Section>
        </div>
      </main>
      <footer className="instruction-footer flex-container align-center justify-center">
        <h2 className="spoints-title-2">
          Questions, comments, concerns? Contact us here.
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
      <h3 className="spoints-title-2">{title}</h3>
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

render(<Instruction />, document.getElementById("app"));
