import { JSXInternal } from "preact/src/jsx";

interface StepProps {
  children?: preact.ComponentChild;
  img?: any;
  imgSize?: [number, number];
  step: JSXInternal.Element | string;
}

const Step = ({ children, img, imgSize = [null, null], step }: StepProps) => {
  const width = imgSize[0] || "auto";
  const height = imgSize[1] || "auto";

  return (
    <div className="my-4">
      <p className="pl-2 spoints-p-2">{step}</p>
      {children}
      {img && (
        <div className="flex-justify-center fill">
          <img src={img} width={width} height={height} />
        </div>
      )}
    </div>
  );
};

export { Step };
