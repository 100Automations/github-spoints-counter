import { JSXInternal } from "preact/src/jsx";

interface StepProps {
  children?: preact.ComponentChild;
  img?: any;
  imgSize?: [number, number];
  step: JSXInternal.Element | string;
}

const Step = ({ children, img, imgSize = [null, null], step }: StepProps) => {
  return imgSize[0] && imgSize[1] ? (
    <div className="my-4">
      <p className="pl-2 spoints-p-2">{step}</p>
      {children}
      {img && (
        <div className="flex-justify-center fill">
          <img src={img} width={imgSize[0]} height={imgSize[1]} />
        </div>
      )}
    </div>
  ) : (
    <div className="my-4">
      <p className="pl-2 spoints-p-2">{step}</p>
      {children}
      {img && (
        <div className="flex-justify-center fill">
          <img src={img} />
        </div>
      )}
    </div>
  );
};

export { Step };
