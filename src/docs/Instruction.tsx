"use strict";

// external imports
import { Fragment, render } from "preact";
import { JSXInternal } from "preact/src/jsx";

// internal imports
import "./Instruction.scss";
import { combineClasses } from "../utils";
import { Button, InlineImg } from "../components/Components";

// assets
import addfilter1 from "../assets/jpgs/addfilter1.jpg";
import sizeLabel from "../assets/jpgs/sizeLabel.jpg";

import confirm from "../assets/svgs/icon-confirm.svg";
import deselect from "../assets/svgs/icon-deselect.svg";
import edit from "../assets/svgs/icon-edit.svg";
import trash from "../assets/svgs/icon-trash.svg";

const aboutLabelsUrl =
  "https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work";

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
        <div className="instruction-content mx-5">
          <Section
            title="Installation"
            subtitle="How to install the extension in just a few clicks."
          >
            <div className="flex-justify-center my-4">
              <img src={addfilter1} className="row" width="600" height="400" />
            </div>
            <div className="flex-justify-center my-4">
              <Button onClick={() => {}} addClass="instruction-get-button">
                Get the FireFox extension!
              </Button>
            </div>
          </Section>
          <Section title="Instructional Guide">
            <Step step="1. Click on the GitHub Story Points Calculator extension" />
            <SubSection title="Adding Filters *">
              <Step
                step="2. Add a new filter by typing in the designated filter area. Press 'enter' on your keyboard to create the filter."
                img={addfilter1}
                imgSize={[600, 400]}
              >
                <p className="pl-3 my-4">
                  * Filters will only have effect if issues in GitHub are
                  assigned labels with a numerical value. For example,{" "}
                  <InlineImg src={sizeLabel} /> has a numerical value of 2
                  attached to a 'size' label.
                </p>
                <p className="pl-3 my-4">
                  <b>
                    <a href={aboutLabelsUrl}>
                      More information about GitHub labels.
                    </a>
                  </b>
                </p>
              </Step>
            </SubSection>
            <SubSection title="Editing and Deleting Filters">
              <Step
                step={
                  <Fragment>
                    3. To <b>edit</b> the existing filter, tap on the{" "}
                    <InlineImg src={edit} /> icon. Confirm the changes by
                    tapping on the <InlineImg src={confirm} /> icon. To{" "}
                    <b>delete</b> the filter, tap on the{" "}
                    <InlineImg src={trash} /> icon.
                  </Fragment>
                }
                img={addfilter1}
                imgSize={[600, 400]}
              />
            </SubSection>
            <SubSection title="Activating and Deactivating Filters">
              <Step
                step={
                  <Fragment>
                    4. To activate a filter, tap on the desired filter. 'No
                    filters selected' should change to the targeted selection.
                    To deactivate a filter, deselect it by tapping on the{" "}
                    <InlineImg src={deselect} /> icon.
                  </Fragment>
                }
                img={addfilter1}
                imgSize={[600, 400]}
              />
            </SubSection>
          </Section>
          <Section
            title="Troubleshooting"
            subtitle="If you can't find your GitHub Story Points Calculator, it's possible that the extension is not enabled. Here's how to check:"
          >
            <Step
              step="1. Navigate to your FireFox browser settings."
              img={addfilter1}
              imgSize={[600, 400]}
            />
            <Step
              step={
                <Fragment>
                  2. Select <b>Extensions and Themes</b> on the left of the
                  page. You should see a list of your enabled extensions. Double
                  check that the GitHub Story Points Calculator is enabled.
                </Fragment>
              }
              img={addfilter1}
              imgSize={[600, 400]}
            />
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
    <div className={combineClasses("my-5", addClass)}>
      <h3 className="spoints-title-3">{title}</h3>
      <hr></hr>
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
  step: JSXInternal.Element | string;
}

const Step = ({ children, img, imgSize = [null, null], step }: StepProps) => {
  return (
    <div className="my-4">
      <p className="pl-2 spoints-p-2">{step}</p>
      {children}
      {img && (
        <div className="flex-justify-center fill">
          <img
            src={img}
            width={imgSize[0] ? imgSize[0] : "auto"}
            height={imgSize[1] ? imgSize[1] : "auto"}
          />
        </div>
      )}
    </div>
  );
};

render(<Instruction />, document.getElementById("app"));
