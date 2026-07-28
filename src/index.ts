import { schema } from "./schema";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { history, undo, redo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { customKeyMap } from "./keymap";

const editor = EditorState.create({
  schema,
  plugins: [history(), keymap({ "Ctrl-z": undo, "Ctrl-y": redo, ...customKeyMap })],
});

const element = document.getElementById("editor");

const view = new EditorView(element, {
  state: editor,
  dispatchTransaction(this, transaction) {
    const newState = view.state.apply(transaction);
    view.updateState(newState);
  },
});
