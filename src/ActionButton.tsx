import { useState } from "react";

interface Props {
  onClick: () => Promise<void> | void;
  children: React.ReactNode;
}

export function ActionButton(props: Props) {
  const { onClick, children } = props;
  const [status, setStatus] = useState<string>("resolve");

  const onButtonClick = async () => {
    setStatus("pending");
    try {
      await onClick();
      setStatus("resolve");
    } catch (err) {
      setStatus("reject");
    }
  };

  return (
    <button onClick={onButtonClick}>
      {status === "pending" && "loading"}
      {status === "resolve" && children}
      {status === "reject" && "ERROR"}
    </button>
  );
}

/**
 Make this button to show "loading" text when onClick function returns Promise 
 and show "ERROR" when the promise fails.
 Return the original text/children when promise ends.
 */

/*
expert question - why memoisation of this component won't help?
I think it wont help because by memoisation there is no acces to incrementing and decrementing functions 
*/
