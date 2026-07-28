import { splitBlock, deleteSelection, joinBackward, chainCommands } from "prosemirror-commands";
import { EditorView } from "prosemirror-view";
import { EditorState, Transaction } from "prosemirror-state";

export const customKeyMap = {
    "Enter": (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) => {
        return splitBlock(state, dispatch, view);
    },
    "Backspace": chainCommands(deleteSelection, joinBackward),
}