import { schema } from "prosemirror-schema-basic";
import { EditorState, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { history, undo, redo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";

let undoStack : EditorState[] = [];
let redoStack : EditorState[] = [];

const undoFunction = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
  fview?: EditorView,
): boolean => {
  console.log(state, "\n", view);
  const latestUndoState = undoStack.length > 0 && undoStack.pop();
  if(latestUndoState){
    // push current changes to redo stack and apply the undostate
    redoStack.push(state);
    view?.updateState(latestUndoState);
    return true;
  }
  return false;
};

const redoFunction = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
  fview?: EditorView,
): boolean => {
  console.log(state, "\n", view);
  const latestRedoState = redoStack.length > 0 && redoStack.pop();
  if(latestRedoState){
    // push current changes to undo stack and apply the redoState
    undoStack.push(state);
    view?.updateState(latestRedoState);
    return true;
  }
  return false;
};

const editor = EditorState.create({
  schema,
  plugins: [history(), keymap({ "Ctrl-z": undoFunction, "Ctrl-y": redoFunction })],
});

const element = document.getElementById("editor");

const view = new EditorView(element, {
  state: editor,
  dispatchTransaction(this, transaction) {
    console.log(transaction);
    console.log(this);
    console.log( 
      "before change size: ",
      transaction.before.content.size,
      "\n After change the size is: ",
      transaction.doc.content.size,
    );

    console.log(transaction.getMeta("history$"));
    const unknownState = transaction.getMeta("history$");
    const newState = view.state.apply(transaction);

    if(unknownState){
        let redoState, undoState = null;
        unknownState.redo ? redoState = newState : undoState = newState;

    } else{
        // if no history data is found that means that this state will 
        // be added in undoState
        undoStack.push(view.state);
        // empty redo stack as new changes are done
        redoStack = [];
    }

    // const state = view.state.apply(transaction)
    view.updateState(newState);
  },
});
