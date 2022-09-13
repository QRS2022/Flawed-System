import Image from "next/image";
import style from "./background.module.css";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

const Background = () => (
  <div>
    <div className={style.bgWrap}>
      <Image
        alt="background"
        src={`/photo${getRandomInt(1, 9)}.jpeg`}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  </div>
);

export default Background;
