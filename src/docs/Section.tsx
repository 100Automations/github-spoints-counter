import { combineClasses } from "../utils";

interface SectionProps {
  addClass?: string;
  children?: preact.ComponentChildren;
  subtitle?: string;
  title?: string;
}

const Section = ({ addClass, children, subtitle, title }: SectionProps) => {
  return (
    <div className={combineClasses("my-5", addClass)}>
      <h3 className="spoints-title-2">{title}</h3>
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
      <h4 className="spoints-title-3">{title}</h4>
      {children}
    </div>
  );
};

export { Section, SubSection };
