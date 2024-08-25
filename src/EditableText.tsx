import { Component, createSignal, Show } from "solid-js";
interface EditableProps {
  text: string;
  setText: (text: string) => void;
}
export const EditableText: Component<EditableProps> = (props) => {
  const [isEditing, setIsEditing] = createSignal(false);
  let inputRef!: HTMLInputElement;

  const handlePress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputRef !== null) {
      setIsEditing(false);
    }
  };

  return (
    <Show
      when={isEditing()}
      fallback={
        <p
          class="text-matrix"
          onClick={() => {
            setIsEditing(true);
            inputRef.focus();
          }}
          onBlur={() => setIsEditing(false)}
        >
          {props.text ? props.text : "Edit me"}
        </p>
      }
    >
      <form onKeyDown={(e) => handlePress(e)}>
        <input
          class="input-matrix"
          value={props.text}
          placeholder={props.text || "Edit me"}
          onInput={(e) => props.setText(e.target.value)}
          onBlur={() => setIsEditing(false)}
          ref={inputRef}
        />
      </form>
    </Show>
  );
};
