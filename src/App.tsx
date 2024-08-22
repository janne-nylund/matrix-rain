import {
  createSignal,
  type Component,
  Index,
  onCleanup,
  onMount,
} from "solid-js";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:¿€Ø<>?/~`";

interface ColumnProps {
  index: number;
}

const Column: Component<ColumnProps> = (props) => {
  const [arr, setArr] = createSignal<string[]>([]);
  const [length, setLength] = createSignal(Math.floor(Math.random() * 11) + 8);
  let timeOutId: number;
  let intervalId: number;

  const shiftArray = () => {
    if (arr().length > 0 && arr().every((x) => x === "")) {
      setLength(Math.floor(Math.random() * 9) + 10);
      return [];
    }
    const newArr = [...arr()];

    if (newArr.length < length()) {
      newArr.unshift(chars[Math.floor(Math.random() * 56)]);
    } else if (newArr.length < 24) {
      newArr.unshift("");
    } else {
      newArr.unshift("");
      newArr.pop();
    }
    return newArr;
  };

  onMount(() => {
    timeOutId = setTimeout(
      () => {
        intervalId = setInterval(
          () => {
            setArr(shiftArray());
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
  return (
    <div class="cols">
      {Array.from(Array(44)).map((_, index) => {
        return <Column index={index % 4} />;
      })}
    </div>
  );
};

export default App;
