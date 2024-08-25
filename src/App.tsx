import {
  createSignal,
  type Component,
  Index,
  onCleanup,
  onMount,
} from "solid-js";
import { EditableText } from "./EditableText";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:¿€Ø<>?/~`";

interface ColumnProps {
  index: number;
}

const Column: Component<ColumnProps> = (props) => {
  const [arr, setArr] = createSignal<string[]>([]);
  const [length, setLength] = createSignal(Math.floor(Math.random() * 11) + 8);
  let timeOutId: number;
  let intervalId: number;

  const shiftArray = (arr: string[]) => {
    if (arr.length > 0 && arr.every((x) => x === "")) {
      setLength(Math.floor(Math.random() * 9) + 10);
      return [];
    }

    if (arr.length < length()) {
      arr = [chars[Math.floor(Math.random() * 56)], ...arr];
    } else if (arr.length < 24) {
      arr = ["", ...arr];
    } else {
      arr = ["", ...arr];
      arr.pop();
    }

    return arr;
  };

  onMount(() => {
    timeOutId = setTimeout(
      () => {
        intervalId = setInterval(
          () => {
            setArr(shiftArray([...arr()]));
          },
          props.index === 0 || props.index === 2 ? 200 : 300,
        );
      },
      props.index === 0 ? 0 : props.index * 1200,
    );
  });

  onCleanup(() => {
    clearTimeout(timeOutId);
    clearInterval(intervalId);
  });

  return (
    <>
      <div class="col">
        <Index each={arr()}>
          {(item, index) =>
            index < 23 ? (
              <p class={`white${props.index}`}>{item() || "\u00A0"}</p>
            ) : (
              <p class={`nonwhite${props.index}`}>{item() || "\u00A0"}</p>
            )
          }
        </Index>
      </div>
    </>
  );
};

const App: Component = () => {
  const [text, setText] = createSignal("");

  return (
    <>
      <div class="cols">
        {Array.from(Array(44)).map((_, index) => {
          return <Column index={index % 4} />;
        })}
      </div>
      <div class="input">
        <EditableText text={text()} setText={setText} />
        <p class="text">{text()}</p>
      </div>
    </>
  );
};

export default App;
