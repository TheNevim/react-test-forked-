import React, { useCallback, useState } from "react";
import { ActionButton } from "./ActionButton";
import { failingSleep, sleep } from "./utils";

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  // No dependency for count
  const decrement = useCallback(() => setCount(count - 1), [count]);

  const delayDecrement = async () => {
    await sleep();
    setCount((currentCount) => currentCount - 1);
  };

  const failingAction = async () => {
    await failingSleep();
    setCount((currentCount) => currentCount - 1);
  };

  return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <ActionButton onClick={handleClick}>Increment</ActionButton>
      <ActionButton onClick={decrement}>Decrement</ActionButton>
      <ActionButton onClick={delayDecrement}>Delayed Decrement</ActionButton>
      <ActionButton onClick={failingAction}> Failing Action</ActionButton>
      <ActionButton onClick={() => setCount(0)}>Reset</ActionButton>
    </div>
  );
}

/*
question: which of the callback styles do you preffer and why?
My preffered callback styles depends on content of use.
classic callback - mostly for html elemets, as they function are mostly simple and could be written in one line (otherwise as const function)
async/await - in API calls because it more readable
promises - in code logic operations, because it provides easy error handling 

- try to fix the code (what are the obvious errors?)
- rewrite .then() with async/await
*/

export default App;
