import React from "react";
import { ReactComponent as IconOne } from "../../imgs/icon1.svg";
import { ReactComponent as IconTwo } from "../../imgs/icon2.svg";
import { ReactComponent as IconThree } from "../../imgs/icon3.svg";
import { ReactComponent as IconFour } from "../../imgs/icon4.svg";

const Info = () => {
  return (
    <div className="info">
      <div className="home-header">Things you will like</div>
      <IconOne width={80} height={80} />
      <div className="home-subheader">
        Find fellow travelers and share your cost!
      </div>
      <div>
        <IconTwo width={80} height={80} />
        <p>
          Its free to use, just book it and when you meet with your fellow
          driver you can share the cost in cash!
        </p>
      </div>
      <div>
        <IconFour fill="red" width={80} height={80} />
        <div className="home-subheader">Free and easy booking!</div>
        <p>
          In a few clicks book a ride and talk with your fellow driver where are
          you going to meet up!
        </p>
      </div>
      <div>
        <IconThree fill="red" width={80} height={80} />
        <div className="home-subheader">Verified Drivers!</div>
        <p>
          To improve your safety, we are asking to see the documents before
          account registration!
        </p>
      </div>
    </div>
  );
};

export default Info;
