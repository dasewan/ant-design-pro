import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

let timeChange: any;
const TimerButton: React.FC<any> = (props) => {
  const { name, num, onClick } = props;
  const [time, setTime] = useState(num);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnContent, setBtnContent] = useState(name);

  useEffect(() => {
    clearInterval(timeChange);
    setBtnDisabled(true);
    timeChange = setInterval(() => setTime((prev: number) => prev - 1), 1000);
    return () => clearInterval(timeChange);
  }, []);

  useEffect(() => {
    if (time > 0 && time <= num) {
      setBtnContent(`${name}  (${time})`);
    } else {
      clearInterval(timeChange);
      setBtnDisabled(false);
      setTime(time);
      setBtnContent(name);
    }
  }, [time]);

  return (
    <Button
      type="primary"
      disabled={btnDisabled}
      onClick={() => {
        onClick();
      }}
    >
      {btnContent}
    </Button>
  );
};
export default TimerButton;
