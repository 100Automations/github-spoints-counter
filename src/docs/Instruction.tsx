"use strict";

// external imports
import { Fragment, render } from "preact";

// internal imports
import "./Instruction.scss";
import { Accordion, Button, InlineImg } from "../components/Components";
import { Section, SubSection } from "./Section";
import { Step } from "./Step";

// assets
import chooseFilter from "../assets/jpgs/chooseFilter.jpg";
import interpretResults from "../assets/jpgs/interpretResults.jpg";

import troubleshootChrome1 from "../assets/jpgs/troubleshootChrome1.jpg";
import troubleshootChrome2 from "../assets/jpgs/troubleshootChrome2.jpg";
import troubleshootFireFox1 from "../assets/jpgs/troubleshootFireFox1.jpg";
import troubleshootFireFox2 from "../assets/jpgs/troubleshootFireFox2.jpg";
import firefox from "../assets/svgs/firefox.svg";
import chrome from "../assets/svgs/chrome.svg";
import spointsIcon from "../assets/icons/spoints-16.png";

const aboutLabelsUrl =
  "https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work";

const Instruction = () => {
  return (
    <Fragment>
      <header className="instruction-header flex-align-center">
        <div className="mx-7">
          <h2 className="spoints-title-3">Getting started with</h2>
          <h1 className="spoints-title-1">GitHub Story Points Calculator</h1>
        </div>
      </header>
      <main className="flex-justify-center">
        <div className="instruction-content mx-5">
          <Section title="Overview">
            GitHub Story Points Calculator was created to automate the manual
            task of tallying up points for different issue analysis. This
            extension tallies the points of specific labels for all issues in
            each Kanban column.
          </Section>
          <Section
            title="Installation"
            subtitle="Select your browser to install"
          >
            <div className="flex-column justify-center align-center my-4">
              <Button
                onClick={() => {}}
                addClass="instruction-get-button flex-container align-center"
              >
                <InlineImg
                  src={chrome}
                  width={36}
                  height={36}
                  addClass="pr-3"
                />
                Get the Chrome extension
              </Button>
              <Button
                onClick={() => {}}
                addClass="instruction-get-button flex-container align-center mt-5"
                color="secondary"
              >
                <InlineImg
                  src={firefox}
                  width={36}
                  height={36}
                  addClass="pr-3"
                />
                Get the FireFox extension
              </Button>
            </div>
          </Section>
          <Section title="Instructional Guide">
            <Step
              step={
                <Fragment>
                  1. Click on the GitHub Story Points Calculator extension{" "}
                  <InlineImg src={spointsIcon} width={16} height={16} />.
                </Fragment>
              }
            />
            <SubSection title="Choosing a label">
              <Step
                step="2. Labels with values (i.e. size: 2) existing in the selected project board will displayed in the pop-up extension. By selecting a label, the project board will update
                to reflect the total value for that label."
                img={chooseFilter}
                imgSize={[600, 400]}
              >
                <p className="pl-3 my-4">
                  If you do not see any labels in the extension, the project
                  board contains no labels or labels with values.
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
            <SubSection title="Interpreting your results">
              <Step
                step={
                  <Fragment>
                    At the top of each kanban column, “Total” represents the sum
                    of the selected label's values within the column. “Missing”
                    is the number of issues that are missing that label.
                  </Fragment>
                }
                img={interpretResults}
                imgSize={[600, 400]}
              />
            </SubSection>
          </Section>
          <Section
            title="Troubleshooting"
            subtitle="If you can't find your GitHub Story Points Calculator, it's possible that the extension is not enabled. Here's how to check:"
          >
            <Accordion title="Google Chrome">
              <Step
                step={
                  <Fragment>1. Navigate to your browser's extensions.</Fragment>
                }
                img={troubleshootChrome1}
              />
              <Step
                step={
                  <Fragment>
                    2. Select Manage Extensions at the bottom of the popup. You
                    should see a list of your enabled extensions. Double check
                    that the GitHub Story Points Calculator is enabled.
                  </Fragment>
                }
                img={troubleshootChrome2}
              />
            </Accordion>
            <Accordion title="Mozilla FireFox">
              <Step
                step={
                  <Fragment>1. Navigate to your browser's extensions.</Fragment>
                }
                img={troubleshootFireFox1}
              />
              <Step
                step={
                  <Fragment>
                    2. Select Manage Extensions at the bottom of the popup. You
                    should see a list of your enabled extensions. Double check
                    that the GitHub Story Points Calculator is enabled.
                  </Fragment>
                }
                img={troubleshootFireFox1}
              />
            </Accordion>
          </Section>
        </div>
      </main>
      <footer className="instruction-footer flex-container align-center justify-center">
        <h2 className="spoints-title-1">
          Questions, comments, concerns?{" "}
          <a
            href="https://forms.gle/r2RzyML7i55xLGC78"
            className="instruction-links underline"
          >
            Contact us here.
          </a>
        </h2>
      </footer>
    </Fragment>
  );
};

render(<Instruction />, document.getElementById("app"));
